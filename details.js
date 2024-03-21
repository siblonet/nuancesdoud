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
            $('.Accueila').css('color', `${prod.addcoul.substring(8, 15)}`);

            document.getElementById('artinamem').innerText = prod.addarticle;
            document.getElementById('artinamem').style.color = prod.addcoul.substring(0, 7);
            document.getElementById('artinamep').innerText = prod.addarticle;
            document.getElementById('artinamep').style.color = prod.addcoul.substring(8, 15);
            document.getElementById('description').innerText = prod.notes;
            document.getElementById('artinamea').innerText = prod.addarticle;
            document.getElementById('artinamea').style.color = prod.addcoul.substring(16, 23);

            $('.rating .one').css('color', `${prod.addcoul.substring(0, 7)}`);
            $('.rating .two').css('color', `${prod.addcoul.substring(8, 15)}`);
            $('.rating .tree').css('color', `${prod.addcoul.substring(16, 23)}`);
            $('.rating .four').css('color', `${prod.addcoul.substring(24, 31)}`);
            
            document.getElementById('rating').innerText = `5 étoiles`;

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
            modalImage4.style.backgroundColor = prod.addcoul.substring(24, 31);

            modalImage5.src = prod.image[0].ima;
            modalImage5.style.backgroundColor = prod.addcoul.substring(8, 15);

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
            modalImaged.style.backgroundColor = prod.addcoul.substring(24, 31);
            modalImagee.style.backgroundColor = prod.addcoul.substring(8, 15);





            document.getElementById('achetemata').style.backgroundColor = `${prod.addcoul.substring(0, 7)}`;
            document.getElementById('achetemata').style.borderColor = `${prod.addcoul.substring(24, 31)}`;

            document.getElementById('achetematn').style.backgroundColor = `${prod.addcoul.substring(8, 15)}`;
            document.getElementById('achetematn').style.borderColor = `${prod.addcoul.substring(16, 23)}`;

            if (prod.addreduction > 0 && prod.addreduction < prod.addprix) {
                document.getElementById('quickViewOldPrice').innerText = `${prod.addreduction > 0 && prod.addreduction < prod.addprix ? (prod.addprix / 1000).toFixed(3) : (prod.addreduction / 1000).toFixed(3)} F.CFA`;
            }

            document.getElementById('quickViewNewPrice').innerText = `${prod.addreduction > 0 && prod.addreduction < prod.addprix ? (prod.addreduction / 1000).toFixed(3) : (prod.addprix / 1000).toFixed(3)} F.CFA`;
            document.getElementById('quickViewNewPrice').style.color = `${prod.addcoul.substring(16, 23)}`;
            
            $('.tabs li.current a').css('background-color', `${prod.addcoul.substring(8, 15)}`);
            $('.tabs li.current a').css('border-color', `${prod.addcoul.substring(16, 23)}`);


            
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
            
            const livecha = document.getElementById('live-chat');

            setTimeout(() => {
                livecha.classList.add('active');
            }, 3000);

        }

        getUsenam();
    } else {
        document.getElementById('coverfor').classList.add("preloader-area");

    };
    ReloadPanniertoHtmlc()
};


async function AddtoPanierc() {
    const ido = document.getElementById('ido').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const exit = await GetPannierByID(ido);

    if (exit) {
        document.getElementById('modalcoma').style.display = "block";
        document.getElementById('modalcoma').setAttribute("aria-hidden", "false");
        document.getElementById('messages').innerText = "Exist déjà dans le panier!";

        setTimeout(() => {
            document.getElementById('modalcoma').style.display = "none";
            document.getElementById('modalcoma').setAttribute("aria-hidden", "true");
        }, 2500);
    } else {
        const prod = await GetArticleByID(ido);

        prod.quantcho = quantity;
        prod.prix = prod.addreduction && prod.addreduction > 0 ? prod.addreduction : prod.addprix;
        await PostPannier(prod);
        window.location.href = "/"

    }

};

async function AddtoPanierd() {
    const ido = document.getElementById('ido').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const exit = await GetPannierByID(ido);

    if (exit) {
        document.getElementById('modalcoma').style.display = "block";
        document.getElementById('modalcoma').setAttribute("aria-hidden", "false");
        document.getElementById('messages').innerText = "Exist déjà dans le panier!";

        setTimeout(() => {
            document.getElementById('modalcoma').style.display = "none";
            document.getElementById('modalcoma').setAttribute("aria-hidden", "true");
        }, 2500);
    } else {
        const prod = await GetArticleByID(ido);

        prod.quantcho = quantity;
        prod.prix = prod.addreduction && prod.addreduction > 0 ? prod.addreduction : prod.addprix;
        await PostPannier(prod);
        window.location.href = "payment"
    }

};
async function removePannierByIdb(id) {
    await deletePannierByID(id);
    await ReloadPanniertoHtmlc();
};


