async function ArticlesUISearch(search) {
    ActiveDasa.classList.remove('active');
    ActiveCoa.classList.remove('active');
    ActiveCla.classList.remove('active');
    ActiveAra.classList.add('active');
    ActiveAna.classList.remove('active');


    const AFrPhSch = await GetArticle()
    const ArticleFromPhoneSearch = AFrPhSch.filter((eds) =>
        eds.addarticle.startsWith(search) ||
        eds.barcode.startsWith(search) ||
        eds.addarticle.toLowerCase().startsWith(search.toLowerCase()) ||
        eds.addarticle.toUpperCase().startsWith(search.toUpperCase())
    );

    let articlesHTML = "";

if (ArticleFromPhoneSearch && ArticleFromPhoneSearch.length > 0) {
    

   articlesHTML = `
                <br>
                <br>
                <br>
                <br>
              
        ${ArticleFromPhoneSearch.map(article => {
        return `
            <div class="articlerow">
      
                <div class="articlerwedgea">
      
                    <div class="articlesInfosa">
                       
                            <div class="imageholder">
                               
                                <img data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article._id}')" src="${article.image[0] ? article.image[0].ima : ''}" alt="image1">


                            </div>
                           
                            <div class="">
                                <p class="sta shipp"  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article._id}')">Ouvrir</p>
                                <div style="height: 5px"></div>
                                <p  class="sta" style="padding-left: ${article.quantity > 0 ? '10px' : '30px'}; padding-right: ${article.quantity > 0 ? '10px' : '30px'}; font-size: 14px; background-color: ${article.quantity > 0 ? "#054846" : "rgba(255, 0, 89, 0.341)"}; font-weight: bold; color: ${article.quantity > 0 ? "#ffffff" : "red"}">${article.quantity > 0 ? "Disponible" : "Finis"}</p>
                                <div style="height: 7px"></div>

                            </div>
                    </div>
      
                    <hr>

                    
                    <div class="orderinfoso">
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;"><strong>${article.addarticle}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Qté: <strong>${article.quantity}</strong></p>
                        </div>
      
                      
    
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Prix: <strong>${(article.addprix / 1000).toFixed(3)}</strong> F</p>
                        </div>
      
                     
                    </div>
                </div>
            </div>
            <br>
            <br>
      
            `;
    }).join('')}

        `;
    }else{
        articlesHTML = `
        <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-top: 150px;  background-color: #678a9e">
            <p style="align-self: center; color: #ffffff"><span style="color: red">${search}</span> N'exist pas !</p>
        </div>
    `;
    }
    adminiSpacea.innerHTML = articlesHTML;
}


/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


async function IncreaseItemsOrender(old_posi, sarr = null, who = null) {
    ActiveDasb.classList.remove('active');
    ActiveCob.classList.add('active');
    ActiveClb.classList.remove('active');
    ActiveArb.classList.remove('active');
    ActiveAnb.classList.remove('active');

    document.getElementById(who === 'all' ? 'plusb' : 'plusa').innerHTML = `
            <button type="button" class="btn btn-outline-success"  style="align-self: center;">
                                    En cours <i class="fa fa-spinner fa-spin"></i>
            </button>
    `;


    let ordersHTML = '';
    let TotalRecet = 0;

    const orders = await requesttoBackend('GET', `orders/traitedAllOrder/nuance/${old_posi}/${who == 'all' ? sarr : 15}`);

    if (orders.orders && orders.orders.length > 0) {
        await deleteOrder();
        await PostOrder(orders.orders);


        orders.orders.forEach((pan) => {
            TotalRecet += parseInt(pan.reduction);
        });



        ordersHTML = `
                <br>
                <br>
                <br>
                <div class="welcome-msg pt-3 pb-4" id="">
                    <h1 style="margin-left: 25px;">Total: <span style="font-weight: bold">${(TotalRecet / 1000).toFixed(3)}</span> F.CFA</h1>
                </div>
        ${orders.orders.map((order) => {
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

                ${orders.lengf > (old_posi + 15) ?
                `
                            <div id="plusa" style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-bottom: 50px;">
                                <button type="button" class="btn btn-outline-success"  style="align-self: center;"
                                    onclick="IncreaseItemsOrender(${old_posi + 15}, '0', 'done')">
                                    Plus
                                </button>
                            </div>
                            `
                :
                ''
            }
                ${(old_posi + 15) > orders.lengf ?
                `
                    ${document.getElementById('plusb') ?
                    `
                    <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-bottom: 50px;">
                        <button type="button" class="btn btn-outline-success"  style="align-self: center;">Fin</button>
                    </div>
                    
                    `

                    :


                    `
                    <div id="plusb" style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-bottom: 50px;">
                        <button type="button" class="btn btn-outline-success"  style="align-self: center;"
                            onclick="IncreaseItemsOrender(${old_posi}, ${(old_posi) - orders.lengf}, 'all')">Plus +
                        </button>
                    </div>
                    `
                }
                   

                    `
                :
                ""

            }


        `;

    } else if (orders && orders.orders.length < 1) {
        ordersHTML = `
        <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-top: 150px;  background-color: #678a9e">
            <p style="align-self: center; color: #ffffff">Vous n'avez rien vendu !</p>
        </div>
    `;
    } else {

        ordersHTML = `
        <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-top: 150px;  background-color: #678a9e">
            <p style="align-self: center; color: #ffffff">Chargement échoué, verifie la connexion</p>
        </div>
    `;
    }


    adminiSpaceb.innerHTML = "";
    adminiSpaceb.innerHTML = ordersHTML;
}

/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Order ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */




/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing articles @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing articles @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing articles @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing articles @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing articles @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing articles @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

