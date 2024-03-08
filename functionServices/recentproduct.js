function getUsenam() {
    const tokens = sessionStorage.getItem('tibule');
    if (tokens && tokens.split("°")) {
        const sploz = tokens.split("°");
        const admin = sploz[6];
        const usernam = document.getElementById('usernam');
        const usernama = document.getElementById('usernama');

        const usernamab = document.getElementById('usernamab');
        const usernamaa = document.getElementById('usernamaa');

        usernam.innerHTML = '';
        admin == "GIFV" ? true : false;
        isAdmin = admin;
        usernama.innerHTML = `
            <a><i class="bx bx-log-in"></i>Se Deconecter</a>
            `;
        usernama.onclick = navigateAdminCLient;
        usernama.style.cursor = "pointer"

        if (admin == "GIFV") {
            const usernamBody =
                `
                <a href="admin"><i class="bx bxs-user"></i>Mon Espace</a>
    
                `;

            usernam.innerHTML += usernamBody;
        } else {

            const usernamBody =
                `
                <a href="client"><i class="bx bxs-user"></i> Mon Espace</a>
    
                `;

            usernam.innerHTML += usernamBody;
            const livecha = document.getElementById('live-chat');
            setTimeout(() => {
                livecha.classList.add('active');
            }, 5000);
        }


        usernamab.innerHTML = '';
        usernamaa.innerHTML = `
            <a style="color: red; cursor: pointer" onclick="navigateAdminCLient()"><i class="bx bx-log-in"></i>Se Deconecter</a>
            `;

        if (admin == "GIFV") {
            const usernamBodya =
                `
                <a style="color: #006e65;" href="admin"><i class="bx bxs-user"></i>Mon Espace</a>
    
                `;

            usernamab.innerHTML += usernamBodya;
        } else {

            const usernamBodya =
                `
                <a style="color: #006e65;" href="client"><i class="bx bxs-user"></i> Mon Espace</a>
    
                `;

            usernamab.innerHTML += usernamBodya;
        }

    } else {
        const livecha = document.getElementById('live-chat');
        setTimeout(() => {
            livecha.classList.add('active');
        }, 5000);

    }
};

async function navigateAdminCLient() {
    await deleteOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
    getUsenam();
}

