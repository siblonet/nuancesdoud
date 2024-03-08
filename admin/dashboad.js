function DashBoad(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, addAticlebtn, adminiSpace) {
    ActiveDas.classList.add('active');
    ActiveCo.classList.remove('active');
    ActiveCl.classList.remove('active');
    ActiveAr.classList.remove('active');
    ActiveAn.classList.remove('active');
    addAticlebtn.innerHTML = "";
    const dasboardHTML = `
    
        <div class="container-fluid content-top-gap">
         
            <div class="welcome-msg pt-3 pb-4" id="realchangea">
                <h1>Bonjour <span class="text-primary">${username}</span></h1>
            </div>


            
            <div class="statistics">
            <div class="row">
              <div class="col-xl-6 pr-xl-2">
                <div class="row">
                  <div class="col-sm-6 pr-sm-2 statistics-grid">
                    <div class="store3 card card_border border-primary-topa p-4"
                      onclick="NafigatioTo('articles')">
                      <i class="lnr store">
                        <img src=="admin/assets/img/store3a.png" alt="store1" width="50" height="50">
                      </i>
                      <h3 class="text-primary number" id="availableArticle">0</h3>
                      <p class="stat-text">Article Disponible</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store5 card card_border border-primary-topb p-4" style="cursor: pointer"
                      onclick="NafigatioTo('commandes')">


                      <i class="lnr store">
                      <img src=="admin/assets/img/comandea.png" alt="store5" width="50" height="50">
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
                      <img src=="admin/assets/img/store2.png" alt="store2" width="50" height="50">
                    </i>                      <h3 class="text-primary number" id="availableArticlea">0</h3>
                      <p class="stat-text">Article Vide</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store7 card card_border border-primary-topb p-4" style="cursor: pointer"
                      onclick="NafigatioTo('vendu')">

                      <i class="lnr store">
                      <img src=="admin/assets/img/commandeb.png" alt="store4" width="50" height="50">
                  </i>

                      <h3 class="text-secondary number" id="CommandesNuma">0</h3>
                      <p class="stat-text">Article Vendu</p>
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
                        <img src=="admin/assets/img/creditecard.png" alt="store4" width="50" height="50">
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
                      onclick="NafigatioTo('peoples', 'Anony')">
                      <i class="lnr lnr-users" style="color:#166a8f !important;"> </i>
                      <h3 class="text-primary number" style="color:#166a8f !important;" id="PeoplesNumAnony">0</h3>
                      <p class="stat-text">Clients Anonyme</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store8 card card_border border-primary-topb p-4" style="cursor: pointer" data-toggle="modal" data-target="#optionQrcode"
                   >

                    <i class="lnr store">
                    <img src=="admin/assets/img/phonea.png" alt="store5" width="50" height="70">
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

            <div class="chart">
                    <div class=" chart-grid">
                        <div class="card text-center card_border">
                            <div class="card-body">
                                <div id="container">
                                    <canvas id="barchart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class=" chart-grid">
                        <div class="card text-center card_border">
                            <div class="card-body">
                            <!-- bar chart -->
                            <div id="container">
                                <canvas id="linechart"></canvas>
                            </div>
                            <!-- //bar chart -->
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    
    `;

    adminiSpace.innerHTML = dasboardHTML;
    NavBaractivity();

}


const NavBaractivity = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    GetOrder().then((order) => {
        const ordernotif = [];
        let odernotnu = 0;
        let totalSold = 0;
        let SoldNumber = 0;
        let CommandesNum = 0;


        if (order && order.length > 0) {
            order.forEach((pan) => {
                totalSold += pan.statut === "done" && pan.created.startsWith(`${year}-${month}-${day}`) ? parseInt(pan.reduction) : 0;

                SoldNumber += pan.statut == "done" ? 1 : 0;

                if (pan.statut !== "done" && pan.statut !== "fail") {
                    odernotnu += 1;
                    if (ordernotif.length < 3) {
                        ordernotif.push(pan);
                    }
                };

                if (pan.statut !== "done") {
                    CommandesNum += 1;

                };
            });

            const odernotifi = document.getElementById('odernotifi');
            odernotifi.innerHTML = '';
            document.getElementById('recetteMoney').innerText = `${(totalSold / 1000).toFixed(3)} F.CFA`;
            document.getElementById('CommandesNum').innerText = CommandesNum;
            document.getElementById('CommandesNuma').innerText = SoldNumber;

            if (odernotnu > 0) {
                const odernotifiHTML = `
    
                    <i class="fa fa-bell-o"></i>
                    <span class="badge blue" style="background-color: rgb(255, 0, 98);">${odernotnu}</span>
    
                        `;
                odernotifi.innerHTML = odernotifiHTML;
                const notification_header = document.getElementById('notification_header');
                notification_header.innerHTML = `
            <li>
                <div class="notification_header">
                    <h3>Vous avez ${odernotnu > 1 ? `<i style='color: red'>${odernotnu}</i>` + " nouvelles commandes en attentes" : "<i style='color: red'>Une</i> nouvelle commande en attente"}</h3>
                </div>
            </li>

            <li>
                <a href="#" class="grid">
                    <div class="user_img"><img src=="admin/assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[0].client.nom + " " + ordernotif[0].client.prenom}</p>
                    <span>${ordernotif[0].articles[0].arti_id.addarticle} ${ordernotif[0].articles[0].prix * ordernotif[0].articles[0].quantcho} F</span>
                    </div>
                </a>
            </li>
            ${ordernotif.length > 1 ?
                        `
               
            <li class="odd">
                <a href="#" class="grid">
                    <div class="user_img"><img src=="admin/assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[1].client.nom + " " + ordernotif[1].client.prenom}</p>
                    <span>${ordernotif[1].articles[0].arti_id.addarticle} ${ordernotif[1].articles[0].prix * ordernotif[1].articles[0].quantcho} F</span>
                    </div>
                </a>
            </li>
            `
                        :
                        ""
                    }
            ${ordernotif.length > 2 ?
                        `
            <li>
                <a href="#" class="grid">
                    <div class="user_img"><img src=="admin/assets/img/avatay.png" alt=""></div>
                    <div class="notification_desc">
                    <p>${ordernotif[2].client.nom + " " + ordernotif[2].client.prenom}</p>
                    <span>${ordernotif[2].articles[0].arti_id.addarticle} ${ordernotif[2].articles[0].prix * ordernotif[2].articles[0].quantcho} F</span>
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

    }).catch((error) => console.log(error));

    GetPeople("person").then((people) => {

        document.getElementById('PeoplesNum').innerText = people.length;
    }).catch((error) => console.log(error));


    GetArticle().then((articlesDa) => {
        let availableArticlea = 0;
        let availablearticle = 0;

        articlesDa.forEach((arti) => {
            availableArticlea += arti.quantity < 1 ? 1 : 0;
            availablearticle += arti.quantity > 0 ? 1 : 0;
        });

        document.getElementById('availableArticlea').innerText = availableArticlea;
        document.getElementById('availableArticle').innerText = availablearticle;
    }).catch((error) => console.log(error));


    GetPeople("Anony").then((people) => {

        document.getElementById('PeoplesNumAnony').innerText = people.length;
    }).catch((error) => console.log(error));


    (async () => {
        const version = await requesttoBackend('GET', 'boutique/version/new/pc/software/phone');
        if (version.version > 0) {
            document.getElementById("mobileUrl").value = version.url;
            document.getElementById("ApplicationMobile").innerText = 1;
        }

    })();



};
