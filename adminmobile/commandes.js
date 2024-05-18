let adminiSpaceb;

async function CommandesFonc(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, adminiSpace) {
    adminiSpaceb = adminiSpace;

    ActiveDas.classList.remove('active');
    ActiveCo.classList.add('active');
    ActiveCl.classList.remove('active');
    ActiveAr.classList.remove('active');
    ActiveAn.classList.remove('active');
    document.getElementById('searcha').style.display = "none";






    /**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    adminiSpace.innerHTML = `
    <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-top: 150px;  background-color: #678a9e">
        <p style="align-self: center; color: #ffffff">Chargement en cours ...</p>
    </div>
`;


    let ordersHTML = '';

    const orders = await requesttoBackend('GET', 'orders/allUntraitedOrder/nuance');
    if (orders && orders.length) {
        await deleteOrder();
        await PostOrder(orders);
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
                                <p class="status_paymen ${order.payment_status === 'paid' ? 'delivered' : order.payment_status === 'waiting' ? 'shipped' : order.payment_status === 'vraison' ? 'shipped' : 'cancelled'}">
                            ${order.payment_status === "paid" ? "Payé" : order.payment_status == "waiting" ? "En cours" : order.payment_status == "vraison" ? "Payer à la livraison" : "échoué"}
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
    } else if (orders && orders.length < 1) {
        ordersHTML = `
                        <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-top: 150px;  background-color: #678a9e">
                            <p style="align-self: center; color: #ffffff">Pas de commande !</p>
                        </div>
                        `;
    } else {
        ordersHTML = `
                        <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-top: 150px;  background-color: #678a9e">
                            <p style="align-self: center; color: #ffffff">Chargement échoué, verifie la connexion</p>
                        </div>
                    `;
    }
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
    <button type="button" class="btn btn-info">Echanger (PC)</button>
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




            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


            const statusOrderView = document.getElementById('statusOrderView');
            const statusPaymentView = document.getElementById('statusPaymentView');
            statusOrderView.innerHTML = '';

            statusPaymentView.innerHTML = '';
            const orderStatus = order.statut === "done" ? "livré" : order.statut == "review" ? "en attente" : order.statut === "onway" ? "en cours" : "échoué";
            const paymentStatus = order.payment_status === "paid" ? "Payé" : order.payment_status == "waiting" ? "En cours" : order.payment_status === "vraison" ? "Payer à la livraison" : "échoué";


            const orderStatu = `   
        <img src="admin/assets/img/store2.png" style="height: 30px; width: 25px;" alt="Order">
        <span class="status_paymen ${order.statut === "done" ? "delivered" : order.statut == "review" ? "pending" : order.statut === "onway" ? "shipped" : "cancelled"}">${orderStatus}</span>                                        
`;

            const paymentStatu = `   
            <img src="${order.payment_method === "orangeci" ? "admin/assets/img/orange.png" : order.payment_method == "mtnci" ? "admin/assets/img/mtn.png" : order.payment_method === 'waveci' ? './assets/img/icon.png' : order.payment_method === 'cards' ? './assets/img/vm.png' : './assets/img/cash.png'}" style="height: 30px; width: 25px;" alt="Order">
            <span class="status_paymen ${order.payment_status === 'paid' ? 'delivered' : order.payment_status === 'waiting' ? 'shipped' : order.payment_status === 'vraison' ? 'shipped' : 'cancelled'}">${paymentStatus}</span>                                        
    `;

            statusOrderView.innerHTML = orderStatu;
            statusPaymentView.innerHTML = paymentStatu;




            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


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

            document.getElementById('clientNameOrder').innerText = `Client: ${order.client.nom} ${order.client.prenom}`;




            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


            const statusOrderView = document.getElementById('statusOrderView');
            const statusPaymentView = document.getElementById('statusPaymentView');
            statusOrderView.innerHTML = '';

            statusPaymentView.innerHTML = '';
            const orderStatus = order.statut === "done" ? "livré" : order.statut == "review" ? "en attente" : order.statut === "onway" ? "en cours" : "échoué";
            const paymentStatus = order.payment_status === "paid" ? "Payé" : order.payment_status == "waiting" ? "En cours" : order.payment_status === "vraison" ? "Payer à la livraison" : "échoué";


            const orderStatu = `   
        <img src="admin/assets/img/store2.png" style="height: 30px; width: 25px;" alt="Order">
        <span class="status_paymen ${order.statut === "done" ? "delivered" : order.statut == "review" ? "pending" : order.statut === "onway" ? "shipped" : "cancelled"}">${orderStatus}</span>                                        
`;

            const paymentStatu = `   
            <img src="${order.payment_method === "orangeci" ? "admin/assets/img/orange.png" : order.payment_method == "mtnci" ? "admin/assets/img/mtn.png" : order.payment_method === 'waveci' ? './assets/img/icon.png' : order.payment_method === 'cards' ? './assets/img/vm.png' : './assets/img/cash.png'}" style="height: 30px; width: 25px;" alt="Order">
            <span class="status_paymen ${order.payment_status === 'paid' ? 'delivered' : order.payment_status === 'waiting' ? 'shipped' : order.payment_status === 'vraison' ? 'shipped' : 'cancelled'}">${paymentStatus}</span>                                        
    `;

            statusOrderView.innerHTML = orderStatu;
            statusPaymentView.innerHTML = paymentStatu;




            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            /**@@@@@@@@@@@@@@@@@@@@@@@ order stats traiting openOrderforediting end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


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

        const token = sessionStorage.getItem('tibule');
        const splo = token.split("°");
        const userid = thisiswhat(`${splo[0]}`);

        const vin_or = await GetOrderByID(ido);

        if (vin_or.articles && vin_or.articles.length > 1) {
            await requesttoBackend('DELETE', `orders/oarderar/Web-Soft/${userid}/${ido}/${proid}/${arti_id}/${quan}`);
        } else if (vin_or.articles && vin_or.articles.length == 1 && vin_or.articles[0].arti_id) {
            await requesttoBackend('DELETE', `orders/Web-Soft/${userid}/${ido}/${arti_id}/${quan}`);
        } else {
            await requesttoBackend('DELETE', `orders/already/article/deleted/${ido}`);
        }


        window.location.reload()
    }

};

