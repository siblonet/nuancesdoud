async function ArticlesUISearch(search) {
    ActiveDasa.classList.remove('active');
    ActiveCoa.classList.remove('active');
    ActiveCla.classList.remove('active');
    ActiveAra.classList.add('active');
    ActiveAna.classList.remove('active');
    const AFrPhSch = await GetArticle()
    const ArticleFromPhoneSearch = AFrPhSch.filter((eds) => eds.addarticle.startsWith(search) || eds.barcode.startsWith(search));

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

    adminiSpacea.innerHTML = articlesHTML;
}

