let recenProd = [];
let isAdmin = false;
let imagefolder = [];


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

    }
};

getUsenam();


async function navigateAdminCLient() {
    await openOrdersDatabase();
    await clearOrder();
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload()
}


function clearOrder() {
    return new Promise((resolve, reject) => {
        const transaction = orderdb.transaction(["OrderdStore"], "readwrite");
        const objectStore = transaction.objectStore("OrderdStore");
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = (event) => {
            resolve("cleared")
        };

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };


    });

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
            const percentDf = ((product.addreduction - product.addprix) / product.addprix) * 100;
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
                                ${product.addreduction > product.addprix ?
                        `
                                            <span class="old-price">${product.addreduction} F.CFA</span>
                                    `
                        :
                        ""
                    }
                                    <span class="new-price">${product.addprix} F.CFA</span>
                                </div>
                                <a style="cursor: pointer !important;" class="add-to-cart" onclick="Pannier('${product._id}')">Ajouter au panier</a>
                            </div>
                            ${product.addreduction > product.addprix ?
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
                    ${product.addreduction > product.addprix ?
                        `
                                <span class="old-price">${product.addreduction} F.CFA</span>
                        `
                        :
                        ""
                    }
                        <span class="new-price">${product.addprix} F.CFA</span>
                    </div>
                    <a style="cursor: pointer !important;" class="add-to-cart" onclick="Pannier('${product._id}')">Ajouter au panier</a>
                </div>
                ${product.addreduction > product.addprix ?
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

        if (!isAdmin) {

            const livecha = document.getElementById('live-chat');

            setTimeout(() => {
                livecha.classList.add('active');
            }, 5000);
        }
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

        if (!isAdmin) {
            const livecha = document.getElementById('live-chat');

            setTimeout(() => {
                livecha.classList.add('active');
            }, 5000);
        }

    }
};


async function showProductQuickView(a, productId) {
    //await openDatabase();
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    let result;
    const getRequest = objectStore.get(productId);
    getRequest.onsuccess = (event) => {
        result = event.target.result;

    };

    transaction.onerror = (event) => {
        console.log(event.target.error);
    };

    await openArticleDatabase();
    const transactiona = articldb.transaction(["ArticleStore"], "readonly");
    const objectStorea = transactiona.objectStore("ArticleStore");
    const getRequesta = objectStorea.get(productId);
    getRequesta.onsuccess = (event) => {
        const product = event.target.result;
        if (!result) {
            imagefolder = product.image;

            const splo = product.addcoul.split(",") ? product.addcoul.split(",") : "gold";
            const colora = splo[0] == "null" ? "gold" : splo[0] == "#ffffff" || "#FFFFFF" ? "gold" : splo[0];

            document.getElementById('coloholder').innerText = product.addcoul;

            document.getElementById('addToCartBtn').style.backgroundColor = colora;
            document.getElementById('addToCartBtn').style.borderColor = colora;

            document.getElementById('quickViewProductName').innerText = product.addarticle;
            document.getElementById('quickViewProductName').style.color = `${colora}`;

            document.getElementById('quickViewOldPrice').innerText = product.addreduction > product.addprix ? `${product.addreduction} F.CFA` : "";

            document.getElementById('quickViewNewPrice').innerText = `${product.addprix} F.CFA`;
            document.getElementById('rating').innerText = `5 avis`;
            document.getElementById('descrip').innerText = product.notes;


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
            document.getElementById('quickViewOldPrice').innerText = product.addreduction > product.addprix ? `${product.addreduction} F.CFA` : "";
            document.getElementById('quickViewNewPrice').innerText = `${product.addprix} F.CFA`;
            document.getElementById('rating').innerText = `5 avis`;

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


    getRequesta.onerror = (event) => {
        console.error("Error accessing object store:", event.target.error);
    };
};



function quickImagechanger(impog) {
    const modalImage = document.getElementById('ipage');
    modalImage.src = imagefolder[impog].ima;

}
