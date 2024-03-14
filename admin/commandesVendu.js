let adminiSpaceb;

async function CommandesVendu(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, adminiSpace) {
    adminiSpaceb = adminiSpace;

    ActiveDas.classList.remove('active');
    ActiveCo.classList.add('active');
    ActiveCl.classList.remove('active');
    ActiveAr.classList.remove('active');
    ActiveAn.classList.remove('active');
    document.getElementById('searcha').style.display = "none";

    document.getElementById('add-article').classList.remove('active');


    const filterorder = document.getElementById('filter-order');
    setTimeout(() => {
        filterorder.classList.add('active');
    }, 1000);

    let ordersHTML = '';
    let TotalRecet = 0;

    const ordersnotAvail = await GetOrder();
    const orders = ordersnotAvail.filter((reveiw) => reveiw.statut == "done");

    if (orders && orders.length > 0) {
        orders.forEach((pan) => {
            TotalRecet += parseInt(pan.reduction);
        });
    }


    ordersHTML += `
                <br>
                <br>
                <br>
                <div class="welcome-msg pt-3 pb-4" id="">
                    <h1 style="margin-left: 25px;">Total: <span style="font-weight: bold">${(TotalRecet / 1000).toFixed(3)}</span> F.CFA</h1>
                </div>
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
                            <p class="statuscor status delivered">
                                Livré
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

};


// Example usage

const filterOrder = async () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    let TotalRecet = 0;

    let ordersHTML = '';

    const ordersnotAvail = await GetOrder();
    const ordersStatusDone = ordersnotAvail.filter((reveiw) => reveiw.statut == "done");
    const orders = filterArrayByDateRange(ordersStatusDone, startDate, endDate);

    if (orders && orders.length > 0) {
        orders.forEach((pan) => {
            TotalRecet += parseInt(pan.reduction);
        });
    }
    if (orders && orders.length > 0) {

        ordersHTML += `
            <br>
            <br>
            <br>
            <div class="welcome-msg pt-3 pb-4" id="">
                <h1 style="margin-left: 25px;">Total: <span style="font-weight: bold">${TotalRecet}</span> F.CFA</h1>
            </div>
              
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
                            <p class="statuscor status delivered">
                                Livré
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
                            <p style="max-height: 50px; overflow: hidden;">Tél: <strong>${order.phone ? order.phone : order.client.phone}</strong></p>
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
        adminiSpaceb.innerHTML = ordersHTML;

    }
}

