async function CommandesFonc(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, adminiSpace) {

    ActiveDas.classList.remove('active');
    ActiveCo.classList.add('active');
    ActiveCl.classList.remove('active');
    ActiveAr.classList.remove('active');
    ActiveAn.classList.remove('active');
    document.getElementById('searcha').style.display = "none";

    let ordersHTML = '';

    const ordersnotAvail = await GetOrder();
    const orders = ordersnotAvail.filter((reveiw) => reveiw.statut !== "done");

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
                                <p style="color: #1d191a">Quantité: ${orar.quantcho}</p>
                                <p style="color: #1d191a">${(orar.prix / 1000).toFixed(3)} F</p>
                            </div>
                            <span style="width: 10px;"></span>
                            `;
        }).join('')}
                    </div>
      
                    <hr>

                    <div style="align-items: flex-start; width: 170px">
                        <div class="daterow">
                            <div style="align-items: center; display: flex; justify-content: flex-end;">
                                <p class="daterowp">${moment(order.created).format("MMMM D, YYYY HH:mm:ss")}</p>
                            </div>

                            <div style="align-items: center; width: 170px; display: flex; justify-content: flex-end;">
                                <div class="payment_iconsadmin">
                                    <img src="${order.payment_method === "orangeci" ? "../assets/img/orange.png" : order.payment_method == "mtnci" ? "../assets/img/mtn.png" : order.payment_method === 'waveci' ? '../assets/img/icon.png' : order.payment_method === 'cards' ? '../assets/img/vm.png' : '../assets/img/cash.png'}" alt="Payment">
                                </div>
                                <p class="status_paymen ${order.payment_status === 'paid' ? 'delivered' : order.payment_status === 'waiting' ? 'shipped' : 'cancelled'}">
                                    ${order.payment_status === "paid" ? "Payé" : order.payment_status == "waiting" ? "En cours" : "échoué"}
                                </p>
                            </div>
                        </div>

                        <p class="statuscor" style="align-self: flex-start; margin-left: -50px !important;">
                            Caisse: ${order.staff ? order.staff : "Online"}
                        </p>
                        <div style="align-self: flex-start; width: 130px">
                        <p class="statuscor status ${order.statut === 'done' ? 'delivered' : order.statut === 'review' ? 'pending' : order.statut === 'onway' ? 'shipped' : 'cancelled'}">
                            ${order.statut === "done" ? "livré" : order.statut == "review" ? "en attente" : order.statut === "onway" ? "en cours" : "échoué"}
                        </p>
                        </div>
                    </div>
      
                    <br>
                    
                    <div class="orderinfoso">
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Client: <strong>${order.client ? order.client.nom : "Client"} ${order.client ? order.client.prenom : "Supprimé"}</strong></p>
                        </div>
      
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Cash: <strong>${(order.reduction / 1000).toFixed(3)}</strong> F</p>
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

}


async function openOrderforediting(orderid, orderarticleid, articleid) {
    GetOrderByID(orderid).then(order => {
        const product = order.articles.find(po => po._id == orderarticleid);

        if (product && product.arti_id) {

            document.getElementById('optionCancilename').innerText = product.arti_id.addarticle;
            document.getElementById('optionViewNewPrice').innerText = `${product.arti_id.addprix} F.CFA`;
            document.getElementById('optionViewNewBarcode').innerText = `Barcode: ${product.arti_id.barcode}`;
            document.getElementById('productQuantity').value = product.quantcho;
            document.getElementById('clientNameOrder').innerText = `Client: ${order.client.nom} ${order.client.prenom}`;


            const orderStatuHtml = document.getElementById('statusOrder');
            orderStatuHtml.innerHTML = '';
            const orderStatus = order.statut === "done" ? "livré" : order.statut == "review" ? "en attente" : order.statut === "onway" ? "en cours" : "échoué";
            const orderStatu = `                     <p>Statut: </p> <span style="color: ${orderStatus === 'livré' ? 'green' : orderStatus === 'en attente' ? 'orange' : orderStatus === 'en cours' ? 'pink' : 'red'}">${orderStatus}</span>
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
            modalImage.src = "admin/assets/img/imgo.png";

            document.getElementById('livenonupdate').innerHTML = '';

        };

    }).catch();

};


async function selectStatusChange(sta = null) {
    if (sta) {
        const ido = document.getElementById('ido').value;
        await requesttoBackend('PUT', `orders/change/order/statuts/${ido}`, { statut: sta });
    }
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

        window.location.reload()
    }

};