async function ReloadPanniertoHtmlc() {
    const ido = document.getElementById('ido').value;
    const exit = await GetPannierByID(ido);

    if (exit) {
        const elementa = document.getElementById('hidlatera');
        const elementb = document.getElementById('hidlaterb');
        elementa.classList.remove('hiddendshow');
        elementa.classList.add('hiddendhid');
        elementb.classList.remove('hiddendshow');
        elementb.classList.add('hiddendhid');
    } else {
        const elementa = document.getElementById('hidlatera');
        const elementb = document.getElementById('hidlaterb');
        elementa.classList.remove('hiddendhid');
        elementa.classList.add('hiddendshow');
        elementb.classList.remove('hiddendhid');
        elementb.classList.add('hiddendshow');
    }

    const panner = await GetPannier();

    const productContainer = document.getElementById('pannierid');
    productContainer.innerHTML = ''; // Clear previous content

    if (panner.length > 0) {
        const pannierNumber1 = document.getElementById('paniernumber1');

        pannierNumber1.innerHTML = ''; // Clear previous content
        const panniernumHTML1 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${panner.length}</span>
                                `;
        pannierNumber1.innerHTML = panniernumHTML1;




        const pannierNumber2 = document.getElementById('paniernumber2');
        pannierNumber2.innerHTML = ''; // Clear previous content
        const panniernumHTML2 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${panner.length}</span>
                                `;
        pannierNumber2.innerHTML = panniernumHTML2;


        panner.forEach(pro => {
            const productHTML = `
                                        <div class="products-cart">
                                            <div class="products-image">
                                                <a>
                                                <img src="${pro.image[0].ima}" alt="image">
                                                </a>
                                            </div>
                                            <div class="products-content">
                                                <h3>
                                                    <h3>${pro.addarticle}</h3>
                                                </h3>
                                                <span>Parfum</span>
                                                <div class="products-price">
                                                    <span>${pro.quantcho}</span>
                                                    <span>x</span>
                                                    <span class="price">${(pro.prix / 1000).toFixed(3)}</span>
                                                    <span>=</span>
                                                    <span class="price">${(pro.prix * pro.quantcho / 1000).toFixed(3)}</span>
                                                </div>
                                                <a style="cursor: pointer !important;" class="remove-btn" onclick="removePannierByIdb('${pro._id}')">
                                                    <i class="bx bx-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                        `;
            productContainer.innerHTML += productHTML;

        });

        const h3Element = document.getElementById('monpanier');

        if (h3Element) {
            h3Element.innerText = `Mon Panier (${panner.length})`;
        }



        let totalPrice = 0; // Initialize to 1 so that the first multiplication works

        for (const pri of panner) {
            totalPrice += pri.prix * pri.quantcho;
        };

        const subtotal = document.getElementById('subtotal');

        if (subtotal) {
            subtotal.innerText = `${(totalPrice / 1000).toFixed(3)} F.CFA`;
        }
    } else {
        const h3Element = document.getElementById('monpanier');

        if (h3Element) {
            h3Element.innerText = `Mon Panier (0)`;
        }


        const subtotal = document.getElementById('subtotal');

        if (subtotal) {
            subtotal.innerText = `${0} F.CFA`;
        }
        const pannierNumber1 = document.getElementById('paniernumber1');



        const pannierNumber2 = document.getElementById('paniernumber2');


        const pannierNumber3 = document.getElementById('paniernumber3');



        pannierNumber1.innerHTML = ''; // Clear previous content
        const panniernumHTML1 = `
                                    <i class="bx bx-shopping-bag"></i>
                                `;
        pannierNumber1.innerHTML += panniernumHTML1;



        pannierNumber2.innerHTML = ''; // Clear previous content
        const panniernumHTML2 = `
                                    <i class="bx bx-shopping-bag"></i>
                                `;
        pannierNumber2.innerHTML += panniernumHTML2;

        pannierNumber3.innerHTML = ''; // Clear previous content
        const panniernumHTML3 = `
                                    <i class="bx bx-shopping-bag"></i>
                                `;
        pannierNumber3.innerHTML += panniernumHTML3;
    }
};

