let adminiSpaceb;

async function Commandes(who, ActiveDasboard, ActiveAttentes, ActiveEncours, ActiveEffectue, ActiveEchoue, adminiSpace) {
    adminiSpaceb = adminiSpace;

    ActiveDasboard.classList.remove('active');
    ActiveAttentes.classList.remove('active');
    ActiveEncours.classList.remove('active');
    ActiveEffectue.classList.remove('active');
    ActiveEchoue.classList.remove('active');

    switch (who) {
        case ActiveAttentes:
            ActiveAttentes.classList.add('active');
            break;

        case ActiveEncours:
            ActiveEncours.classList.add('active');
            break;

        case ActiveEffectue:
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
    const orders = ordersnotAvail.filter((reveiw) => reveiw.statut == "done");


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
                            <p class="statuscor status delivered">
                                Livré
                            </p>
                        </div>
                    </div>
      
                    <br>
                    
                    <div class="orderinfoso">
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

function filterArrayByDateRange(dataArray, startDate, endDate) {
    // Convert start and end dates to Date objects
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    // Use the filter method to get items within the date range
    const filteredArray = dataArray.filter(item => {
        const itemDate = new Date(item.created);
        return itemDate >= startDateTime && itemDate <= endDateTime;
    });

    return filteredArray;
}

// Example usage

const filterOrder = async () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    let ordersHTML = '';

    const ordersnotAvail = await GetOrder();
    const ordersStatusDone = ordersnotAvail.filter((reveiw) => reveiw.statut == "done");
    const orders = filterArrayByDateRange(ordersStatusDone, startDate, endDate);


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

