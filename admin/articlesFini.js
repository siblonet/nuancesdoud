async function ArticlesFini(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, addAticlebtn, adminiSpace) {
    ActiveDasa = ActiveDas;
    ActiveCoa = ActiveCo;
    ActiveCla = ActiveCl;
    ActiveAra = ActiveAr;
    ActiveAna = ActiveAn;
    adminiSpacea = adminiSpace;

    ActiveDas.classList.remove('active');
    ActiveCo.classList.remove('active');
    ActiveCl.classList.remove('active');
    ActiveAr.classList.add('active');
    ActiveAn.classList.remove('active');

    adminiSpace.innerHTML = `
    <div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-top: 150px;  background-color: #678a9e">
        <p style="align-self: center; color: #ffffff">Chargement en cours ...</p>
    </div>
    `;


    const availArt = await requesttoBackend('GET', 'boutique/only/article/nuance/zero');

    const availArtiLimit = availArt.length ? availArt.slice(0, 5) : [];
    try {
        await PostArticle(availArt)
    } catch (error) {

    }



    const articlesHTML = `
                <br>
                <br>
                <br>
                <br>
              
        ${availArtiLimit.map(article => {
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
                            <p style="max-height: 50px; overflow: hidden;">Prix: <strong>${(article.addprix / 1000).toFixed(3)}</strong> F</p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Promo: <strong>${article.addreduction ? (article.addreduction / 1000).toFixed(3) : 0}</strong> F</p>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
      
            `;
    }).join('')}

    ${availArt.length > 5 ?
            `
<div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-bottom: 50px;">
<button type="button" class="btn btn-outline-success"  style="align-self: center;"
    onclick="IncreaseItems(5, 'zero')">Plus
</button>
</div>
`
            :
            ""
        }

`;

    adminiSpace.innerHTML = articlesHTML;

    if (availArtiLimit.length < 1) {
        adminiSpace.innerHTML = `
<div style="width: 100%; text-align: center; justify-content: center; align-items: center;  padding-top: 150px;  background-color: #678a9e">
    <p style="align-self: center; color: #ffffff">Pas darticle en ligne</p>
</div>
`;
    }
    document.getElementById('searcha').style.display = "block";

}

