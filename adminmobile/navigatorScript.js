const NafigatioTo = async (where, who = null) => {
    if (isAdmin) {
        const ActiveDas = document.getElementById('ActiveDas');
        const ActiveCo = document.getElementById('ActiveCo');
        const ActiveCl = document.getElementById('ActiveCl');
        const ActiveAr = document.getElementById('ActiveAr');
        const ActiveAn = document.getElementById('ActiveAn');


        const addAticlebtn = document.getElementById('addAticlebtn');
        const adminiSpace = document.getElementById('main-content');
        adminiSpace.innerHTML = '';

        if (where === "dasboard") {
            DashBoad(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, addAticlebtn, adminiSpace);
        } else if (where === "commandes") {
            CommandesFonc(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, adminiSpace);
        } else if (where === "vendu") {
            CommandesVendu(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, adminiSpace);
        } else if (where === "peoples") {
            PeopleHandle(who, ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, addAticlebtn, adminiSpace);

        } else if (where === "articles") {
            ArticlesUI(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, adminiSpace);

        } else if (where === "finis") {
            ArticlesFini(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, addAticlebtn, adminiSpace);

        } else if (where === "annonce") {
            ActiveDas.classList.remove('active');
            ActiveCo.classList.remove('active');
            ActiveCl.classList.remove('active');
            ActiveAr.classList.remove('active');
            ActiveAn.classList.add('active');

            const dasboardHTML = `
        
        <div class="container-fluid content-top-gap">
        <div class="statistics">
            <div class="row">
                <div class="col-xl-6 pr-xl-2">
                    <div class="row">
                        <div class="col-sm-6 pr-sm-2 statistics-grid">
                            <div id="slidea" class="card card_border border-primary-topa p-4 backi">
                                <input type="hidden" id="slideaid" value="huhed9683e">
                                <input onchange="changeSlade(event, 'slidea', 'slideaid')" type="file"
                                    class="imageFile" id="imgone" accept="image/*" />
                            </div>
                            <p>Defiler 1 (PC)</p>
                        </div>
                        <div class="col-sm-6 pl-sm-2 statistics-grid">
                            <div id="slideb" class="card card_border border-primary-topc p-4 backi">
                                <input type="hidden" id="slidebid" value="huhed9683e">
                                <input onchange="changeSlade(event, 'slideb', 'slidebid')" type="file"
                                    class="imageFile" id="imgtwo" accept="image/*" />
                            </div>
                            <p>Defiler 2 (PC)</p>

                        </div>
                    </div>
                </div>
                <div class="col-xl-6 pl-xl-2">
                    <div class="row">
                        <div class="col-sm-6 pr-sm-2 statistics-grid">
                            <div id="slidec" class="card card_border border-primary-topb p-4 backi">
                                <input type="hidden" id="slidecid" value="huhed9683e">
                                <input onchange="changeSlade(event, 'slidec', 'slidecid')" type="file"
                                    class="imageFile" id="imgthree" accept="image/*" />
                            </div>
                            <p>Defiler 3 (PC)</p>

                        </div>
                        <div class="col-sm-6 pl-sm-2 statistics-grid">
                            <div id="slided" class="card card_border border-primary-topd p-4 backi">
                               

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<div class="container-fluid content-top-gap">
        <div class="statistics">
            <div class="row">
                <div class="col-xl-6 pr-xl-2">
                    <div class="row">
                        <div class="col-sm-6 pr-sm-2 statistics-grid">
                            <div id="phonea" class="card card_border border-primary-topa p-4 backi">
                                <input type="hidden" id="phoneaid" value="huhed9683e">
                                <input onchange="changeSlade(event, 'phonea', 'phoneaid')" type="file"
                                    class="imageFile" id="phoneone" accept="image/*" />
                            </div>
                            <p>Defiler 1 (Phone)</p>

                        </div>
                        <div class="col-sm-6 pl-sm-2 statistics-grid">
                            <div id="phoneb" class="card card_border border-primary-topc p-4 backi">
                                <input type="hidden" id="phonebid" value="huhed9683e">
                                <input onchange="changeSlade(event, 'phoneb', 'phonebid')" type="file"
                                    class="imageFile" id="phonetwo" accept="image/*" />
                            </div>
                            <p>Defiler 2 (Phone)</p>

                        </div>
                    </div>
                </div>
                <div class="col-xl-6 pl-xl-2">
                    <div class="row">
                        <div class="col-sm-6 pr-sm-2 statistics-grid">
                            <div id="phonec" class="card card_border border-primary-topb p-4 backi">
                                <input type="hidden" id="phonecid" value="huhed9683e">
                                <input onchange="changeSlade(event, 'phonec', 'phonecid')" type="file"
                                    class="imageFile" id="phonethree" accept="image/*" />
                            </div>
                            <p>Defiler 3 (Phone)</p>

                        </div>
                        <div class="col-sm-6 pl-sm-2 statistics-grid">
                            <div id="slided" class="card card_border border-primary-topd p-4 backi">
                                <input type="hidden" id="slidedid" value="huhed9683e">
                                <div class="loadavideo">
                                </div>

                                <video autoplay muted loop id="baVdeo">
                                    <source id="chanVideo" src="assets/background.webm" type="video/mp4">
                                </video>
                                <input onchange="changeSlade(event, 'baVdeo', 'slidedid')" type="file"
                                    class="imageFile" id="videoChange" accept="video/*" />

                            </div>
                            <p>Defiler dideo</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid content-top-gap">
        <div class="statistics">
            <div class="row">
                <div class="col-xl-6 pr-xl-2">
                    <div class="row">
                        <div class="col-sm-6 pr-sm-2 statistics-grid">
                            <div id="backglise" class="card card_border border-primary-topa p-4 backi">
                                <input type="hidden" id="backgliseid" value="huhed9683e">
                                <input onchange="changeIcons(event, 'backglise', 'backgliseid')" type="file"
                                    class="imageFile" id="backgliseimg" accept="image/*" />
                            </div>
                            <p>Pub le bas (PC)</p>

                        </div>
                        <div class="col-sm-6 pl-sm-2 statistics-grid">
                            <div class="backiflex card_border border-primary-topc p-4 backi" style="background-color: #ffffff;">
                            
                            <div class="logoextern">
                             <img  id="logoextern" src="" alt="">
                            </div>

                            <div class="space">
                            </div>

                                <input type="hidden" id="logoexternid" value="huhed9683e">
                                <div class="msgspace">
                                        <div class="space">
                                        </div>
                                        <p>Si vous souhaitez</p>
                                        <p>changer de logo,</p>
                                        <p>cliquez sur</p>

                                        <input onchange="changeIcons(event, 'logoextern', 'logoexternid')" type="file"
                                        class="imageFile" id="logoexternimg" accept="image/*" />
                                </div>
                              
                            </div>
                            <p>Logo de l'exterieure</p>

                        </div>
                    </div>
                </div>
                <div class="col-xl-6 pl-xl-2">
                    <div class="row">
                        <div class="col-sm-6 pr-sm-2 statistics-grid">
                        <div class="backiflex card_border border-primary-topc p-4 backi" style="background-color: #ffffff;">
                            
                        <div class="logoextern">
                         <img  id="logointern" src="" alt="">
                        </div>

                        <div class="space">
                        </div>

                            <input type="hidden" id="logointernid" value="huhed9683e">
                            <div class="msgspace">
                                    <div class="space">
                                    </div>
                                    <p>Si vous souhaitez</p>
                                    <p>changer de logo,</p>
                                    <p>cliquez sur</p>

                                    <input onchange="changeIcons(event, 'logointern', 'logointernid')" type="file"
                                    class="imageFile" id="logointernimg" accept="image/*" />
                            </div>
                          
                        </div>

                           
                            <p>Logo de l'interieux</p>

                        </div>
                        <div class="col-sm-6 pl-sm-2 statistics-grid">
                            <div id="loginimg" class="card card_border border-primary-topd p-4 backi">

                                <input type="hidden" id="loginimgid" value="huhed9683e">
                                <input onchange="changeIcons(event, 'loginimg', 'loginimgid')" type="file"
                                    class="imageFile" id="loginimgimg" accept="image/*" />
                            </div>
                            <p>L'image connexion ect.</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        `;


            adminiSpace.innerHTML = dasboardHTML;
            pErsonnalige();
        }
    }
}
