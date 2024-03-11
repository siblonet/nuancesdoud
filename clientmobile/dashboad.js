function DashBoad(ActiveDasboard, ActiveAttentes, ActiveEncours, ActiveEffectue, ActiveEchoue, adminiSpace) {
  ActiveDasboard.classList.add('active');
  ActiveAttentes.classList.remove('active');
  ActiveEncours.classList.remove('active');
  ActiveEffectue.classList.remove('active');
  ActiveEchoue.classList.remove('active');

  const dasboardHTML = `
  <br>
  <br>
  <br>
        <div class="container-fluid">
         
            <div class="welcome-msg pt-3 pb-4" id="realchangea">
                <h1 style="color: #aaaaaa">Bonjour <span class="text-primary" style="font-weight: bold; color: #0d7fdd  !important;">${username}</span></h1>
                <p>Vous étes dans votre espace</p>
                <a style="font-size: 12px; font-weight: 100; color: #007bff !important;" href="/">Aller à l Boutique</a>
            </div>


            <div class="statistics">
            <div class="row">
              <div class="col-xl-6 pr-xl-2">
                <div class="row">
                  <div class="col-sm-6 pr-sm-2 statistics-grid">
                    <div class="store3 card card_border border-primary-topa p-4"
                      onclick="NafigatioTo('review')">
                      <i class="lnr store">
                        <img src="../admin/assets/img/store3a.png" alt="store1" width="50" height="50">
                      </i>
                      <h3 class="text-primary number" id="review">0</h3>
                      <p class="stat-text">C En attente</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store5 card card_border border-primary-topb p-4" style="cursor: pointer"
                      onclick="NafigatioTo('onway')">
                      <i class="lnr store">
                      <img src="../admin/assets/img/comandea.png" alt="store5" width="50" height="50">
                     </i>

                      <h3 class="text-secondary number" id="onway">0</h3>
                      <p class="stat-text">C En cours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="col-xl-6 pr-xl-2">
                <div class="row">
                  <div class="col-sm-6 pr-sm-2 statistics-grid">
                    <div class="store2 card card_border border-primary-topa p-4"
                      onclick="NafigatioTo('done')">
                      <i class="lnr store">
                      <img src="../admin/assets/img/store2.png" alt="store2" width="50" height="50">
                    </i>                      
                    <h3 class="text-primary number" id="done">0</h3>
                      <p class="stat-text">C éffectuée</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pl-sm-2 statistics-grid">
                    <div class="store7 card card_border border-primary-topb p-4" style="cursor: pointer"
                      onclick="NafigatioTo('fail')">
                      <i class="lnr store">
                         <img src="../admin/assets/img/commandeb.png" alt="store4" width="50" height="50">
                      </i>

                      <h3 class="text-secondary number" id="fail">0</h3>
                      <p class="stat-text">C Echoué</p>
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


const NavBaractivity = () => {
  GetOrder().then((order) => {
    let orderWaiting = 0;
    let orderOnway = 0;
    let OrderDone = 0;
    let OrderFail = 0;

    if (order && order.length > 0) {
      order.forEach((pan) => {
        orderWaiting += pan.statut == "review" ? 1 : 0;
        orderOnway += pan.statut == "onway" ? 1 : 0;
        OrderDone += pan.statut == "done" ? 1 : 0;
        OrderFail += pan.statut == "fail" ? 1 : 0;
      });

      document.getElementById('review').innerText = orderWaiting;
      document.getElementById('onway').innerText = orderOnway;
      document.getElementById('done').innerText = OrderDone;
      document.getElementById('fail').innerText = OrderFail;
    }
  }).catch((error) => console.log(error));
};
