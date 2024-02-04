function addArticles(data) {
    const transaction = articldb.transaction(["ArticleStore"], "readwrite");
    const objectStore = transaction.objectStore("ArticleStore");

    data.map(article => {
        objectStore.add(article);

    });
    recentProduct(data)
}

function addSetting(dat) {
    const transactionp = pageSettings.transaction(["PageContents"], "readwrite");
    const objectStorep = transactionp.objectStore("PageContents");

    dat.map(settinga => {
        objectStorep.add(settinga);

    });

    setPad(dat)
}

function addOrdersa(dat) {
    const transactionp = orderdb.transaction(["OrderdStore"], "readwrite");
    const objectStorep = transactionp.objectStore("OrderdStore");

    dat.map(order => {
        objectStorep.add(order);

    });
}

const sendRequestnot = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        return null
    }

    return responseData;
};

function clearArticle(items) {
    const transacti = articldb.transaction(["ArticleStore"], "readwrite");
    const objectAr = transacti.objectStore("ArticleStore");

    const clearRequest = objectAr.clear();
    clearRequest.onsuccess = () => {
        addArticles(items)
    };

    clearRequest.onerror = (event) => {
        console.log(event.target.error);
    };

    //TotalAll("clear", {});
}

function clearSetting(items) {
    const transactip = pageSettings.transaction(["PageContents"], "readwrite");
    const objectArp = transactip.objectStore("PageContents");

    const clearRequestp = objectArp.clear();
    clearRequestp.onsuccess = () => {
        addSetting(items)
    };

    clearRequestp.onerror = (event) => {
        console.log(event.target.error);
    };

}

function clearOrdersa(items) {
    const transactip = orderdb.transaction(["OrderdStore"], "readwrite");
    const objectArp = transactip.objectStore("OrderdStore");

    const clearRequestp = objectArp.clear();
    clearRequestp.onsuccess = () => {
        addOrdersa(items)
    };

    clearRequestp.onerror = (event) => {
        console.log(event.target.error);
    };

}

const Reloada = () => {
    window.location.reload();
}