function recentProduct(recenPr) {
    const ProdAvailable = [];
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('mobile');
    }

    if (recenPr.length > 0) {
        recenPr.forEach(prodAvailable => {
            if (prodAvailable.quantity > 0) {
                ProdAvailable.push(prodAvailable);
            }
        });
    }

    if (ProdAvailable.length > 0) {
        ProdAvailable.forEach(product => {
            const percentDf = ((product.addprix - product.addreduction) / product.addprix) * 100;
            const productHTML = `
                    <div class="col-lg-4 col-md-6 col-sm-6">

                        ${isMobileDevice() ?
                    `
                            <div class="products-box">

                            <div class="products-image" style="background-color: ${product.addcoul.substring(0, 7)};" onmouseover="this.style.backgroundColor='${product.addcoul.substring(8, 15)}'" onmouseout="this.style.backgroundColor='${product.addcoul.substring(0, 7)}'">

                            <div class="products-imagea">
                                <a class="imageahandlea" style="cursor: pointer !important;" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#productsQuickView" 
                                    onclick="showProductQuickView('a', '${product._id}')">
                                    <img class="one" src="${product.image[0].ima}" alt="image">
                                </a>
                                <a class="imageahandleb" style="cursor: pointer !important;" 
                                    data-bs-toggle="modal"
                                    data-bs-target="#productsQuickView" 
                                    onclick="showProductQuickView('b', '${product._id}')">
                                    <img class="two" src="${product.image[0].ima}" alt="image"> 
                                </a>
                            </div>
                               
                        

                                <div class="products-button">
                                    <ul>
                                        <li>
                                            <div class="wishlist-btn">
                                                <a style="cursor: pointer !important; color: ${product.addcoul.substring(8, 15)} !important" onclick="Pannier('${product._id}')">
                                                    <i class="bx bx-shopping-bag bx bx-heart"></i>
                                                    <span class="tooltip-label">Ajouter</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="compare-btn">
                                                <a style="color: ${product.addcoul.substring(8, 15)} !important" href="detaila?ov=${product._id}}">
                                                    <i class="bx bx-refresh"></i>
                                                    <span class="tooltip-label">Plus infos</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="quick-view-btn" onclick="showProductQuickView('${product._id}')">
                                                <a style="cursor: pointer !important; color: ${product.addcoul.substring(8, 15)} !important" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                                    <i class="bx bx-search-alt"></i>
                                                    <span class="tooltip-label">Vue rapide</span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                ${product.addnouveaute == "NOUVEAU" && product.addreduction < product.addprix ?
                        `
                        <div class="promo">Nouveautés</div>
                        `
                        :
                        ""
                    } 
                                ${product.addoccasion == "PROMO" ?
                        `
                                        <div class="promo">Promo</div>
                                    `
                        :
                        ""
                    }

                                ${product.addoccasion == "SOLD" ?
                        `
                                    <div class="sold">Solde</div>
                                `
                        :
                        ""
                    }
                            </div>


                            <div class="products-content">
                                <span class="category" style="color: ${product.addcoul.substring(0, 7)};">Parfum</span>
                                <h3><a href="detaila?ov=${product._id}">${product.addarticle}</a></h3>
                                <div class="star-rating">
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                </div>
                                <div class="price">
                                ${product.addreduction > 0 && product.addreduction < product.addprix ?
                        `
                                            <span class="old-price">${(product.addprix / 1000).toFixed(3)} F.CFA</span>
                                    `
                        :
                        ""
                    }
                                    <span class="new-price">${product.addreduction > 0 && product.addreduction < product.addprix ? (product.addreduction / 1000).toFixed(3) : (product.addprix / 1000).toFixed(3)} F.CFA</span>
                                </div>
                                <a style="cursor: pointer !important;" class="add-to-cart" onclick="AddtoPaniera('${product._id}')">Ajouter au panier</a>
                            </div>
                            ${product.addreduction > 0 && product.addreduction < product.addprix ?
                        `
                            <span class="products-discounta">
                                <span>
                                    -${percentDf.toFixed()}%
                                </span>
                            </span>
                              `
                        :
                        ""
                    }
                       
                        </div>
                        `
                    :
                    `

                    <div class="products-box">

                    <div class="products-image" style="background-color: ${product.addcoul.substring(0, 7)};" onmouseover="this.style.backgroundColor='${product.addcoul.substring(8, 15)}'" onmouseout="this.style.backgroundColor='${product.addcoul.substring(0, 7)}'">

                        <a style="cursor: pointer !important;"
                            href="detaila?ov=${product._id}">
                            <img src="${product.image[0].ima}" class="main-image" alt="image">
                            <img src="${product.image[0].ima}" class="hover-image" alt="image"> 
                        </a>

                        <div class="products-button">
                        <ul>
                            <li>
                                <div class="wishlist-btn">
                                    <a style="cursor: pointer !important; color: ${product.addcoul.substring(8, 15)} !important" onclick="Pannier('${product._id}')">
                                        <i class="bx bx-shopping-bag bx bx-heart"></i>
                                        <span class="tooltip-label">Ajouter</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="compare-btn">
                                    <a style="color: ${product.addcoul.substring(8, 15)} !important" href="detaila?ov=${product._id}}">
                                        <i class="bx bx-refresh"></i>
                                        <span class="tooltip-label">Plus infos</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="quick-view-btn" onclick="showProductQuickView('a', '${product._id}')">
                                    <a style="cursor: pointer !important; color: ${product.addcoul.substring(8, 15)} !important" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                        <i class="bx bx-search-alt"></i>
                                        <span class="tooltip-label">Vue rapide</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    ${product.addoccasion == "Promo" ?
                        `
                            <div class="new-tage">Promo</div>
                        `
                        :
                        ""
                    }

                    ${product.addoccasion == "Sold" ?
                        `
                        <div class="sale-tag">Solde</div>
                    `
                        :
                        ""
                    }
                </div>


                <div class="products-content">
                    <span class="category" style="color: ${product.addcoul.substring(0, 7)};">Parfum</span>
                    <h3><a href="detaila?ov=${product._id}">${product.addarticle}</a></h3>
                    <div class="star-rating">
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                    </div>
                    <div class="price">
                    ${product.addreduction > 0 && product.addreduction < product.addprix ?
                        `
                                <span class="old-price">${(product.addprix / 1000).toFixed(3)} F.CFA</span>
                        `
                        :
                        ""
                    }
                        <span class="new-price">${product.addreduction > 0 && product.addreduction < product.addprix ? (product.addreduction / 1000).toFixed(3) : (product.addprix / 1000).toFixed(3)} F.CFA</span>
                    </div>
                    <a style="cursor: pointer !important;" class="add-to-cart" onclick="AddtoPaniera('${product._id}')">Ajouter au panier</a>
                </div>
                ${product.addreduction > 0 && product.addreduction < product.addprix ?
                        `
                <span class="products-discount">
                    <span>
                        -${percentDf.toFixed()}%
                    </span>
                </span>
                  `
                        :
                        ""
                    }
           
            </div>
                        `
                }

                    </div>
        `;

            productContainer.innerHTML += productHTML;
        });


        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
    } else {
        const tokens = sessionStorage.getItem('tibule');
        const productHTML = `
                <div class="container">
                    <div class="section-title">
                        <h2>Le magasin est vide pour l'instant</h2>
                    </div>
                    <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                        <img src="assets/img/error-404.png" alt="Le magasin est vide">
                    </div>
                        
                    ${tokens && tokens.split("°") && tokens.split("°")[6] == "GIFV" ?
                `
                            <br>
                            <br>
                            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                                <a style="align-self: center; cursor: pointer; color: #006e65" href="admin">Cliquez ici pour Ajouter un article</a>
                            </div>
                        `
                :

                ""
            }
                </div>
            `;

        productContainer.innerHTML += productHTML;
        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
    };
    getUsenam();

};


