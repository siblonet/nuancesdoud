let recenProd = [];
let selct = [];
let selctSize = [];
let isAdmin = false;

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
                                    <img class="two" src="${product.image[1].ima}" alt="image"> 
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
                                                <a style="color: ${product.addcoul.substring(8, 15)} !important" href="details.html?ov=${product._id}}">
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
                                <span class="category" style="color: ${product.addcoul.substring(0, 7)};">${product.addtypepro}</span>
                                <h3><a href="details.html?ov=${product._id}">${product.addarticle}</a></h3>
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
                            ${product.addnouveaute == "NOUVEAU" ?
                            `
                                <i class="nouveau">Nouveautés</i>
                                `
                            :
                            ""
                        }
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
                            href="details.html?ov=${product._id}">
                            <img src="${product.image[0].ima}" class="main-image" alt="image">
                            <img src="${product.image[1].ima}" class="hover-image" alt="image"> 
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
                                    <a style="color: ${product.addcoul.substring(8, 15)} !important" href="details.html?ov=${product._id}}">
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
                    ${product.addnouveaute == "NOUVEAU" && product.addreduction < product.addprix ?
                        `
            <div class="new-tag">Nouveautés</div>
            `
                        :
                        ""
                    } 
                    ${product.addoccasion == "PROMO" ?
                        `
                            <div class="new-tage">Promo</div>
                        `
                        :
                        ""
                    }

                    ${product.addoccasion == "SOLD" ?
                        `
                        <div class="sale-tag">Solde</div>
                    `
                        :
                        ""
                    }
                </div>


                <div class="products-content">
                    <span class="category" style="color: ${product.addcoul.substring(0, 7)};">${product.addtypepro}</span>
                    <h3><a href="details.html?ov=${product._id}">${product.addarticle}</a></h3>
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
                    ${product.addnouveaute == "NOUVEAU" ?
                            `
                    <i class="nouveau">Nouveautés</i>
                    `
                            :
                            ""
                        }
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
    selct = [];
    selctSize = [];
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
            const splo = product.addcoul.split(",") ? product.addcoul.split(",") : "#eeeeee";
            const colora = splo[0] == "null" ? "#eeeeee" : splo[0];
            const colorb = splo[1] == "null" ? "#eeeeee" : splo[1];
            const colorc = splo[2] == "null" ? "#eeeeee" : splo[2];
            const colord = splo[3] == "null" ? "#eeeeee" : splo[3];
            const colore = splo[4] == "null" ? "#eeeeee" : splo[4];

            const sploa = product.addtail.split(",") ? product.addtail.split(",") : "-";
            const qsizea = sploa[0] == "null" ? "-" : sploa[0];
            const qsizeb = sploa[1] == "null" ? "-" : sploa[1];
            const qsizec = sploa[2] == "null" ? "-" : sploa[2];
            const qsized = sploa[3] == "null" ? "-" : sploa[3];
            const qsizee = sploa[4] == "null" ? "-" : sploa[4];

            document.getElementById('coloholder').innerText = product.addcoul;

            document.getElementById('addToCartBtn').style.backgroundColor = colora;
            document.getElementById('addToCartBtn').style.borderColor = colora;

            const quickChosingHtml = document.getElementById('quickColose');
            quickChosingHtml.innerHTML = '';

            document.getElementById('quickViewProductName').innerText = product.addarticle;
            document.getElementById('quickViewProductName').style.color = `${colora}`;

            document.getElementById('quickViewOldPrice').innerText = product.addreduction > product.addprix ? `${product.addreduction} F.CFA` : "";

            document.getElementById('quickViewNewPrice').innerText = `${product.addprix} F.CFA`;
            document.getElementById('rating').innerText = `5 avis`;
            document.getElementById('quickFour').innerText = `${product.addfour}`;
            document.getElementById('quickDispo').innerText = `${product.adddispo}`;
            document.getElementById('quickType').innerText = `${product.addtype}`;

            let prodque = document.getElementById('productQuantity');
            if (prodque) {
                prodque.value = 1
            };

            const quickCouleuHtml = document.getElementById('quickCouleu');
            const quickTailHtml = document.getElementById('quickTail');
            quickCouleuHtml.innerHTML = '';
            quickTailHtml.innerHTML = '';

            const quickColoHTML = `
                            <li><a onclick="quiColorfun('0', '${colora}', '${product.image[0].ima}')" style="cursor: pointer !important; background-color: ${colora} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('1', '${colorb}', '${product.image[1].ima}')" style="cursor: pointer !important; background-color: ${colorb} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('2', '${colorc}', '${product.image[2].ima}')" style="cursor: pointer !important; background-color: ${colorc} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('3', '${colord}', '${product.image[3].ima}')" style="cursor: pointer !important; background-color: ${colord} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('4', '${colore}', '${product.image[4].ima}')" style="cursor: pointer !important; background-color: ${colore} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            `
            quickCouleuHtml.innerHTML = quickColoHTML;

            const quickSizeHTML = `
                            <li><a id="quisizelia" onclick="quiSizefun('a', '${qsizea}')" style="cursor: pointer !important; border-color: ${colora}; color: ${colora}">${qsizea}</a></li>
                            <li><a id="quisizelib" onclick="quiSizefun('b', '${qsizeb}')" style="cursor: pointer !important">${qsizeb}</a></li>
                            <li><a id="quisizelic" onclick="quiSizefun('c', '${qsizec}')" style="cursor: pointer !important">${qsizec}</a></li>
                            <li><a id="quisizelid" onclick="quiSizefun('d', '${qsized}')" style="cursor: pointer !important">${qsized}</a></li>
                            <li><a id="quisizelie" onclick="quiSizefun('e', '${qsizee}')" style="cursor: pointer !important">${qsizee}</a></li>
                            `
            quickTailHtml.innerHTML = quickSizeHTML;
            document.getElementById('idp').value = product.who;
            document.getElementById('ido').value = `${product._id}`;

            const element = document.getElementById('hidlater');
            element.classList.remove('hiddendhid');
            element.classList.add('hiddendshow');


            const bacgro = document.getElementById('bagron');
            bacgro.style.backgroundColor = `${colora}`;
            const modalImage = document.getElementById('ipage');
            modalImage.src = a == "a" ? product.image[0].ima : product.image[1].ima;

            const newURL = `details.html?ov=${product._id}`;  // Replace with the desired new URL

            const linkElement = document.getElementById('change-url');

            if (linkElement) {
                linkElement.setAttribute('href', newURL);
            }
        } else {
            const splo = product.addcoul.split(",") ? product.addcoul.split(",") : "#eeeeee";
            const colora = splo[0] == "null" ? "#eeeeee" : splo[0];
            const colorb = splo[1] == "null" ? "#eeeeee" : splo[1];
            const colorc = splo[2] == "null" ? "#eeeeee" : splo[2];
            const colord = splo[3] == "null" ? "#eeeeee" : splo[3];
            const colore = splo[4] == "null" ? "#eeeeee" : splo[4];

            const sploa = product.addtail.split(",") ? product.addtail.split(",") : "-";
            const qsizea = sploa[0] == "null" ? "-" : sploa[0];
            const qsizeb = sploa[1] == "null" ? "-" : sploa[1];
            const qsizec = sploa[2] == "null" ? "-" : sploa[2];
            const qsized = sploa[3] == "null" ? "-" : sploa[3];
            const qsizee = sploa[4] == "null" ? "-" : sploa[4];
            document.getElementById('coloholder').innerText = product.addcoul;

            document.getElementById('addToCartBtn').style.backgroundColor = colora;
            document.getElementById('addToCartBtn').style.borderColor = colora;

            const quickChosingHtml = document.getElementById('quickColose');
            quickChosingHtml.innerHTML = '';
            document.getElementById('quickViewProductName').innerText = product.addarticle;
            document.getElementById('quickViewProductName').style.color = `${colora}`;
            document.getElementById('quickViewOldPrice').innerText = product.addreduction > product.addprix ? `${product.addreduction} F.CFA` : "";
            document.getElementById('quickViewNewPrice').innerText = `${product.addprix} F.CFA`;
            document.getElementById('rating').innerText = `5 avis`;
            document.getElementById('quickFour').innerText = `${product.addfour}`;
            document.getElementById('quickDispo').innerText = `${product.adddispo}`;
            document.getElementById('quickType').innerText = `${product.addtype}`;

            let prodque = document.getElementById('productQuantity');
            if (prodque) {
                prodque.value = 1
            };

            const quickCouleuHtml = document.getElementById('quickCouleu');
            const quickTailHtml = document.getElementById('quickTail');
            quickCouleuHtml.innerHTML = '';
            quickTailHtml.innerHTML = '';

            const quickColoHTML = `
                            <li><a onclick="quiColorfun('0', '${colora}', '${product.image[0].ima}')" style="cursor: pointer !important; background-color: ${colora} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('1', '${colorb}', '${product.image[1].ima}')" style="cursor: pointer !important; background-color: ${colorb} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('2', '${colorc}', '${product.image[2].ima}')" style="cursor: pointer !important; background-color: ${colorc} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('3', '${colord}', '${product.image[3].ima}')" style="cursor: pointer !important; background-color: ${colord} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            <li><a onclick="quiColorfun('4', '${colore}', '${product.image[4].ima}')" style="cursor: pointer !important; background-color: ${colore} !important; border: 1px solid #f8f8f8 !important"></a></li>
                            `
            quickCouleuHtml.innerHTML = quickColoHTML;

            const quickSizeHTML = `
                            <li><a id="quisizelia" onclick="quiSizefun('a', '${qsizea}')" style="cursor: pointer !important; border-color: ${colora}; color: ${colora}">${qsizea}</a></li>
                            <li><a id="quisizelib" onclick="quiSizefun('b', '${qsizeb}')" style="cursor: pointer !important">${qsizeb}</a></li>
                            <li><a id="quisizelic" onclick="quiSizefun('c', '${qsizec}')" style="cursor: pointer !important">${qsizec}</a></li>
                            <li><a id="quisizelid" onclick="quiSizefun('d', '${qsized}')" style="cursor: pointer !important">${qsized}</a></li>
                            <li><a id="quisizelie" onclick="quiSizefun('e', '${qsizee}')" style="cursor: pointer !important">${qsizee}</a></li>
                            `
            quickTailHtml.innerHTML = quickSizeHTML;
            document.getElementById('idp').value = product.who;
            document.getElementById('ido').value = `${product._id}`;

            const element = document.getElementById('hidlater');
            element.classList.remove('hiddendshow');
            element.classList.add('hiddendhid');


            const bacgro = document.getElementById('bagron');
            bacgro.style.backgroundColor = `${colora}`;

            const modalImage = document.getElementById('ipage');
            modalImage.src = a == "a" ? product.image[0].ima : product.image[1].ima;

            const newURL = `details.html?ov=${product._id}`;  // Replace with the desired new URL

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


function quiSizefun(id, siz) {
    const colo = document.getElementById("coloholder").innerText;

    if (selct.length == 0 && `quisizeli${id}` !== "quisizelia") {
        const onea = document.getElementById("quisizelia");
        const one = document.getElementById(`quisizeli${id}`);
        onea.style.color = "#858585";
        onea.style.borderColor = "#eeeeee";
        switch (id) {
            case "a":
                one.style.color = colo.substring(0, 7);
                one.style.borderColor = colo.substring(0, 7);
                break;
            case "b":
                one.style.color = colo.substring(8, 15);
                one.style.borderColor = colo.substring(8, 15);
                break;

            case "c":
                one.style.color = colo.substring(16, 23);
                one.style.borderColor = colo.substring(16, 23);
                break;

            case "d":
                one.style.color = colo.substring(24, 31);
                one.style.borderColor = colo.substring(24, 31);
                break;

            case "e":
                one.style.color = colo.substring(32, 39);
                one.style.borderColor = colo.substring(32, 39);
                break;

            default:
                break;
        }
        selct.push({ id: `quisizeli${id}`, size: siz });
    } else {
        let prodque = document.getElementById('productQuantity').value;
        if (parseInt(prodque) + 1 > selct.length + 1) {
            const one = document.getElementById(`quisizeli${id}`);
            switch (id) {
                case "a":
                    one.style.color = colo.substring(0, 7);
                    one.style.borderColor = colo.substring(0, 7);
                    break;
                case "b":
                    one.style.color = colo.substring(8, 15);
                    one.style.borderColor = colo.substring(8, 15);
                    break;

                case "c":
                    one.style.color = colo.substring(16, 23);
                    one.style.borderColor = colo.substring(16, 23);
                    break;

                case "d":
                    one.style.color = colo.substring(24, 31);
                    one.style.borderColor = colo.substring(24, 31);
                    break;

                case "e":
                    one.style.color = colo.substring(32, 39);
                    one.style.borderColor = colo.substring(32, 39);
                    break;

                default:
                    break;
            }

            selct.push({ id: `quisizeli${id}`, size: siz });
        } else {
            selct.forEach(ee => {
                const one = document.getElementById(`${ee.id}`);
                one.style.color = "#858585";
                one.style.borderColor = "#eeeeee";
            });
            selct = [];
            const one = document.getElementById(`quisizeli${id}`);
            switch (id) {
                case "a":
                    one.style.color = colo.substring(0, 7);
                    one.style.borderColor = colo.substring(0, 7);
                    break;
                case "b":
                    one.style.color = colo.substring(8, 15);
                    one.style.borderColor = colo.substring(8, 15);
                    break;

                case "c":
                    one.style.color = colo.substring(16, 23);
                    one.style.borderColor = colo.substring(16, 23);
                    break;

                case "d":
                    one.style.color = colo.substring(24, 31);
                    one.style.borderColor = colo.substring(24, 31);
                    break;

                case "e":
                    one.style.color = colo.substring(32, 39);
                    one.style.borderColor = colo.substring(32, 39);
                    break;

                default:
                    break;
            }
            selct.push({ id: `quisizeli${id}`, size: siz });
        };
    }

};

function quiColorfun(impo, id, im) {
    const bacgro = document.getElementById('bagron');
    bacgro.style.backgroundColor = id;
    const modalImage = document.getElementById('ipage');
    modalImage.src = im;
    let proquant = document.getElementById('productQuantity').value;



    document.getElementById('quickViewProductName').style.color = id;
    document.getElementById('addToCartBtn').style.backgroundColor = id;
    document.getElementById('addToCartBtn').style.borderColor = id;




    const quickTailHtml = document.getElementById('quickColose');
    quickTailHtml.innerHTML = '';

    if (selctSize.length == 0 && parseInt(proquant) == 1) {
        selctSize.push({ col: id, id: impo });

        const quickSizeHTML = `<li style="background-color: ${id};"><a onclick="quiColoremo(${0})" style="cursor: pointer !important"></a></li>`;
        quickTailHtml.innerHTML = quickSizeHTML;

    } else {
        if (parseInt(proquant) > selctSize.length) {
            selctSize.push({ col: id, id: impo });
            let quickSizeHTML = '';
            selctSize.forEach((coa, index) => {
                quickSizeHTML += `<li style="background-color: ${coa.col};"><a onclick="quiColoremo('${index}')" style="cursor: pointer !important"></a></li>`;
            });
            quickTailHtml.innerHTML = quickSizeHTML;
        } else {
            selctSize = [];
            selctSize.push({ col: id, id: impo });
            const quickSizeHTML = `<li style="background-color: ${id};"><a onclick="quiColoremo(${0})" style="cursor: pointer !important"></a></li>`;
            quickTailHtml.innerHTML = quickSizeHTML;
        }
    }
}

function quiColoremo(pos) {
    const quickTailHtml = document.getElementById('quickColose');
    quickTailHtml.innerHTML = '';
    if (pos >= 0 && pos < selctSize.length) {
        selctSize.splice(pos, 1);
        let quickSizeHTML = '';
        selctSize.forEach((coa, index) => {
            quickSizeHTML += `<li style="background-color: ${coa.col};"><a onclick="quiColoremo('${index}')" style="cursor: pointer !important"></a></li>`;
        });
        quickTailHtml.innerHTML = quickSizeHTML;

    }

}