function DashBoad(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, addAticlebtn, adminiSpace) {
  ActiveDas.classList.add('active');
  ActiveCo.classList.remove('active');
  ActiveCl.classList.remove('active');
  ActiveAr.classList.remove('active');
  ActiveAn.classList.remove('active');
  document.getElementById('searcha').style.display = "none";

  addAticlebtn.innerHTML = "";
  const dasboardHTML = `
  <br>
  <br>
  <br>
        <div class="container-fluid">
         
            <div class="welcome-msg pt-3 pb-4" id="realchangea">
                <h1 style="color: #aaaaaa">Bonjour <span class="text-primary" style="font-weight: bold; color: #0d7fdd  !important;">${username}</span></h1>
                <p>Vous étes dans votre espace administratif.</p>
                <a style="font-size: 12px; font-weight: 100; color: #007bff !important;" href="/">Aller à Espace Publique</a>
            </div>


            <div class="statistics">
            <div class="row">
              <div class="col-xl-6 pr-xl-2">
                <div class="row">
                  <div class="col-sm-6 pr-sm-2 statistics-grid">
                    <div class="store3 card card_border border-primary-topa p-4"
                      onclick="NafigatioTo('articles')">
                      <i class="lnr store">
                        <img src="../admin/assets/img/store3a.png" alt="store1" width="50" height="50">
                      </i>
                      <h3 class="text-primary number" id="availableArticle">0</h3>
                      <p class="stat-text">Article Disponible</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store5 card card_border border-primary-topb p-4" style="cursor: pointer"
                      onclick="NafigatioTo('commandes')">


                      <i class="lnr store">
                      <img src="../admin/assets/img/comandea.png" alt="store5" width="50" height="50">
                  </i>

                      <h3 class="text-secondary number" id="CommandesNum">0</h3>
                      <p class="stat-text">Commandes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="col-xl-6 pr-xl-2">
                <div class="row">
                  <div class="col-sm-6 pr-sm-2 statistics-grid">
                    <div class="store2 card card_border border-primary-topa p-4"
                      onclick="NafigatioTo('finis')">
                      <i class="lnr store">
                      <img src="../admin/assets/img/store2.png" alt="store2" width="50" height="50">
                    </i>                      <h3 class="text-primary number" id="availableArticlea">0</h3>
                      <p class="stat-text">Article Vide</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store7 card card_border border-primary-topb p-4" style="cursor: pointer"
                      onclick="NafigatioTo('vendu')">

                      <i class="lnr store">
                      <img src="../admin/assets/img/commandeb.png" alt="store4" width="50" height="50">
                  </i>

                      <h3 class="text-secondary number" id="CommandesNuma">0</h3>
                      <p class="stat-text">Vente d'Aujourd'hui</p>
                    </div>
                  </div>
                </div>
              </div>
    
    
              <div class="col-xl-6 pl-xl-2">
                <div class="row">
                  <div class="col-sm-6 pr-sm-2 statistics-grid">
                    <div class="card card_border border-primary-topc p-4" style="cursor: pointer"
                      onclick="NafigatioTo('peoples', 'person')">
                      <i class="lnr lnr-users" style="color:#acc236 !important;"> </i>
                      <h3 class="text-success number" style="color:#acc236 !important;" id="PeoplesNum">0</h3>
                      <p class="stat-text">Clients & Membres</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store4 card card_border border-primary-topd p-4">

                    <i class="lnr store">
                        <img src="../admin/assets/img/creditecard.png" alt="store4" width="50" height="50">
                    </i> 

                    <h3 class="text-red number" id="recetteMoney">0 F.CFA</h3>
                      <p class="stat-text">Recettes d'aujourd'hui</p>
                    </div>
                  </div>
                </div>
              </div>
    
    
    
              <div class="col-xl-6 pr-xl-2">
                <div class="row">
                  <div class="col-sm-6 pr-sm-2 statistics-grid">
                    <div class="card card_border border-primary-topa p-4" style="cursor: pointer"
                      onclick="NafigatioTo('ActionsMaker', 'Anony')">
                      <i class="lnr lnr-history" style="color:#166a8f !important;"> </i>
                      <h3 class="text-primary number" style="color:#166a8f !important;" id="ActionsMaker">0</h3>
                      <p class="stat-text">Actions</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store8 card card_border border-primary-topb p-4" style="cursor: pointer" data-toggle="modal" data-target="#optionQrcode">

                    <i class="lnr store">
                    <img src="../admin/assets/img/phonea.png" alt="store5" width="50" height="70">
                </i>

                    <h3 class="text-secondary number" id="ApplicationMobile">0</h3>
                      <input type="hidden" id="mobileUrl" value="">
                      <p class="stat-text">Application Mobile</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    
    `;

  adminiSpace.innerHTML = dasboardHTML;
  NavBaractivity();

}