async function showProductQuickView(a, productId) {
    const result = await GetPannierByID(productId);
    const product = await GetArticleByID(productId);

    if (!result) {
        imagefolder = product.image;

        const splo = product.addcoul.split(",") ? product.addcoul.split(",") : "gold";
        const colora = splo[0] == "null" ? "gold" : splo[0] == "#ffffff" || "#FFFFFF" ? "gold" : splo[0];

        document.getElementById('coloholder').innerText = product.addcoul;

        document.getElementById('addToCartBtn').style.backgroundColor = colora;
        document.getElementById('addToCartBtn').style.borderColor = colora;

        document.getElementById('quickViewProductName').innerText = product.addarticle;
        document.getElementById('quickViewProductName').style.color = `${colora}`;

        document.getElementById('quickViewOldPrice').innerText = product.addreduction > 0 && product.addreduction < product.addprix ? `${(product.addreduction / 1000).toFixed(3)} F.CFA` : "";

        document.getElementById('quickViewNewPrice').innerText = `${(product.addprix / 1000).toFixed(3)} F.CFA`;
        document.getElementById('rating').innerText = `5 avis`;
        document.getElementById('descrip').innerText = product.notes.length > 9 ? product.notes : "";


        let prodque = document.getElementById('productQuantity');
        if (prodque) {
            prodque.value = 1
        };

        document.getElementById('idp').value = product.who;
        document.getElementById('ido').value = `${product._id}`;

        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendhid');
        element.classList.add('hiddendshow');


        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = `${colora}`;
        const modalImage = document.getElementById('ipage');
        modalImage.src = imagefolder[0].ima;

        const newURL = `detaila?ov=${product._id}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    } else {
        const splo = product.addcoul.split(",") ? product.addcoul.split(",") : "gold";
        const colora = splo[0] == "null" ? "gold" : splo[0] == "#ffffff" || "#FFFFFF" ? "gold" : splo[0];

        document.getElementById('coloholder').innerText = product.addcoul;

        document.getElementById('addToCartBtn').style.backgroundColor = colora;
        document.getElementById('addToCartBtn').style.borderColor = colora;

        document.getElementById('quickViewProductName').innerText = product.addarticle;
        document.getElementById('quickViewProductName').style.color = `${colora}`;
        document.getElementById('quickViewOldPrice').innerText = product.addreduction > 0 && product.addreduction < product.addprix ? `${(product.addreduction / 1000).toFixed(3)} F.CFA` : "";
        document.getElementById('quickViewNewPrice').innerText = `${(product.addprix / 1000).toFixed(3)} F.CFA`;
        document.getElementById('rating').innerText = `5 avis`;
        document.getElementById('descrip').innerText = product.notes.length > 9 ? product.notes : "";

        let prodque = document.getElementById('productQuantity');
        if (prodque) {
            prodque.value = 1
        };


        document.getElementById('idp').value = product.who;
        document.getElementById('ido').value = `${product._id}`;

        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendshow');
        element.classList.add('hiddendhid');


        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = `${colora}`;

        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image[0].ima;

        const newURL = `detaila?ov=${product._id}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    }

};
