let adminiSpaceb;

async function Commandes(who, ActiveDasboard, ActiveAttentes, ActiveEncours, ActiveEffectue, ActiveEchoue, adminiSpace) {
    adminiSpaceb = adminiSpace;

    ActiveDasboard.classList.remove('active');
    ActiveAttentes.classList.remove('active');
    ActiveEncours.classList.remove('active');
    ActiveEffectue.classList.remove('active');
    ActiveEchoue.classList.remove('active');

    switch (who) {
        case "review":
            ActiveAttentes.classList.add('active');
            break;

        case "onway":
            ActiveEncours.classList.add('active');
            break;

        case "done":
            ActiveEffectue.classList.add('active');
            break;

        default:
            //console.log(who, ActiveDasboard, ActiveAttentes, ActiveEncours, ActiveEffectue, ActiveEchoue);
            ActiveEchoue.classList.add('active');
            break;
    }


    const filterorder = document.getElementById('filter-order');
    setTimeout(() => {
        filterorder.classList.add('active');
    }, 1000);

    let ordersHTML = '';

    const ordersnotAvail = await GetOrder();
    const orders = ordersnotAvail.filter((reveiw) => reveiw.statut == who);


    ordersHTML += `
                <br>
                <br>
                <br>
        ${orders.map((order) => {
        return `
            <div class="articlerow">
      
                <div class="articlerwedge">
      
                    <div class="articlesInfos">
                        ${order.articles.map(orar => {
            return `
                            <div data-toggle="modal" data-target="#optionCancile"
                                onclick="openOrderforediting('${order._id}', '${orar._id}', '${orar.arti_id ? orar.arti_id._id : null}')">
                                <p style="">${orar.arti_id ? orar.arti_id.addarticle : 'Article Supprimé'}</p>
                                <p style="color: #1d191a">Qté: ${orar.quantcho}</p>
                                <p style="color: #1d191a">${(orar.prix / 1000).toFixed(3)} F</p>
                            </div>
                            <span style="width: 10px;"></span>
                            `;
        }).join('')}
                    </div>
      
                    <hr>

                    <div  style="align-items: flex-start; width: 170px">
                    <p class="daterow">${moment(order.created).format("MMMM D, YYYY HH:mm:ss")}</p>
                        <div style="align-self: flex-start; width: 130px">
                            <p class="statuscor status ${who === 'done' ? 'delivered' : who === 'review' ? 'pending' : who === 'onway' ? 'shipped' : 'cancelled'}">
                            ${who === "done" ? "livré" : who == "review" ? "en attente" : who === "onway" ? "en cours" : "échoué"}
                            </p>
                        </div>
                    </div>
      
                    <br>
                    
                    <div class="orderinfoso">
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Total: <strong>${(order.reduction / 1000).toFixed(3)}</strong> F</p>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
      
            `;
    }).join('')}

        `;
    adminiSpace.innerHTML = ordersHTML;

};


// Example usage

const filterOrder = async () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    let ordersHTML = '';

    const ordersnotAvail = await GetOrder();
    const orders = filterArrayByDateRange(ordersnotAvail, startDate, endDate);


    if (orders && orders.length > 0) {

        ordersHTML += `
            <br>
            <br>
            <br>
              
        ${orders.map((order) => {
            return `
            <div class="articlerow">
      
                <div class="articlerwedge">
      
                    <div class="articlesInfos">
                        ${order.articles.map(orar => {
                return `
                            <div data-toggle="modal" data-target="#optionCancile"
                                onclick="openOrderforediting('${order._id}', '${orar._id}', '${orar.arti_id._id}')">
                                <p style="">${orar.arti_id ? orar.arti_id.addarticle : 'Article Supprimé'}</p>
                                <p style="color: #1d191a">Qté: ${orar.quantcho}</p>
                                <p style="color: #1d191a">${(orar.prix / 1000).toFixed(3)} F</p>
                            </div>
                            <span style="width: 10px;"></span>
                            `;
            }).join('')}
                    </div>
      
                    <hr>

                    <div  style="align-items: flex-start; width: 170px">
                    <p class="daterow">${moment(order.created).format("MMMM D, YYYY HH:mm:ss")}</p>

                        <div style="align-self: flex-start; width: 130px">
                        <p class="statuscor status ${order.statut === 'done' ? 'delivered' : order.statut === 'review' ? 'pending' : order.statut === 'onway' ? 'shipped' : 'cancelled'}">
                        ${order.statut === "done" ? "livré" : order.statut == "review" ? "en attente" : order.statut === "onway" ? "en cours" : "échoué"}
                        </p>
                        </div>
                    </div>
      
                    <br>
                    
                    <div class="orderinfoso">
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Total: <strong>${(order.reduction / 1000).toFixed(3)}</strong> F</p>
                        </div>

                    </div>
                </div>
            </div>
            <br>
            <br>
      
            `;
        }).join('')}

        `;
        adminiSpaceb.innerHTML = ordersHTML;

    }
}

