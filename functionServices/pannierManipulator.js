async function AddtoPaniera(id) {
    const element = document.getElementById('hidlater');
    element.classList.remove('hiddendshow');
    element.classList.add('hiddendhid');
    const exit = await GetPannierByID(id);
    if (exit) {
        document.getElementById('modalcoma').style.display = "block";
        document.getElementById('modalcoma').setAttribute("aria-hidden", "false");
        document.getElementById('messages').innerText = "Exist déjà dans le panier!";

        setTimeout(() => {
            document.getElementById('modalcoma').style.display = "none";
            document.getElementById('modalcoma').setAttribute("aria-hidden", "true");
        }, 2500);
    } else {
        const prod = await GetArticleByID(id);
        prod.quantcho = 1;
        prod.prix = prod.addreduction && prod.addreduction > 0 ? prod.addreduction : prod.addprix;
        await PostPannier(prod);
        await ReloadPanniertoHtml();
    }
};


async function AddtoPanierb() {
    const element = document.getElementById('hidlater');
    element.classList.remove('hiddendshow');
    element.classList.add('hiddendhid');
    const ido = document.getElementById('ido').value;
    const exit = await GetPannierByID(ido);
    const quantity = parseInt(document.getElementById('productQuantity').value);

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
        await ReloadPanniertoHtml();

    }

};

async function removePannierById(id) {
    await deletePannierByID(id);
    await ReloadPanniertoHtml();
};

async function ReloadPanniertoHtml() {
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
        pannierNumber1.innerHTML += panniernumHTML1;




        const pannierNumber2 = document.getElementById('paniernumber2');
        pannierNumber2.innerHTML = ''; // Clear previous content
        const panniernumHTML2 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${panner.length}</span>
                                `;
        pannierNumber2.innerHTML += panniernumHTML2;

        const pannierNumber3 = document.getElementById('paniernumber3');
        pannierNumber3.innerHTML = ''; // Clear previous content
        const panniernumHTML3 = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${panner.length}</span>
                                `;
        pannierNumber3.innerHTML += panniernumHTML3;




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
                                                <a style="cursor: pointer !important;" class="remove-btn" onclick="removePannierById('${pro._id}')">
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

        const panierNumber1r = document.getElementById('paniernumber1r');

        panierNumber1r.innerHTML = ''; // Clear previous content
        const panniernumHTML1r = `
                                    <i class="bx bx-shopping-bag"></i>
                                    <span>${panner.length}</span>
                                `;
        panierNumber1r.innerHTML += panniernumHTML1r;
    } else {
        const h3Element = document.getElementById('monpanier');

        if (h3Element) {
            h3Element.innerText = `Mon Panier (${panner.length})`;
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

        const panierNumber1r = document.getElementById('paniernumber1r');

        panierNumber1r.innerHTML = ''; // Clear previous content
        const panniernumHTML1r = `
                                    <i class="bx bx-shopping-bag"></i>
                                `;
        panierNumber1r.innerHTML += panniernumHTML1r;
    }

};

ReloadPanniertoHtml();