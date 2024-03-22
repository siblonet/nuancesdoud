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
                <a href="${adMinurl}"><i class="bx bxs-user"></i>Mon Espace</a>
    
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
                <a style="color: #006e65;" href="${adMinurl}"><i class="bx bxs-user"></i>Mon Espace</a>
    
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

function recentProduct(recenPr, ADA) {
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
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const ADS = ADA.find(item => item.which === "backglise").image;
    if (ProdAvailable.length > 0) {
        ProdAvailable.forEach((product, index) => {
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
                                                <a style="cursor: pointer !important; color: ${product.addcoul.substring(0, 7)} !important" onclick="AddtoPaniera('${product._id}')">
                                                    <i class="bx bx-shopping-bag bx bx-heart"></i>
                                                    <span class="tooltip-label">Ajouter</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="compare-btn">
                                                <a style="color: ${product.addcoul.substring(8, 15)} !important" href="detaila?ov=${product._id}">
                                                    <i class="bx bx-refresh"></i>
                                                    <span class="tooltip-label">Plus infos</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="quick-view-btn" onclick="showProductQuickView('${product._id}')">
                                                <a style="cursor: pointer !important; color: ${product.addcoul.substring(16, 23)} !important" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                                    <i class="bx bx-search-alt"></i>
                                                    <span class="tooltip-label">Vue rapide</span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            
                            </div>


                            <div class="products-content">
                                <span class="category" style="color: ${product.addcoul.substring(8, 15)};">Parfum</span>
                                <h3><a href="detaila?ov=${product._id}" style="color: ${product.addcoul.substring(0, 7)};">${product.addarticle}</a></h3>
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

                        <span class="products-discountbo aoo${product._id}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30" width="90" height="30">
                                <!-- Styling for the main SVG container -->
                                <style>
                                    .products-box .products-discountbo.aoo${product._id} {
                                        position: absolute;
                                        bottom: 96.5px;
                                        right: -6.1px;
                                        display: inline-block;
                                    }
                                    
                                    .products-box .products-discountbo.aoo${product._id} path {
                                        fill: ${product.addcoul.substring(0, 7)};
                                    }
                                    
                                    /* Styling for the ::before pseudo-element */
                                    .products-box .products-discountbo.aoo${product._id}:before {
                                        content: "";
                                        position: absolute;
                                        height: 6px;
                                        width: 6px;
                                        right: 0px;
                                        top: -6px;
                                        border-radius: 0px 80px 0px 0px;
                                        background: ${product.addcoul.substring(0, 7)}57;
                                    }
                                    
                                    /* Styling for the ::after pseudo-element */
                                    .products-box .products-discountbo.aoo${product._id}:after {
                                        content: "";
                                        position: absolute;
                                        height: 5px;
                                        width: 5.3px;
                                        right: 0.7px;
                                        top: -5px;
                                        border-radius: 0px 80px 0px 0px;
                                        background: ${product.addcoul.substring(0, 7)};
                                    }
                                </style>
                                
                                <!-- SVG path for the discount box -->
                                <path d="M0,0 90,0 Q90,30 82,30 L0,30z" />
                                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" style="font-size: 17px; font-weight: 600">
                                    -${percentDf.toFixed()}%
                                </text>
                            </svg>
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

                    <div class="products-image" style="background-color: ${product.addcoul.substring(0, 7)};" onmouseover="this.style.backgroundColor='${product.addcoul.substring(8, 15)}'" onmouseout="this.style.backgroundColor='${product.addcoul.substring(16, 23)}'">

                        <a style="cursor: pointer !important;" class="imageonweb" href="detaila?ov=${product._id}">
                            <img src="${product.image[0].ima}" class="main-image" alt="image">
                            <img src="${product.image[0].ima}" class="hover-image" alt="image"> 
                        </a>

                        <div class="products-button">
                        <ul>
                            <li>
                                <div class="wishlist-btn">
                                    <a style="cursor: pointer !important; color: ${product.addcoul.substring(0, 7)} !important" onclick="AddtoPaniera('${product._id}')">
                                        <i class="bx bx-shopping-bag bx bx-heart"></i>
                                        <span class="tooltip-label">Ajouter</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="compare-btn">
                                    <a style="color: ${product.addcoul.substring(8, 15)} !important" href="detaila?ov=${product._id}">
                                        <i class="bx bx-refresh"></i>
                                        <span class="tooltip-label">Plus infos</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="quick-view-btn" onclick="showProductQuickView('a', '${product._id}')">
                                    <a style="cursor: pointer !important; color: ${product.addcoul.substring(16, 23)} !important" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                        <i class="bx bx-search-alt"></i>
                                        <span class="tooltip-label">Vue rapide</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </div>


                <div class="products-content">
                    <span class="category" style="color: ${product.addreduction > 0 ? product.addcoul.substring(0, 7) : "#000000"};">Parfum</span>
                    <h3><a href="detaila?ov=${product._id}" style="color: ${product.addreduction > 0 ? "#000000" : product.addcoul.substring(0, 7)};">${product.addarticle}</a></h3>
                    <div class="star-rating">
                        <i class="bx bxs-star" style="color: ${product.addcoul.substring(0, 7)} !important"></i>
                        <i class="bx bxs-star" style="color: ${product.addcoul.substring(8, 15)} !important"></i>
                        <i class="bx bxs-star" style="color: ${product.addcoul.substring(16, 23)} !important"></i>
                        <i class="bx bxs-star" style="color: ${product.addcoul.substring(24, 31)} !important"></i>
                        <i class="bx bxs-star"></i>
                        <span style="color: #aaaaaa !important">5 étoiles</span>
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
                        <span class="products-discount aee${product._id}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30" width="90" height="30">
                            <!-- Styling for the main SVG container -->
                            <style>
                                .products-box .products-discount.aee${product._id} {
                                    position: absolute;
                                    top: -6.1px;
                                    right: 10px;
                                    display: inline-block;
                                }
                        
                                .products-box .products-discount.aee${product._id} path {
                                    fill: ${product.addcoul.substring(0, 7)};
                                }
                        
                                /* Styling for the ::before pseudo-element */
                                .products-box .products-discount.aee${product._id}:before {
                                    content: "";
                                    position: absolute;
                                    height: 6px;
                                    width: 6px;
                                    left: -6px;
                                    top: 0;
                                    background: ${product.addcoul.substring(0, 7)};
                                }
                        
                                /* Styling for the ::after pseudo-element */
                                .products-box .products-discount.aee${product._id}:after {
                                    content: "";
                                    position: absolute;
                                    height: 6px;
                                    width: 8px;
                                    left: -8px;
                                    top: 0;
                                    border-radius: 8px 8px 0 0;
                                    background: ${product.addcoul.substring(0, 7)};
                                }
                                
                                /* Styling for the discount percentage text */
                                .products-box .products-discount.aee${product._id} text {
                                    fill: white;
                                    font-size: 12px;
                                }
                            </style>
                            
                            <!-- SVG path for the discount box -->
                            <path d="M0,0 82,0 Q90,0 90,8 L90,30 0,30z" />
                            
                            <!-- Text element for the percentage value -->
                            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" style="font-size: 17px; font-weight: 600">
                                -${percentDf.toFixed()}%
                            </text>
                        </svg>

                    </span>
                  `
                        :
                        ""
                    }
           
            </div>
                        `
                }

                    </div>
                    ${ADS ? viewportWidth > 991 ? index == 2 ?
                    `
                            <div class="ads-view-inthemidle">
                                <img class="ads-view-image" src='${ADS}' alt="image d'evenement">
                            </div>
                        
                        `
                    :
                    ""
                    :
                    ` ${index == 1 ?
                        `
                                
                            <div class="ads-view-inthemidle">
                                <img class="ads-view-image" src='${ADS}' alt="image d'evenement">
                            </div>
                        `
                        :
                        ""
                    }
                        `
                    :
                    ""
                }
        `;

            productContainer.innerHTML += productHTML;

        });


        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
    } else {
        const tokens = sessionStorage.getItem('tibule');
        const productHTML = `
            < div class= "container" >
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
                                <a style="align-self: center; cursor: pointer; color: #006e65" href="${adMinurl}">Cliquez ici pour Ajouter un article</a>
                            </div>
                        `
                :

                ""
            }
                </div >
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

        document.getElementById('coloholder').innerText = product.addcoul;

        document.getElementById('addToCartBtn').style.backgroundColor = `${product.addcoul.substring(0, 7)} `;
        document.getElementById('addToCartBtn').style.borderColor = `${product.addcoul.substring(8, 15)} `;

        document.getElementById('quickViewProductName').innerText = product.addarticle;
        document.getElementById('quickViewProductName').style.color = `${product.addcoul.substring(0, 7)} `;

        document.getElementById('quickViewOldPrice').innerText = product.addreduction > 0 && product.addreduction < product.addprix ? `${(product.addprix / 1000).toFixed(3)} F.CFA` : "";

        document.getElementById('quickViewNewPrice').innerText = product.addreduction > 0 && product.addreduction < product.addprix ? `${(product.addreduction / 1000).toFixed(3)} F.CFA` : `${(product.addprix / 1000).toFixed(3)} F.CFA`;
        /*$('.rating .one').css('color', `${product.addcoul.substring(0, 7)} `);
        $('.rating .two').css('color', `${product.addcoul.substring(8, 15)} `);
        $('.rating .tree').css('color', `${product.addcoul.substring(16, 23)} `);
        $('.rating .four').css('color', `${product.addcoul.substring(24, 31)} `);

        document.getElementById('rating').innerText = `5 étoiles`;*/
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
        bacgro.style.backgroundColor = `${product.addcoul.substring(0, 7)} `;
        const modalImage = document.getElementById('ipage');
        modalImage.src = imagefolder[0].ima;

        const newURL = `detaila?ov=${product._id}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    } else {

        document.getElementById('coloholder').innerText = product.addcoul;

        document.getElementById('addToCartBtn').style.backgroundColor = `${product.addcoul.substring(0, 7)} `;
        document.getElementById('addToCartBtn').style.borderColor = `${product.addcoul.substring(8, 15)} `;

        document.getElementById('quickViewProductName').innerText = product.addarticle;
        document.getElementById('quickViewProductName').style.color = `${product.addcoul.substring(0, 7)} `;
        document.getElementById('quickViewOldPrice').innerText = product.addreduction > 0 && product.addreduction < product.addprix ? `${(product.addprix / 1000).toFixed(3)} F.CFA` : "";

        document.getElementById('quickViewNewPrice').innerText = product.addreduction > 0 && product.addreduction < product.addprix ? `${(product.addreduction / 1000).toFixed(3)} F.CFA` : `${(product.addprix / 1000).toFixed(3)} F.CFA`;
        
        /*$('.rating .one').css('color', `${product.addcoul.substring(0, 7)} `);
        $('.rating .two').css('color', `${product.addcoul.substring(8, 15)} `);
        $('.rating .tree').css('color', `${product.addcoul.substring(16, 23)} `);
        $('.rating .four').css('color', `${product.addcoul.substring(24, 31)} `);
        document.getElementById('rating').innerText = `5 étoiles`;*/
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
        bacgro.style.backgroundColor = `${colora} `;

        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image[0].ima;

        const newURL = `detaila?ov=${product._id}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    }

};



/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

async function FilterArticle(search) {
    const productContainer = document.getElementById('product-container');
    const recenPr = await GetArticle("avail");
    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('mobile');
    }

    const ProdAvailable = search === "all" ? recenPr : recenPr.filter((searchMatch) =>
        searchMatch.addarticle.startsWith(search) ||
        searchMatch.barcode.startsWith(search) ||
        searchMatch.addarticle.toLowerCase().startsWith(search.toLowerCase()) ||
        searchMatch.addarticle.toUpperCase().startsWith(search.toUpperCase()) ||
        searchMatch.addgenre.startsWith(search) ||
        searchMatch.addmarque.toLowerCase().startsWith(search.toLowerCase()) ||
        searchMatch.addmarque.toUpperCase().startsWith(search.toUpperCase()) ||
        searchMatch.addmarque.startsWith(search)
    )

    if (ProdAvailable.length > 0) {
        productContainer.innerHTML = ''
        ProdAvailable.forEach((product, index) => {
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
                                                <a style="cursor: pointer !important; color: ${product.addcoul.substring(0, 7)} !important" onclick="AddtoPaniera('${product._id}')">
                                                    <i class="bx bx-shopping-bag bx bx-heart"></i>
                                                    <span class="tooltip-label">Ajouter</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="compare-btn">
                                                <a style="color: ${product.addcoul.substring(8, 15)} !important" href="detaila?ov=${product._id}">
                                                    <i class="bx bx-refresh"></i>
                                                    <span class="tooltip-label">Plus infos</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="quick-view-btn" onclick="showProductQuickView('${product._id}')">
                                                <a style="cursor: pointer !important; color: ${product.addcoul.substring(16, 23)} !important" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                                    <i class="bx bx-search-alt"></i>
                                                    <span class="tooltip-label">Vue rapide</span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            
                            </div>


                            <div class="products-content">
                                <span class="category" style="color: ${product.addcoul.substring(8, 15)};">Parfum</span>
                                <h3><a href="detaila?ov=${product._id}" style="color: ${product.addcoul.substring(0, 7)};">${product.addarticle}</a></h3>
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

                        <span class="products-discountbo aoo${product._id}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30" width="90" height="30">
                                <!-- Styling for the main SVG container -->
                                <style>
                                    .products-box .products-discountbo.aoo${product._id} {
                                        position: absolute;
                                        bottom: 96.5px;
                                        right: -6.1px;
                                        display: inline-block;
                                    }
                                    
                                    .products-box .products-discountbo.aoo${product._id} path {
                                        fill: ${product.addcoul.substring(0, 7)};
                                    }
                                    
                                    /* Styling for the ::before pseudo-element */
                                    .products-box .products-discountbo.aoo${product._id}:before {
                                        content: "";
                                        position: absolute;
                                        height: 6px;
                                        width: 6px;
                                        right: 0px;
                                        top: -6px;
                                        border-radius: 0px 80px 0px 0px;
                                        background: ${product.addcoul.substring(0, 7)}57;
                                    }
                                    
                                    /* Styling for the ::after pseudo-element */
                                    .products-box .products-discountbo.aoo${product._id}:after {
                                        content: "";
                                        position: absolute;
                                        height: 5px;
                                        width: 5.3px;
                                        right: 0.7px;
                                        top: -5px;
                                        border-radius: 0px 80px 0px 0px;
                                        background: ${product.addcoul.substring(0, 7)};
                                    }
                                </style>
                                
                                <!-- SVG path for the discount box -->
                                <path d="M0,0 90,0 Q90,30 82,30 L0,30z" />
                                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" style="font-size: 17px; font-weight: 600">
                                    -${percentDf.toFixed()}%
                                </text>
                            </svg>
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

                    <div class="products-image" style="background-color: ${product.addcoul.substring(0, 7)};" onmouseover="this.style.backgroundColor='${product.addcoul.substring(8, 15)}'" onmouseout="this.style.backgroundColor='${product.addcoul.substring(16, 23)}'">

                        <a style="cursor: pointer !important;" class="imageonweb" href="detaila?ov=${product._id}">
                            <img src="${product.image[0].ima}" class="main-image" alt="image">
                            <img src="${product.image[0].ima}" class="hover-image" alt="image"> 
                        </a>

                        <div class="products-button">
                        <ul>
                            <li>
                                <div class="wishlist-btn">
                                    <a style="cursor: pointer !important; color: ${product.addcoul.substring(0, 7)} !important" onclick="AddtoPaniera('${product._id}')">
                                        <i class="bx bx-shopping-bag bx bx-heart"></i>
                                        <span class="tooltip-label">Ajouter</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="compare-btn">
                                    <a style="color: ${product.addcoul.substring(8, 15)} !important" href="detaila?ov=${product._id}">
                                        <i class="bx bx-refresh"></i>
                                        <span class="tooltip-label">Plus infos</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="quick-view-btn" onclick="showProductQuickView('a', '${product._id}')">
                                    <a style="cursor: pointer !important; color: ${product.addcoul.substring(16, 23)} !important" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                        <i class="bx bx-search-alt"></i>
                                        <span class="tooltip-label">Vue rapide</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </div>


                <div class="products-content">
                    <span class="category" style="color: ${product.addreduction > 0 ? product.addcoul.substring(0, 7) : "#000000"};">Parfum</span>
                    <h3><a href="detaila?ov=${product._id}" style="color: ${product.addreduction > 0 ? "#000000" : product.addcoul.substring(0, 7)};">${product.addarticle}</a></h3>
                    <div class="star-rating">
                        <i class="bx bxs-star" style="color: ${product.addcoul.substring(0, 7)} !important"></i>
                        <i class="bx bxs-star" style="color: ${product.addcoul.substring(8, 15)} !important"></i>
                        <i class="bx bxs-star" style="color: ${product.addcoul.substring(16, 23)} !important"></i>
                        <i class="bx bxs-star" style="color: ${product.addcoul.substring(24, 31)} !important"></i>
                        <i class="bx bxs-star"></i>
                        <span style="color: #aaaaaa !important">5 étoiles</span>
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
                        <span class="products-discount aee${product._id}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30" width="90" height="30">
                            <!-- Styling for the main SVG container -->
                            <style>
                                .products-box .products-discount.aee${product._id} {
                                    position: absolute;
                                    top: -6.1px;
                                    right: 10px;
                                    display: inline-block;
                                }
                        
                                .products-box .products-discount.aee${product._id} path {
                                    fill: ${product.addcoul.substring(0, 7)};
                                }
                        
                                /* Styling for the ::before pseudo-element */
                                .products-box .products-discount.aee${product._id}:before {
                                    content: "";
                                    position: absolute;
                                    height: 6px;
                                    width: 6px;
                                    left: -6px;
                                    top: 0;
                                    background: ${product.addcoul.substring(0, 7)};
                                }
                        
                                /* Styling for the ::after pseudo-element */
                                .products-box .products-discount.aee${product._id}:after {
                                    content: "";
                                    position: absolute;
                                    height: 6px;
                                    width: 8px;
                                    left: -8px;
                                    top: 0;
                                    border-radius: 8px 8px 0 0;
                                    background: ${product.addcoul.substring(0, 7)};
                                }
                                
                                /* Styling for the discount percentage text */
                                .products-box .products-discount.aee${product._id} text {
                                    fill: white;
                                    font-size: 12px;
                                }
                            </style>
                            
                            <!-- SVG path for the discount box -->
                            <path d="M0,0 82,0 Q90,0 90,8 L90,30 0,30z" />
                            
                            <!-- Text element for the percentage value -->
                            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" style="font-size: 17px; font-weight: 600">
                                -${percentDf.toFixed()}%
                            </text>
                        </svg>

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

        const productHTML = `
        < div class="container" >
                    <div class="section-title">
                        <h2>${search} est indisponible pour l'instant</h2>
                    </div>
                    <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                        <img src="assets/img/error-404.png" alt="Le magasin est vide">
                    </div>
                 
                </div >
        `;

        productContainer.innerHTML = productHTML;
        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
    };
    getUsenam();

};

const inputElements = document.getElementById("searchArticle");

// Add an event listener for the input event
inputElements.addEventListener("input", function () {


    FilterArticle(inputElements.value)
});