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

                    <div  style="align-items: flex-start; width: 170px">


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
                            <p style="max-height: 50px; overflow: hidden;">Tél: <strong>${order.phone ? order.phone : order.client ? order.client.phone : 'Supprumé'}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Ville: <strong>${order.ville}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Article(s): <strong>${order.articles.length}</strong></p>
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
    const bottoms = `
    <button type="button" class="btn btn-info" data-dismiss="modal" onclick="selectStatusChange('onway')">En
    cours</button>
    <button type="button" class="btn btn-success" data-dismiss="modal"
    onclick="selectStatusChange('done')">Livré</button>
    <button type="button" class="btn btn-dangera" data-dismiss="modal"
    onclick="selectStatusChange('fail')">Échoué</button>
    <button type="button" class="btn btn-warning" data-dismiss="modal" style="color: #fff;"
    onclick="selectStatusChange('review')">En attente</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal"
    onclick="cancelOrderById()">Annuller</button>
    <button type="button" class="btn btn-outline-success" data-dismiss="modal">Quitter</button>
    `

    const bottomDoneAdmin = `
    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#optionCancileEchange"  onclick="optionCancileEchange()">Echanger</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal"
    onclick="cancelOrderById()">Retour</button>
    <button type="button" class="btn btn-outline-success" data-dismiss="modal">Quitter</button>
    `;
    GetOrderByID(orderid).then(order => {
        const product = order.articles.find(po => po._id == orderarticleid);

        if (product && product.arti_id) {
            document.getElementById('livenonupdate').innerHTML = bottoms;

            document.getElementById('optionCancilename').innerText = product.arti_id.addarticle;
            document.getElementById('optionViewNewPrice').innerText = `${(product.prix / 1000).toFixed(3)} F.CFA`;
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

            if (order.statut == "done" && isAdmin) {
                document.getElementById('livenonupdate').innerHTML = bottomDoneAdmin;

            } else if (order.statut == "done") {
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

            if (order.statut == "done" && isAdmin) {
                document.getElementById('livenonupdate').innerHTML = bottomDoneAdmin;

            } else if (order.statut == "done") {
                document.getElementById('livenonupdate').innerHTML = '';

            }
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




async function increaseQuantityEchange(articleid, domid, priceid) {
    const selecteArticle = await GetArticleByID(articleid);

    document.getElementById(domid).value = parseInt(document.getElementById(domid).value) + 1;
    const pricei = document.getElementById(priceid).innerText;
    const price = parseInt(pricei.replace(/\./g, ''));

    document.getElementById(priceid).innerText = ((price + parseInt(selecteArticle.addprix)) / 1000).toFixed(3);
}


async function decreaseQuantityEchange(articleid, domid, priceid) {
    const selecteArticle = await GetArticleByID(articleid);
    const quanchan = document.getElementById(domid);

    quanchan.value = parseInt(quanchan.value) > 1 ? parseInt(quanchan.value) - 1 : parseInt(quanchan.value);

    const pricei = document.getElementById(priceid).innerText;
    const price = parseInt(pricei.replace(/\./g, ''));

    document.getElementById(priceid).innerText = parseInt(quanchan.value) > 1 ? ((price - parseInt(selecteArticle.addprix)) / 1000).toFixed(3) : (price / 1000).toFixed(3);

}

const optionCancileEchange = async () => {
    const productQuantityb = parseInt(document.getElementById('productQuantity').value);

    const tbodydataa = document.getElementById('tbody-dataa');
    const affitoEchange = await GetArticle();

    affitoEchange.forEach((echa, index) => {
        const echangeTBODY =
            `
            <tr>
                      <td class="product-thumbnail">
                        <a>
                          <img src="${echa.image[0].ima}" alt="item">
                        </a>
                      </td>
                      <td>
                        <a id="artname${index}">${echa.addarticle}</a>
                      </td>
                      <td class="product-price">
                        <span class="unit-amount" id="echangeprice${index}" contenteditable="true">${echa.addreduction > 0 ? ((echa.addreduction * productQuantityb) / 1000).toFixed(3) : ((echa.addprix * productQuantityb) / 1000).toFixed(3)}</span> F
                      </td>
                      <td class="product-quantity">
                        <div class="input-counter" id="quantity-manipulatea${index}">
                          <div class="input-counter">
                            <span class="minus-btn" onclick="decreaseQuantityEchange('${echa._id ? echa._id : echa.id_has}', 'echanquanid${index}', 'echangeprice${index}')">-</span>
                            <input type="number" min="0" id="echanquanid${index}" value="${productQuantityb}">
                            <span class="plus-btn" onclick="increaseQuantityEchange('${echa._id ? echa._id : echa.id_has}', 'echanquanid${index}', 'echangeprice${index}')">+</span>
                          </div>

                        </div>
                      </td>

                      <td class="product-remove">
                        <a class="remove" style="cursor: pointer !important; color: #00b395 !important;"
                          onclick="changeOrderArticle('${echa._id ? echa._id : echa.id_has}', 'echangeprice${index}', 'echanquanid${index}')">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="4">
                              <path
                                d="M33 7.263A18.916 18.916 0 0 0 24 5C13.507 5 5 13.507 5 24s8.507 19 19 19a18.93 18.93 0 0 0 8-1.761" />
                              <path stroke-linejoin="round" d="M31 30h12m-28-8l7 7l19-18m-4 13v12" />
                            </g>
                          </svg>
                        </a>
                      </td>
                    </tr>
            `;

        tbodydataa.innerHTML += echangeTBODY;

    });
}

async function changeOrderArticle(articleid, echprice, echanqua) {

    const echangepricea = document.getElementById(`${echprice}`).innerText;
    const echangeprice = parseInt(echangepricea.replace(/\./g, ''));

    const productQuantitya = document.getElementById(`${echanqua}`).value;
    const orderid = document.getElementById('ido').value;

    const orderarticleid = document.getElementById('proid').value;

    const optionViewNewPricea = document.getElementById('optionViewNewPrice').innerText;

    const optionViewNewPrice = parseInt(optionViewNewPricea.replace(/\./g, ''));


    const productQuantity = parseInt(document.getElementById('productQuantity').value);


        const selectedArticle = await GetArticleByID(articleid);
        const wholeorder = await GetOrderByID(orderid);
        const currenreductionprice = wholeorder.reduction - (optionViewNewPrice * productQuantity);

        const toechange = {
            quantcho: productQuantitya,
            prix: echangeprice,
            reduction: parseInt(currenreductionprice) + parseInt(echangeprice),
        };

        await requesttoBackend('PUT', `orders/echange/order/${orderid}/${orderarticleid}/${articleid}`, toechange);
        

        document.getElementById('optionCancilename').innerText = selectedArticle.addarticle;
        document.getElementById('optionViewNewPrice').innerText = `${(echangeprice / 1000).toFixed(3)} F.CFA`;
        document.getElementById('optionViewNewBarcode').innerText = `Barcode: ${selectedArticle.barcode}`;
        document.getElementById('productQuantity').value = productQuantitya;

        const modalImage = document.getElementById('ipage');
        modalImage.src = selectedArticle.image[0].ima;
        window.location.reload()


}