const NavBaractivity = async () => {
  await deleteArticle();
  await deleteOrder();
  await deleteSetting();
  await deletePeople();
  const datalength = await requesttoBackend('GET', 'boutique/returnData/Length/nuance');

  if (datalength.aAL >= 0) {
    todeusole = datalength.dOL;

    const odernotifi = document.getElementById('odernotifi');
    odernotifi.innerHTML = '';
    document.getElementById('recetteMoney').innerText = `${(datalength.total / 1000).toFixed(3)} F.CFA`;
    document.getElementById('CommandesNum').innerText = datalength.udOL.length;
    document.getElementById('CommandesNuma').innerText = datalength.dOL;
    document.getElementById('PeoplesNum').innerText = datalength.PNL;
    document.getElementById('ActionsMaker').innerText = datalength.AMR;

    document.getElementById('availableArticlea').innerText = datalength.eAL;
    document.getElementById('availableArticle').innerText = datalength.aAL;

    if (datalength.udOL.length > 0) {
      const odernotifiHTML = `

              <i class="fa fa-bell-o"></i>
              <span class="badge blue" style="background-color: rgb(255, 0, 98);">${datalength.udOL.length}</span>

                  `;
      odernotifi.innerHTML = odernotifiHTML;
      const notification_header = document.getElementById('notification_header');
      notification_header.innerHTML = `
      <li>
          <div class="notification_header">
              <h3>Vous avez ${datalength.udOL.length > 1 ? `<i style='color: red'>${datalength.udOL.length}</i>` + " nouvelles commandes en attentes" : "<i style='color: red'>Une</i> nouvelle commande en attente"}</h3>
          </div>
      </li>

      <li>
          <a href="#" class="grid">
              <div class="user_img"><img src="../admin/assets/img/avatay.png" alt=""></div>
              <div class="notification_desc">
              <p>${datalength.udOL[0].client.nom + " " + datalength.udOL[0].client.prenom}</p>
              <span>${datalength.udOL[0].articles[0].arti_id.addarticle} ${datalength.udOL[0].articles[0].prix * datalength.udOL[0].articles[0].quantcho} F</span>
              </div>
          </a>
      </li>
      ${datalength.udOL.length > 1 ?
          `
         
      <li class="odd">
          <a href="#" class="grid">
              <div class="user_img"><img src="../admin/assets/img/avatay.png" alt=""></div>
              <div class="notification_desc">
              <p>${datalength.udOL[1].client.nom + " " + datalength.udOL[1].client.prenom}</p>
              <span>${datalength.udOL[1].articles[0].arti_id.addarticle} ${datalength.udOL[1].articles[0].prix * datalength.udOL[1].articles[0].quantcho} F</span>
              </div>
          </a>
      </li>
      `
          :
          ""
        }
      ${datalength.udOL.length > 2 ?
          `
      <li>
          <a href="#" class="grid">
              <div class="user_img"><img src="../admin/assets/img/avatay.png" alt=""></div>
              <div class="notification_desc">
              <p>${datalength.udOL[2].client.nom + " " + datalength.udOL[2].client.prenom}</p>
              <span>${datalength.udOL[2].articles[0].arti_id.addarticle} ${datalength.udOL[2].articles[0].prix * datalength.udOL[2].articles[0].quantcho} F</span>
              </div>
          </a>
      </li>
      `
          :
          ""
        }
      <li>
      <div class="notification_bottom">
          <a style="cursor: pointer" onclick="NafigatioTo('commandes')" class="bg-primary">Traiter les commandes</a>
      </div>
      </li>
      `;

    } else {
      const odernotifiHTML = `
              <i class="fa fa-bell-o"></i>
          `;
      odernotifi.innerHTML = odernotifiHTML;
    }
  } else {
    const odernotifi = document.getElementById('odernotifi');
    odernotifi.innerHTML = '';
    const odernotifiHTML = `
              <i class="fa fa-bell-o"></i>
          `;
    odernotifi.innerHTML = odernotifiHTML;
  };



  (async () => {
    const version = await requesttoBackend('GET', 'boutique/version/new/pc/software/phone');
    if (version.version > 0) {
      document.getElementById("mobileUrl").value = version.url;
      document.getElementById("ApplicationMobile").innerText = 1;
    }

  })();







  /**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

};
