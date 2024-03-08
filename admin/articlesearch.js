

function ArticlesUISearch() {
    ActiveDasa.classList.remove('active');
    ActiveCoa.classList.remove('active');
    ActiveCla.classList.remove('active');
    ActiveAra.classList.add('active');
    ActiveAna.classList.remove('active');

    const livecha = document.getElementById('add-article');

    setTimeout(() => {
        livecha.classList.add('active');
    }, 1000);


    if (internet === "online") {

        const articlesHTML = `
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
                               
                                <img src="${article.image[0] ? article.image[0].ima : ''}" alt="image1">


                            </div>
                           
                            <div class="">
                                <p class="sta shipp"  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article._id}')">Ouvrir</p>
                                <div style="height: 5px"></div>
                                <p  class="sta" style="padding-left: ${article.quantity > 0 ? '10px' : '30px'}; padding-right: ${article.quantity > 0 ? '10px' : '30px'}; font-size: 14px; background-color: ${article.quantity > 0 ? "#054846" : "rgba(255, 0, 89, 0.341)"}; font-weight: bold; color: ${article.quantity > 0 ? "#ffffff" : "red"}">${article.quantity > 0 ? "Disponible" : "Finis"}</p>
                                <div style="height: 7px"></div>

                                <i onclick="addArticletoPannierManually('${article._id}')" class="sta vente lnr lnr-cart"></i>
                            </div>
                    </div>
      
                    <hr>

                    
                    <div class="orderinfoso">
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Article: <strong>${article.addarticle}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Quantité: <strong>${article.quantity}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Vendu: <strong>${article.quanvend}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Prix: <strong>${article.addprix}</strong> F</p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Promo: <strong>${article.addreduction ? article.addreduction : 0}</strong> F</p>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
      
            `;
        }).join('')}

        `;

        adminiSpacea.innerHTML = articlesHTML;
    } else {

        const articlesHTML = `
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
                               
                                <img src="${article.image[0] ? article.image[0].ima : ''}" alt="image1">


                            </div>
                           
                            <div class="">
                                <p class="sta shipp"  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article.id_has}')">Ouvrir</p>
                                <div style="height: 5px"></div>
                                <p  class="sta" style="padding-left: ${article.quantity > 0 ? '10px' : '30px'}; padding-right: ${article.quantity > 0 ? '10px' : '30px'}; font-size: 14px; background-color: ${article.quantity > 0 ? "#054846" : "rgba(255, 0, 89, 0.341)"}; font-weight: bold; color: ${article.quantity > 0 ? "#ffffff" : "red"}">${article.quantity > 0 ? "Disponible" : "Finis"}</p>
                                <div style="height: 7px"></div>

                                <i onclick="addArticletoPannierManually('${article.id_has}')" class="sta vente lnr lnr-cart"></i>
                            </div>
                    </div>
      
                    <hr>

                    
                    <div class="orderinfoso">
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Article: <strong>${article.addarticle}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Quantité: <strong>${article.quantity}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Vendu: <strong>${article.quanvend}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Prix: <strong>${article.addprix}</strong> F</p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Promo: <strong>${article.addreduction ? article.addreduction : 0}</strong> F</p>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
      
            `;
        }).join('')}

        `;

        adminiSpacea.innerHTML = articlesHTML;


    }

}