async function DataLoad() {
    sessionStorage.setItem('session', "im here");
    try {
        const items = await sendRequestnot('GET', 'boutique/noble');
        //console.log(items);
        if (!items) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            const productHTML = `
            <div class="container">
                <div class="section-title">
                    <span style="color: red !important">Vérifiez que vous avez access a l'internet</span>
                </div>
                <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                    <img src="assets/img/error-404.png" alt="Internet Error">
                </div>
                <br>
                <br>
                <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                    <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
                </div>
    
            </div>
    `;
            productContainer.innerHTML += productHTML;
            const loaderRemove = document.getElementById('loaderRemove');
            loaderRemove.innerHTML = "";
            loaderRemove.style.display = "none";

        } else {
            const datoaa = [{
                "_id": "655d4334f93f7154154c6430",
                "addarticle": "Emporio Armani",
                "quantity": 30,
                "addgenre": "Homme",
                "addtransage": "15-75",
                "addprix": 30000,
                "addreduction": 34600,
                "addoccasion": "Promo",
                "addfour": "Noble",
                "adddispo": "En stock",
                "addnouveaute": "Nouveau",
                "addcoul": "#E0D2B7,#D7C0B3,#45272A,#FFFFFF,#060606",
                "addtail": "34,38,40,44",
                "addmateri": "Acier inoxydable",
                "addmarque": "Emporio armani",
                "addtype": "Accessoires",
                "addtypepro": "Montre",
                "addphone": "0748643884",
                "addexpe": "Disponible sur place",
                "notes": "La montre Emporio Armani incarne le raffinement et l'élégance intemporelle. Avec son boîtier sophistiqué et son bracelet de qualité, cette montre allie un design moderne à une attention méticuleuse aux détails. Dotée d'un mouvement précis et fiable, elle offre non seulement un accessoire de style, mais aussi une fonctionnalité impeccable. Que ce soit pour une tenue formelle ou décontractée, cette montre est un véritable symbole de sophistication. Découvrez cette pièce incontournable de la collection Emporio Armani pour compléter votre style avec classe et distinction.",
                "owner": "noble",
                "image": [
                    {
                        "ima": "https://www.freepik.com/free-ai-image/dark-glass-bottle-with-single-liquid-drop-generative-ai_40968153.htm#query=parfum&position=5&from_view=search&track=sph&uuid=a41e5ad2-3ca1-4a01-bb37-e88c9b239f08",
                        "_id": "655d4334f93f7154154c6431"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/5d2d1866-1a8e-4b90-891c-4ced008fcb56IMG-20231120-WA0136.jpg",
                        "_id": "655d4334f93f7154154c6432"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/0b19b365-ec1c-49dd-9030-3672d871e3e4IMG-20231120-WA0137.jpg",
                        "_id": "655d4334f93f7154154c6433"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/76f58341-2009-43fe-894d-2f148d321659IMG-20231120-WA0124.jpg",
                        "_id": "655d4334f93f7154154c6434"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/fe986bde-32d3-40b4-b716-0166d5c85b98IMG-20231120-WA0125.jpg",
                        "_id": "655d4334f93f7154154c6435"
                    }
                ],
                "created": "2023-11-21T23:54:28.168Z",
                "__v": 0
            },
            {
                "_id": "65589482b769a60e37828d3a",
                "addarticle": "Chemises manches courtes",
                "quantity": 25,
                "addgenre": "Homme",
                "addtransage": "15-80",
                "addprix": 20000,
                "addreduction": 25000,
                "addoccasion": "Promo",
                "addfour": "Noble",
                "adddispo": "En stock",
                "addnouveaute": "Nouveau",
                "addcoul": "#775357,#D9A6D4,#3A1A85,#AB8A2D,#D9A6D4",
                "addtail": "L,M,XL,XXL",
                "addmateri": "Coton",
                "addmarque": "Noble",
                "addtype": "Accoutrement",
                "addtypepro": "vertement ",
                "addphone": "0748643884",
                "addexpe": "Disponible sur place",
                "notes": "Les chemises à manches courtes de la marque 'Noble' incarnent le raffinement estival et la modernité par leur coupe ajustée et leurs finitions soignées. Confectionnées dans un tissu de qualité, ces chemises offrent un confort optimal tout en présentant un style sophistiqué pour les journées ensoleillées. Leur coupe moderne flatte la silhouette et témoigne de l'attention portée aux détails par la marque 'Noble'. Polyvalentes et élégantes, ces chemises à manches courtes sont des essentiels pour un look décontracté et chic pendant la saison estivale.",
                "owner": "noble",
                "image": [
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/a235d5c7-a5dd-4b97-989d-5fadd7ae9167IMG-20231117-WA0088.jpg",
                        "_id": "65589482b769a60e37828d3b"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/60a7dc48-e929-4f81-8843-5d0b503e09d7IMG-20231117-WA0073.jpg",
                        "_id": "65589482b769a60e37828d3c"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/e9beb9aa-97b2-435d-a673-ba632890cf9bIMG-20231117-WA0069.jpg",
                        "_id": "65589482b769a60e37828d3d"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/b79422ed-0c5f-4691-bf10-683a21050f3fIMG-20231117-WA0070.jpg",
                        "_id": "65589482b769a60e37828d3e"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/c69c729f-a80f-4359-a0be-85162412e4deIMG-20231117-WA0072.jpg",
                        "_id": "65589482b769a60e37828d3f"
                    }
                ],
                "created": "2023-11-18T10:40:02.553Z",
                "__v": 0
            },
            {
                "_id": "655e5cc84714e26bc457cf51",
                "addarticle": " Carrera Calibre 1887",
                "quantity": 85,
                "addgenre": "Homme",
                "addtransage": "15-80",
                "addprix": 30000,
                "addreduction": 35900,
                "addoccasion": "Promo",
                "addfour": "Noble",
                "adddispo": "En stock",
                "addnouveaute": "Nouveau",
                "addcoul": "#020a17,#c5c1b8,#f1f2ed,#c5c1b8,#020a17",
                "addtail": "34,38,40,44",
                "addmateri": "Acier inoxydable",
                "addmarque": " Carrera Calibre 1887",
                "addtype": "Accessoires",
                "addtypepro": "Montre",
                "addphone": "0748643884",
                "addexpe": "Disponible sur place",
                "notes": "La montre TAG Heuer Carrera Calibre 1887 incarne l'alliance parfaite entre tradition horlogère et innovation. Dotée du célèbre mouvement chronographe Calibre 1887, cette montre capture l'héritage légendaire de TAG Heuer en matière de précision et de performance. Son design élégant et sportif, inspiré des courses automobiles, offre une esthétique dynamique et sophistiquée. Les détails raffinés de la Carrera, combinés à la technologie de pointe du Calibre 1887, font de cette montre un symbole de l'excellence horlogère. Précise, fiable et emblématique, la Carrera Calibre 1887 est bien plus qu'une montre : c'est un hommage à l'ingénierie de qualité et au savoir-faire exceptionnel de TAG Heuer.",
                "owner": "noble",
                "image": [
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/4f0dae20-05c2-49ab-8cb8-e0bdd470e3b82.png",
                        "_id": "655e5cc84714e26bc457cf52"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/63551be5-25e9-4719-9ddd-91a543285cc4IMG-20231120-WA0008.png",
                        "_id": "655e5cc84714e26bc457cf53"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/cbefd68c-c57c-40bb-9bb5-4d182ae56b2d3.png",
                        "_id": "655e5cc84714e26bc457cf54"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/ed9ae873-67a2-4eea-bc18-ff7a42ecd135IMG-20231120-WA0012.jpg",
                        "_id": "655e5cc84714e26bc457cf55"
                    },
                    {
                        "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/c9d7c0b8-0538-4dcf-a21f-37a1862c2042IMG-20231120-WA0010.jpg",
                        "_id": "655e5cc84714e26bc457cf56"
                    }
                ],
                "created": "2023-11-22T19:55:52.860Z",
                "__v": 0
            }];
            await openArticleDatabase()
            clearArticle(datoaa);
            //console.log(items.article);
            //await openArticleDatabase()
            //clearArticle(items.article);
            await openPersonnalizingDatabase()
            clearSetting(items.pagesetting);
            await openOrdersDatabase()
            clearOrdersa(items.order);
        }

    } catch (e) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        const productHTML = `
        <div class="container">
            <div class="section-title">
                <span style="color: red !important" id="isemptyorintern">Vérifiez que vous avez access a l'internet</span>
            </div>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <img src="assets/img/error-404.png" alt="Internet Error">
            </div>
            <br>
            <br>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
            </div>

        </div>
`;
        productContainer.innerHTML += productHTML;
        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
    };

};


const sessi = sessionStorage.getItem('session');
if (!sessi) {
    DataLoad();

} else {
    async function loadData() {
        await openPersonnalizingDatabase()
        const transactiona = pageSettings.transaction(["PageContents"], "readonly");
        const objectStorea = transactiona.objectStore("PageContents");
        const dataa = [];

        objectStorea.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                dataa.push(cursor.value);
                cursor.continue();
            } else {
                setPad(dataa)
            }
        };


        await openArticleDatabase()
        const transaction = articldb.transaction(["ArticleStore"], "readonly");
        const objectStore = transaction.objectStore("ArticleStore");
        const data = [];

        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                data.push(cursor.value);
                cursor.continue();
            } else {
                recentProduct(data)
            }
        }
    }

    loadData()
};

function getallArticles() {
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            pannierCotent.push(cursor.value);
            cursor.continue();
        } else {

        }
    }
}
