let totalPricea = 0;

function getAdmin() {
    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    /*const name = splo[0];
    const lastname = splo[1];
    const phone = splo[2];
    const mail = splo[3];*/
    const admin = splo[5];
    //const mynam = thisiswhat(`${name}â${lastname}â${phone}â${mail}â${admin}`)
    //sessionStorage.clear();

    /*(async () => {
        await openOrdersDatabase();
        await clearOrder();
        await openArticleDatabase();
        await clearArticle();
    });*/

    return admin == "GIFV" ? true : false

};


async function clearArticlea() {
    const transacti = articldb.transaction(["ArticleStore"], "readwrite");
    const objectAr = transacti.objectStore("ArticleStore");

    const clearRequest = objectAr.clear();
    let answer;

    clearRequest.onsuccess = (event) => {
        answer = "cleared"
    };

    clearRequest.onerror = (event) => {
        answer = event.target.error;
    };

};


const imas = [];

function previewImagef(event) {
    const imagePreview = document.getElementById("imagePreview1");
    imagePreview.innerHTML = "<span style='color: red'>En cours ..</span>";
    if (imas.length < 5) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="aricle image" width="200px" height="300">`;

                reader.readAsDataURL(file);
            };
        }
    }
};

async function previewImage() {
    const imagePreview = document.getElementById("imagePreview1");
    imagePreview.innerHTML = "<span style='color: red'>En cours ..</span>";
    if (imas.length < 5) {
        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0];

        if (!file) {
            alert("Aucune image n'a été selectionné!");
            return;
        }

        const reader = new FileReader();
        reader.onload = async function (event) {
            const base64Data = event.target.result.split(',')[1];
            await sendBase64ToServer(base64Data, file.name);
        };
        reader.readAsDataURL(file);
    } else if (imas.length > 4) {
        document.getElementById('limitimag').style.display = "none";
    }
}

async function sendBase64ToServer(base64Data, fileName) {

    const imagePreview = document.getElementById("imagePreview1");

    const response = await fetch(apiUrlfine + "boutique/uploadImage", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ima: base64Data, nam: fileName }),
    });

    if (response.ok) {
        const url = await response.json();
        imas.push(url);
        imagePreview.innerHTML = `<img src="${url.ima}" alt="aricle image" width="200px" height="300">`;
    } else {
        console.error('Error getting signed URL:', response.statusText);
    }
}


function removeImageCreate() {
    var result = window.confirm("Voulez vous vraiment le retirer?");

    if (result) {
        document.getElementById('imagePreview1').innerHTML = "";
    }

}


const sendRequest = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

const sendRequestnotoa = async (method, endpoint, data = null) => {
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
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

function ClearImage() {
    var result = window.confirm("Voulez vous vraiment vider?");

    if (result) {

        imas.forEach((ef, da) => {
            const imagePreview = document.getElementById(`imagePreview${da + 1}`);
            imagePreview.innerHTML = '';
        });
        imas.length = 0;
    }

}

function AddArticleTest() {
    document.getElementById("ajouteencou").innerText = "En cours"
    const product = {
        "addarticle": "Chemise nuance à manches court",
        "quantity": 1,
        "addgenre": "Homme",
        "addprix": 5,
        "addreduction": 4,
        "addoccasion": "promo",
        "adddispo": "En stock (1articles)",
        "addcoul": "#f0cdc4,#05208f,#f0cdc4,#05208f,05208f",
        "addmarque": "nuance",
        "notes": "Une chemise très belle",
        "image": [
            { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/7b3c83ed-2b5b-435d-a9ea-4657597df12echemisenobeb.jpeg" },
            { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/302167f5-923a-42c3-9867-d2912bc18a5dchemisenobea.jpeg" },
            { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/896a78e3-fb91-4bba-8804-164b6f2baef2chemisenobeb.jpeg" },
            { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/c491b541-15aa-4278-bbd3-8347f8def372chemisenobea.jpeg" },
            { "ima": "https://storage.googleapis.com/seeme-7a462.appspot.com/f3d90db3-fe78-4b47-8827-627691092ae0chemisenobeb.jpeg" }
        ]
    }


    const createItem = async () => {
        try {
            const createdProdec = await sendRequestnotoa('POST', 'boutique', product);
            FetchArticle('Add', "id", createdProdec);

        } catch (error) {
            console.error('Error creating product:', error.message);
        }
    };

    createItem();

}

function AddArticle() {
    try {
        const addarticle = document.getElementById('addarticle').value;
        const addquant = document.getElementById('addquant').value;
        const addgenre = document.getElementById('addgenre').value;
        const addprix = document.getElementById('addprix').value;
        const addreduction = document.getElementById('addreduction').value;
        const addoccasion = document.getElementById('addoccasion').value;
        const addbarcode = document.getElementById('addbarcode').value;

        const addcoul = document.getElementById('addcoul').value;
        const addmarque = document.getElementById('addmarque').value;
        const notes = document.getElementById('notes').value;


        if (addarticle && addgenre && addbarcode && addprix && addmarque && imas.length > 0) {
            const product = {
                addarticle: addarticle,
                quantity: parseInt(addquant),
                addgenre: addgenre,
                addprix: parseInt(addprix),
                addreduction: parseInt(addreduction),
                addoccasion: addoccasion,
                addcoul: addcoul ? addcoul : "#ffffff,#ffffff,#ffffff",
                addmarque: addmarque,
                notes: notes,
                barcode: addbarcode,
                owner: "nuance",
                image: imas
            };
            document.getElementById("ajouteencou").innerText = "En cours"

            const createItem = async () => {
                try {
                    const createdProdec = await sendRequestnotoa('POST', 'boutique', product);
                    FetchArticle('Add', "id", createdProdec);
                } catch (error) {
                    console.error('Error creating product:', error.message);
                }
            };

            createItem();
        }
    } catch (error) {
        console.log(error)
    }
}


//addtoPanier
function addtoPanier(data) {
    const transaction = panierdb.transaction(["PannierContent"], "readwrite");
    const objectStore = transaction.objectStore("PannierContent");

    const addRequest = objectStore.add(data);

    addRequest.onsuccess = () => {
        getallDataa();
    };

    addRequest.onerror = () => {
        console.log("addtoPanier func in currentdb 292");
    };

    transaction.onerror = () => {
        document.getElementById('modalcoma').style.display = "block";
        document.getElementById('modalcoma').setAttribute("aria-hidden", "false");
        document.getElementById('messages').innerText = "Exist déjà dans le panier!";

        setTimeout(() => {
            document.getElementById('modalcoma').style.display = "none";
            document.getElementById('modalcoma').setAttribute("aria-hidden", "true");
        }, 2500);
    };

}



function CinetPayment(orderdata) {
    const transaction_id = Math.floor(Math.random() * 100000000).toString()

    CinetPay.setConfig({
        apikey: '40810444265c61783e168b8.19353314',//   YOUR APIKEY
        site_id: '5868317',//YOUR_SITE_ID
        notify_url: `https://nuance-doud.adaptable.app/orders/change/order/payment/statuts/${transaction_id}`,
        mode: 'PRODUCTION'
    });
    CinetPay.getCheckout({
        transaction_id: transaction_id, // YOUR TRANSACTION ID
        amount: totalPricea + 1000,
        currency: 'XOF',
        channels: 'MOBILE_MONEY, WALLET',
        description: `Achat de ${orderdata.articles.length}`,
    });

    CinetPay.waitResponse(function (data) {
        if (data.status == "REFUSED") {
            alert("Votre paiement a échoué")
            //window.location.reload();

        } else if (data.status == "ACCEPTED") {
            orderdata.payment_status = "paid"
            orderdata.transaction_id = transaction_id;

            const sendReque = async (method, endpoint, data = null) => {
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
                    return { id: "erro", er: "erro" };
                }

                return { id: responseData.done, er: "done" };
            };

            (async () => {
                try {
                    const response = await sendReque('POST', 'orders/nuance', orderdata);
                    if (response.er == "done" && response.id !== "erro") {
                        TotalAll("clear", "");

                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                    } else if (response.er !== "done" && response.id !== "done") {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = "Erreur incconnu, Veuillez re-essayer plus tard";

                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 3500);
                    };

                } catch (e) {
                    setTimeout(() => {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";
                    }, 1500);

                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 4500);

                }

            })()

        }
    });
    CinetPay.onError(function (data) {
        console.log(data);
    });
}