async function openOrderforediting(orderid, orderarticleid, articleid) {
    GetOrderByID(orderid).then(order => {
        const product = order.articles.find(po => po._id == orderarticleid);

        if (product && product.arti_id) {
            document.getElementById('optionCancilename').innerText = product.arti_id.addarticle;
            document.getElementById('optionViewNewPrice').innerText = `${product.arti_id.addprix} F.CFA`;
            document.getElementById('optionViewNewBarcode').innerText = `Barcode: ${product.arti_id.barcode}`;
            document.getElementById('productQuantity').value = product.quantcho;


            const orderStatuHtml = document.getElementById('statusOrder');
            orderStatuHtml.innerHTML = '';
            const orderStatus = order.statut === "done" ? "livré" : order.statut == "review" ? "en attente" : order.statut === "onway" ? "en cours" : "échoué";
            const orderStatu = `                     <p>Statut:  <span style="color: ${orderStatus === 'livré' ? 'green' : orderStatus === 'en attente' ? 'orange' : orderStatus === 'en cours' ? 'pink' : 'red'}">${orderStatus}</span></p>
                                        `;
            orderStatuHtml.innerHTML = orderStatu;


            document.getElementById('ido').value = `${orderid}`;
            document.getElementById('proid').value = `${orderarticleid}`;
            document.getElementById('arti_id').value = `${articleid}`;

            const element = document.getElementById('hidlater');
            element.classList.remove('hiddendhid');
            element.classList.add('hiddendshow');


            document.getElementById('villeValue').value = `${order.ville}`;
            document.getElementById('communeValue').value = `${order.commune}`;
            document.getElementById('adresseValue').value = `${order.lieu}`;
            document.getElementById('telephoneValue').value = `${order.phone}`;

            const bacgro = document.getElementById('bagron');
            bacgro.style.backgroundColor = product.backgroundColor;
            const modalImage = document.getElementById('ipage');
            modalImage.src = product.arti_id.image[0].ima;

            if (order.statut == "done") {
                document.getElementById('livenonupdate').innerHTML = '';

            }



        } else {
            document.getElementById('optionCancilename').innerText = "Article Supprimé";

            document.getElementById('optionViewNewPrice').innerText = `00.000 F.CFA`;
            document.getElementById('optionViewNewBarcode').innerText = `Barcode`;
            document.getElementById('productQuantity').value = 0;
            document.getElementById('clientNameOrder').innerText = `Client`;


            const orderStatuHtml = document.getElementById('statusOrder');
            orderStatuHtml.innerHTML = '<p>Statut: </p> <span style="color: green">Livré</span>';

            document.getElementById('villeValue').value = `Ville`;
            document.getElementById('communeValue').value = `Commune`;
            document.getElementById('adresseValue').value = `Lieu`;
            document.getElementById('telephoneValue').value = `07000000`;

            const modalImage = document.getElementById('ipage');
            modalImage.src = "../admin/assets/img/imgo.png";

            document.getElementById('livenonupdate').innerHTML = '';

        };

    }).catch();

};


async function cancelOrderById() {

    var result = window.confirm("Voulez vous vraiment annuller?");

    if (result) {
        const ido = document.getElementById('ido').value;
        const proid = document.getElementById('proid').value;
        const arti_id = document.getElementById('arti_id').value;
        const quan = document.getElementById('productQuantity').value;

        const vin_or = await GetOrderByID(ido);
        if (vin_or.articles.length > 1) {
            await requesttoBackend('DELETE', `orders/oarderar/${ido}/${proid}/${arti_id}/${quan}`);

        } else {
            await requesttoBackend('DELETE', `orders/${ido}/${arti_id}/${quan}`);

        }

    }

};