async function IncreaseItems(old_posi, who) {
    ActiveDasa.classList.remove('active');
    ActiveCoa.classList.remove('active');
    ActiveCla.classList.remove('active');
    ActiveAra.classList.add('active');
    ActiveAna.classList.remove('active');

    const AFrPhSch = await GetArticle(who);

    if (AFrPhSch.length >= (old_posi + 5)) {
        const ArticleFromPhoneSearc = AFrPhSch.slice(0, old_posi + 5);

        const articlesHTML = `
            <br>
            <br>
            <br>
            <br>
          
    ${ArticleFromPhoneSearc.map(article => {
            return `
            <div class="articlerow">
                
                            <div class="articlerwedgea">

                                <div class="articlesInfosa">
                                    
                                        <div class="imageholder">
                                            <img data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article._id}')" src="${article.image[0] ? article.image[0].ima : ''}" alt="image1">
                                        </div>
                                        
                                        <div class="discountCheckboxOuvrirDisp">
                                            <input type="checkbox" id="discountCheckbox${article._id}" ${article.addreduction > 0 ? 'checked' : ''} class="discountCheckbox" onclick="DiscountOneUpdate('discountCheckbox${article._id}', '${article._id}')">
                                            <p class="sta shipp"  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article._id}')">Ouvrir</p>
                                            <div style="height: 5px"></div>
                                            <p  class="sta" style="padding-left: ${article.quantity > 0 ? '10px' : '30px'}; padding-right: ${article.quantity > 0 ? '10px' : '30px'}; font-size: 14px; background-color: ${article.quantity > 0 ? "#054846" : "rgba(255, 0, 89, 0.341)"}; font-weight: bold; color: ${article.quantity > 0 ? "#ffffff" : "red"}">${article.quantity > 0 ? "Disponible" : "Finis"}</p>
                                            <div style="height: 7px"></div>
                                        </div>
                                </div>

                                <hr>

                                
                                <div class="orderinfoso">
                                    <div style="background-color: #ffffff;">
                                        <p style="max-height: 50px; overflow: hidden;"><strong>${article.addarticle}</strong></p>
                                    </div>

                                    <span style="width: 10px;"></span>
                                    <div style="background-color: #ffffff;">
                                        <p style="max-height: 50px; overflow: hidden;">Qté: <strong>${article.quantity}</strong></p>
                                    </div>


                                    <span style="width: 10px;"></span>
                                    <div style="background-color: #ffffff;">
                                        <p style="max-height: 50px; overflow: hidden;">Prix: <strong>${(article.addprix / 1000).toFixed(3)}</strong> F</p>
                                    </div>

                                </div>
                            </div>
                        </div>
        <br>
        <br>
  
        `;
        }).join('')}
            ${AFrPhSch.length > (old_posi + 5) ?
                `
                <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-bottom: 50px;">
                    <button type="button" class="btn btn-outline-success"  style="align-self: center;"
                        onclick="IncreaseItems(${old_posi + 5}, '${who}')">Plus
                    </button>
                </div>
                `
                :
                `
                    <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-bottom: 50px;">
                        <button type="button" class="btn btn-outline-success"  style="align-self: center;">Fin</button>
                    </div>
                    `
            }
    `;

        adminiSpacea.innerHTML = articlesHTML;
    } else {



        const articlesHTML = `
            <br>
            <br>
            <br>
            <br>
          
    ${AFrPhSch.map(article => {
            return `
            <div class="articlerow">
                
                            <div class="articlerwedgea">

                                <div class="articlesInfosa">
                                    
                                        <div class="imageholder">
                                            <img data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article._id}')" src="${article.image[0] ? article.image[0].ima : ''}" alt="image1">
                                        </div>
                                        
                                        <div class="discountCheckboxOuvrirDisp">
                                            <input type="checkbox" id="discountCheckbox${article._id}" ${article.addreduction > 0 ? 'checked' : ''} class="discountCheckbox" onclick="DiscountOneUpdate('discountCheckbox${article._id}', '${article._id}')">
                                            <p class="sta shipp"  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article._id}')">Ouvrir</p>
                                            <div style="height: 5px"></div>
                                            <p  class="sta" style="padding-left: ${article.quantity > 0 ? '10px' : '30px'}; padding-right: ${article.quantity > 0 ? '10px' : '30px'}; font-size: 14px; background-color: ${article.quantity > 0 ? "#054846" : "rgba(255, 0, 89, 0.341)"}; font-weight: bold; color: ${article.quantity > 0 ? "#ffffff" : "red"}">${article.quantity > 0 ? "Disponible" : "Finis"}</p>
                                            <div style="height: 7px"></div>
                                        </div>
                                </div>

                                <hr>

                                
                                <div class="orderinfoso">
                                    <div style="background-color: #ffffff;">
                                        <p style="max-height: 50px; overflow: hidden;"><strong>${article.addarticle}</strong></p>
                                    </div>

                                    <span style="width: 10px;"></span>
                                    <div style="background-color: #ffffff;">
                                        <p style="max-height: 50px; overflow: hidden;">Qté: <strong>${article.quantity}</strong></p>
                                    </div>


                                    <span style="width: 10px;"></span>
                                    <div style="background-color: #ffffff;">
                                        <p style="max-height: 50px; overflow: hidden;">Prix: <strong>${(article.addprix / 1000).toFixed(3)}</strong> F</p>
                                    </div>

                                </div>
                            </div>
                        </div>
        <br>
        <br>
  
        `;
        }).join('')}
            
                
                <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-bottom: 50px;">
                    <button type="button" class="btn btn-outline-success"  style="align-self: center;">Fin</button>
                </div>
                
            
    `;

        adminiSpacea.innerHTML = articlesHTML;


    }


}

/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Articles ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Articles ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ increasing Articles ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