/*const CinetPayment = (idx) => {
    const transaction_id = Math.floor(Math.random() * 100000000).toString()
    const data = JSON.stringify({
        apikey: "40810444265c61783e168b8.19353314",
        site_id: "5868317",
        transaction_id: transaction_id, //
        amount: 100,
        currency: "XOF",
        alternative_currency: "CFA",
        description: `Achat de ${" "}`,
        notify_url: `${apiUrlfine}orders/change/order/payment/statuts/${idx}/${transaction_id}`,
        return_url: "https://nuancesdoud.com/client",
        channels: "ALL"
    });
 
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    };
 
    fetch(cinetpay, settings)
        .then((answ) => answ.json())
        .then((dat) => {
            console.log(dat.data.payment_url);
            window.location.href = dat.data.payment_url
        }
        ).catch((szs) => console.log("payment error", szs));
}*/

function getPanierSend(tocompl) {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');

    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    objectStore.openCursor().onsuccess = async (event) => {
        const cursor = event.target.result;
        if (cursor) {
            tocompl.articles.push({
                arti_id: cursor.value._id,
                quantcho: cursor.value.quantcho,
                prix: cursor.value.prix
            });
            cursor.continue();
        } else {

            if (tocompl.payment_method === "electronical") {
                CinetPayment(tocompl);

            } else {
                const sendReque = async (method, endpoint, data = null) => {
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
                        return { id: "erro", er: "erro" };
                    }

                    return { id: responseData.done, er: "done" };
                };


                try {
                    const response = await sendReque('POST', 'orders/nuance', tocompl);
                    if (response.er == "done" && response.id !== "erro") {
                        TotalAll("clear", "");

                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        window.location.href = "client"
                    } else if (response.er !== "done" && response.id !== "done") {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = "Erreur incconnu, Veuillez re-essayer plus tard";

                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 3500);
                    };

                } catch (e) {
                    setTimeout(() => {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";
                    }, 1500);

                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 4500);

                }



            }

        };

        transaction.onerror = (event) => {
            console.error("Transaction error:", event.target.error);
        };
    };
};


