function getUsenam() {
    const tokens = sessionStorage.getItem('tibule');
    if (tokens && tokens.split("°")) {
        const sploz = tokens.split("°");
        const admin = sploz[6];
        const usernam = document.getElementById('usernam');
        const usernama = document.getElementById('usernama');
        usernam.innerHTML = '';
        admin == "GIFV" ? true : false;
        usernama.innerHTML = `
        <a><i class="bx bx-log-in"></i>Se Deconecter</a>
        `;
        usernama.onclick = navigateAdminCLient;
        usernama.style.cursor = "pointer"



        if (admin == "GIFV") {
            const usernamBody =
                `
            <a href="admin"><i class="bx bxs-user"></i> Mon Espace</a>

            `;

            usernam.innerHTML += usernamBody;
        } else {

            const usernamBody =
                `
            <a href="client"><i class="bx bxs-user"></i> Mon Espace</a>

            `;

            usernam.innerHTML += usernamBody;
        }

    }
};

async function navigateAdminCLient() {
    await deleteOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
    getUsenam();
}

async function SelectedProductRendering(viewid) {
    if (viewid) {
        const prod = await GetArticleByID(viewid);
        if (prod) {
            document.getElementById('artinamem').innerText = prod.addarticle;
            document.getElementById('artinamem').style.color = prod.addcoul.substring(0, 7);
            document.getElementById('artinamep').innerText = prod.addarticle;
            document.getElementById('artinamep').style.color = prod.addcoul.substring(0, 7);
            document.getElementById('description').innerText = prod.notes;
            document.getElementById('artinamea').innerText = prod.addarticle;
            document.getElementById('artinamea').style.color = prod.addcoul.substring(0, 7);
            document.getElementById('rating').innerText = `4.9 avis`;

            const modalImage1 = document.getElementById('ima1');
            const modalImage2 = document.getElementById('ima2');
            const modalImage3 = document.getElementById('ima3');
            const modalImage4 = document.getElementById('ima4');
            const modalImage5 = document.getElementById('ima5');

            modalImage1.src = prod.image[0].ima;
            modalImage1.style.backgroundColor = prod.addcoul.substring(0, 7);

            modalImage2.src = prod.image[0].ima;
            modalImage2.style.backgroundColor = prod.addcoul.substring(8, 15);

            modalImage3.src = prod.image[0].ima;
            modalImage3.style.backgroundColor = prod.addcoul.substring(16, 23);

            modalImage4.src = prod.image[0].ima;
            modalImage4.style.backgroundColor = prod.addcoul.substring(16, 23);

            modalImage5.src = prod.image[0].ima;
            modalImage5.style.backgroundColor = prod.addcoul.substring(16, 23);

            const modalImagea = document.getElementById('imaa');
            const modalImageb = document.getElementById('imab');
            const modalImagec = document.getElementById('imac');
            const modalImaged = document.getElementById('imad');
            const modalImagee = document.getElementById('imae');
            modalImagea.src = prod.image[0].ima;
            modalImageb.src = prod.image[0].ima;
            modalImagec.src = prod.image[0].ima;
            modalImaged.src = prod.image[0].ima;
            modalImagee.src = prod.image[0].ima;
            modalImagea.style.backgroundColor = prod.addcoul.substring(0, 7);
            modalImageb.style.backgroundColor = prod.addcoul.substring(8, 15);
            modalImagec.style.backgroundColor = prod.addcoul.substring(16, 23);
            modalImaged.style.backgroundColor = prod.addcoul.substring(16, 23);
            modalImagee.style.backgroundColor = prod.addcoul.substring(16, 23);




            const splo = prod.addcoul.split(",") ? prod.addcoul.split(",") : "#orange";
            const colora = splo[0] == "null" ? "orange" : splo[0];

            document.getElementById('coloholder').innerText = prod.addcoul;
            document.getElementById('achetematn').style.backgroundColor = colora;
            document.getElementById('achetematn').style.borderColor = colora;

            if (prod.addreduction > 0 && prod.addreduction < prod.addprix) {
                document.getElementById('quickViewOldPrice').innerText = `${prod.addreduction > 0 && prod.addreduction < prod.addprix ? (prod.addprix / 1000).toFixed(3) : (prod.addreduction / 1000).toFixed(3)} F.CFA`;
            }

            document.getElementById('quickViewNewPrice').innerText = `${prod.addreduction > 0 && prod.addreduction < prod.addprix ? (prod.addreduction / 1000).toFixed(3) : (prod.addprix / 1000).toFixed(3)} F.CFA`;
            document.getElementById('quickViewNewPrice').style.color = colora;


            const emptyadd = document.getElementById('emptyadd');
            emptyadd.style.width = "100%"
            emptyadd.style.height = "500px"
            const emptyaddHtml = `
                        <section class="facility-area pb-70 foot-circle">
                            <section class="offer-area bg-image1 ptb-100">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-5 col-md-6">
                                        <div class="offer-content">
                                        <span class="sub-title" style="color: #006e65 !important;"></span>




                                        <h2></h2>
                                        <p></p>

                                        <div class="anim">
                                            <div class="button-85a  wow comIn" data-wow-delay=".3s"></div>
                                            <a href="#product-container" class="button-85 wow comIn"
                                                data-wow-delay=".3s">
                                               
                                            </a>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                        `;

            emptyadd.innerHTML = emptyaddHtml;
            const livecha = document.getElementById('live-chat');

            setTimeout(() => {
                livecha.classList.add('active');
            }, 3000);
        } else {
            const errerm = document.getElementById('artinamem')
            errerm.innerText = "Error Inconnu";
            errerm.style.color = "red";
            const errerp = document.getElementById('artinamep')
            errerp.innerText = "Error Inconnu";
            errerp.style.color = "red";
            document.getElementById('nothingEroo').innerHTML = "";
            const emptyadd = document.getElementById('emptyadd');
            emptyadd.style.width = "100%"
            emptyadd.style.height = "500px"
            const emptyaddHtml = `
                        <section class="facility-area pb-70 foot-circle">
                            <section class="offer-area bg-image1 ptb-100">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-5 col-md-6">
                                        <div class="offer-content">
                                        <span class="sub-title" style="color: #006e65 !important;"></span>




                                        <h2></h2>
                                        <p></p>

                                        <div class="anim">
                                            <div class="button-85a  wow comIn" data-wow-delay=".3s"></div>
                                            <a href="#product-container" class="button-85 wow comIn"
                                                data-wow-delay=".3s">
                                               
                                            </a>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                        `;

            emptyadd.innerHTML = emptyaddHtml;
            const livecha = document.getElementById('live-chat');

            setTimeout(() => {
                livecha.classList.add('active');
            }, 3000);

        }

        getUsenam();
    } else {
        document.getElementById('coverfor').classList.add("preloader-area");

    }
};