function getallCheckou() {
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else if (data.length > 0) {
            const checkouId = document.getElementById('checkoutpanier');
            checkouId.innerHTML = '';

            data.forEach(pani => {
                const checkouTBODY =
                    `
                        <tr>                       
                            <td class="product-name">
                                <a href="#">${pani.addarticle}</a>
                            </td>
                            <td class="product-total">
                                <span class="subtotal-amount">${pani.prix * pani.quantcho} F.CFA</span>
                            </td>
                        </tr>  
                    `;

                checkouId.innerHTML += checkouTBODY;

            });

            const pantotalid = document.getElementById('toteauxche');
            pantotalid.innerHTML = '';


            for (const pri of data) {
                const adda = pri.prix * pri.quantcho;
                totalPricea += adda;
            };

            const pantotalhtml = `
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Sous-total</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">${totalPricea} F.CFA</span>
                                    </td>
                                </tr> 
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Expédition</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">1000 F</span>
                                    </td>
                                </tr> 
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Total Géneral</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">${totalPricea + 1000} F.CFA</span>
                                    </td>
                                </tr> 
                        `;
            pantotalid.innerHTML += pantotalhtml;

        } else {
            document.getElementById('coverfor').classList.add("preloader-area");

        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};





function getDasboard() {
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {
            const tbodyId = document.getElementById('tbody-data');
            tbodyId.innerHTML = '';

            data.forEach(pani => {
                const deliveryStatus = pani.statut === "done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";

                const panierTBODY =
                    `
                        <tr onclick="optionCancileView(${pani._id})" style="cursor: pointer !important;" onmouseover="this.style.backgroundColor='#f8f8f8'" onmouseout="this.style.backgroundColor='#fff'"  data-bs-toggle="modal" data-bs-target="#optionCancile">
                            <td class="product-thumbnail">
                                <a>
                                    <img src="${pani.image1}" alt="item">
                                </a>
                            </td>
                            <td class="product-name">
                                <a>${pani.articleName}</a>
                                <ul>
                                    <li>Color: <span>${pani.color}</span></li>
                                    <li>Size: <span>${pani.size}</span></li>
                                    <li>Material: <span>${pani.material}</span></li>
                                </ul>
                            </td>
                            <td class="product-price">
                                <span class="unit-amount">${pani.newPrice} F</span>
                            </td>
                            <td class="product-quantity">
                                   <div class="input-counter">
                                      <input type="text" min="1" value="${pani.quantity}">
                                   </div>
                            </td>
                            <td class="product-subtotal">
                                <span class="subtotal-amount">${pani.newPrice * pani.quantity} F.CFA</span>
                            </td>
                            <td class="product-subtotal">
                                <a class="remove${deliveryStatus === 'livré' ? 'c' : deliveryStatus === 'en attente' ? 'a' : deliveryStatus === 'en cours' ? 'b' : 'd'}">
                                   <i class="bx bx-failed">${deliveryStatus}</i>
                                </a>
                            </td>
                        </tr>
                        
                    `;

                tbodyId.innerHTML += panierTBODY;

            });

            const pantotalid = document.getElementById('toteaux');
            pantotalid.innerHTML = '';

            let totalPricea = 0; // Initialize to 1 so that the first multiplication works

            for (const pri of data) {
                const adda = pri.newPrice * pri.quantity;
                totalPricea += adda;
            };

            const pantotalhtml = `
                            <li>Sous-total <span>${totalPricea} F</span></li>
                            <li>Livraison <span>1000 F</span></li>
                            <li>Total <span>${totalPricea + 1000} F.CFA</span></li>
                            `;
            pantotalid.innerHTML += pantotalhtml;




            const pannierNumber2 = document.getElementById('paniernumber2');
            pannierNumber2.innerHTML = '';
            const panniernumHTML2 = `
                                <i class="bx bx-shopping-bag"></i>
                                <span>${data.length}</span>
                            `;
            pannierNumber2.innerHTML += panniernumHTML2;

            const pannierNumber3 = document.getElementById('paniernumber3');
            pannierNumber3.innerHTML = '';
            const panniernumHTML3 = `
                                <i class="bx bx-shopping-bag"></i>
                                <span>${data.length}</span>
                            `;
            pannierNumber3.innerHTML += panniernumHTML3;
        }
    };

    transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
    };

    return "data"
};


function TotalAll(who, data) {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(() => {
                if (who === "post") {
                    addtoPanier(data);
                } else if (who === "all") {
                    getallData();
                } else if (who === "all1") {
                    getallDataa();
                } else if (who === "all2") {
                    getallCheckou();
                } else if (who === "action") {
                    getselectDataById(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "dasboard" && getAdmin()) {
                    getDasboard()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "put") {
                    updateData(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "del") {
                    deleteData(data)
                } else if (who === "clear") {
                    clearData()
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else if (who === "sendOrder") {
                    getPanierSend(data)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else {
                    reject(new Error("Invalid operation"));
                }
            })
            .catch(error => reject(error));
    });
};
