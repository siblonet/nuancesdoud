let paymen_method_selected = "null";

function RenderingCheckout() {
    getallPanier();
    const token = sessionStorage.getItem('tibule');
    if (token) {
        const splo = token.split("°");
        const email = splo[4];
        const phone = splo[3];
        const name = splo[1];
        const lastname = splo[2];
        const mynama = thisiswhat(`${name}â${lastname}`);
        const mynam = thisiswhat(`${phone}`);
        document.getElementById('prenomValue').value = thisiswhat(`${name}`);
        document.getElementById('prenomValue').disabled = true;
        document.getElementById('nomValue').value = thisiswhat(`${lastname}`);
        document.getElementById('nomValue').disabled = true;
        document.getElementById('motValue').disabled = true;
        document.getElementById('motValue').value = "********";
        document.getElementById('motValue').disabled = true;
        document.getElementById('confirmezValue').value = "********";
        document.getElementById('confirmezValue').disabled = true;
        document.getElementById('emailValue').value = thisiswhat(`${email}`);
        document.getElementById('emailValue').disabled = true;
        document.getElementById('telephoneValue').value = mynam;
        const connectedor = document.getElementById('connectedor');
        connectedor.innerHTML = '';
        const connectedorHTML =
            `
         
        <div class="user-actions-linear"></div>

        <span class="span" style="color: #037703 !important;"> Bienvenue ${mynama}</span>

        `;
        connectedor.innerHTML = connectedorHTML;
    };
};

RenderingCheckout();



async function getallPanier() {
    const data = await GetPannier();
    if (data.length > 0) {
        let totalPricea = 0;
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
                                <span class="subtotal-amount">${(pani.prix * pani.quantcho / 1000).toFixed(3)} F.CFA</span>
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
        const totalPriceb = totalPricea + 1000;
        const pantotalhtml = `
                                <tr>                       
                                    <td class="product-name">
                                        <a href="#">Sous-total</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">${(totalPricea / 1000).toFixed(3)} F.CFA</span>
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
                                        <span class="subtotal-amount">${(totalPriceb / 1000).toFixed(3)} F.CFA</span>
                                    </td>
                                </tr> 
                        `;
        pantotalid.innerHTML += pantotalhtml;

    } else {
        document.getElementById('coverfor').classList.add("preloader-area");

    }

};



/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command start    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command start    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command start    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/



async function sendCommen() {
    document.getElementById('noorderduplu').setAttribute('onclick', null);

    const payment_method = paymen_method_selected !== "null" ? paymen_method_selected : "cash";


    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');

    const token = sessionStorage.getItem('tibule');
    const transaction_id = Math.floor(Math.random() * 100000000).toString()

    if (token) {
        const splo = token.split("°");

        const _id = splo[0];
        const mynam = thisiswhat(`${_id}`);
        const villeValue = document.getElementById('villeValue').value;
        const communeValue = document.getElementById('communeValue').value;
        const adresseValue = document.getElementById('adresseValue').value;
        const telephoneValue = document.getElementById('telephoneValue').value;
        const notesValue = document.getElementById('notes').value;

        if (villeValue && communeValue && adresseValue) {

            const articleOne = {
                articles: [],
                ville: villeValue,
                commune: communeValue,
                lieu: adresseValue,
                phone: telephoneValue,
                note: notesValue,
                owner: "nuance",
                client: mynam,
                reduction: 0,
                payment_method: payment_method,
                payment_status: "waiting",
                transaction_id: transaction_id,
            };

            SendPanierToOrder(articleOne);
        };

    } else {

        const prenomValue = document.getElementById('prenomValue').value;
        const nomValue = document.getElementById('nomValue').value;
        const villeValue = document.getElementById('villeValue').value;
        const communeValue = document.getElementById('communeValue').value;
        const adresseValue = document.getElementById('adresseValue').value;
        const motValue = document.getElementById('motValue').value;
        const confirmezValue = document.getElementById('confirmezValue').value;
        const emailValue = document.getElementById('emailValue').value;
        const telephoneValue = document.getElementById('telephoneValue').value;
        const notesValue = document.getElementById('notes').value;

        if (prenomValue && nomValue && villeValue && communeValue && adresseValue && motValue && emailValue && telephoneValue) {
            if (confirmezValue === motValue) {
                const person = {
                    prenom: prenomValue,
                    nom: nomValue,
                    motdepass: motValue,
                    email: emailValue,
                    phone: telephoneValue,
                    owner: "nuance"
                };
                try {
                    const response = requesttoBackend('POST', 'people', person);  // Await the result
                    if (response && response.ee) {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = `Le ${telephoneValue} est déjà associé un compte, \n Connectez-vous pour continuer`;

                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 1000);

                    } else if (response && response.token) {

                        const articleOne = {
                            articles: [],
                            ville: villeValue,
                            commune: communeValue,
                            lieu: adresseValue,
                            phone: telephoneValue,
                            note: notesValue,
                            owner: "nuance",
                            reduction: 0,
                            client: response.token,
                            payment_method: payment_method,
                            payment_status: "waiting",
                            transaction_id: transaction_id,
                        };

                        SendPanierToOrder(articleOne);

                    } else if (!response) {
                        load.classList.remove("load28")
                        load.classList.add("tohi")
                        tohia.classList.remove("tohi");
                        errer.classList.add("rejected");
                        document.getElementById('nointer').innerText = "Erreur incconnu, Veuillez re-essayer plus tard";


                        setTimeout(() => {
                            errer.classList.remove("rejected");
                        }, 1500);
                    }


                } catch (error) {
                    console.log("creating client", error)
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
            } else {
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");
                errer.classList.add("rejected");
                document.getElementById('nointer').innerText = "Mot de passe n'est pas conform a la confirmation";
                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 3500);
            }

        }
    }

};

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/




async function loginCommage() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    if (phone && password) {
        try {
            tohia.classList.add("tohi");
            load.classList.remove("tohi");
            load.classList.add("load28");

            const userCredentials = {
                phone: phone,
                motdepass: password,
            };

            const responseData = await requesttoBackend('POST', 'people/login/nuance', userCredentials);

            if (!responseData) {
                handleLoginError("Erreur inconnue, veuillez réessayer plus tard");
            } else if (responseData && responseData.token) {
                handleSuccessfulLogin(responseData);
            } else if (responseData && responseData.ee) {
                handleLoginError("Identifiants incorrects !");
            }
        } catch (error) {
            handleLoginError("Vérifiez que vous avez accès à l'internet");
        }
    } else {
        handleLoginError("Les champs de renseignement sont obligatoires");
    }

    function handleLoginError(errorMessage) {
        setTimeout(() => {
            load.classList.remove("load28");
            load.classList.add("tohi");
            tohia.classList.remove("tohi");
            errer.classList.add("rejected");
            document.getElementById('nointer').innerText = errorMessage;

            setTimeout(() => {
                errer.classList.remove("rejected");
            }, 3500);
        }, 1500);
    }

    function handleSuccessfulLogin(responseData) {
        sessionStorage.setItem('tibule', responseData.token);
        localStorage.removeItem('myLive');

        const [name, lastname, mail] = responseData.token.split("°");
        const mynama = thisiswhat(`${name}â${lastname}`);
        const mynam = thisiswhat(`${name}â${lastname}â${mail}`);
        const [firstName, lastName, email] = mynam.split(" ");

        document.getElementById('prenomValue').value = firstName;
        document.getElementById('prenomValue').disabled = true;
        document.getElementById('nomValue').value = lastName;
        document.getElementById('nomValue').disabled = true;
        document.getElementById('motValue').value = password;
        document.getElementById('motValue').disabled = true;
        document.getElementById('confirmezValue').value = password;
        document.getElementById('confirmezValue').disabled = true;
        document.getElementById('emailValue').value = email;
        document.getElementById('emailValue').disabled = true;
        document.getElementById('telephoneValue').value = phone;

        const connectedor = document.getElementById('connectedor');
        connectedor.innerHTML = `
            <div class="user-actions-linear"></div>
            <span class="span" style="color: #037703 !important;"> Bienvenue ${mynama}</span>
        `;

        load.classList.remove("load28");
        load.classList.add("tohi");
        tohia.classList.remove("tohi");
    }
}


async function SendPanierToOrder(tocomp) {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');

    try {
        const tocompl = await GetPannierToSend(tocomp);

        if (tocompl && tocompl.payment_method !== "cash" && tocompl.payment_method !== "null") {
            await KaliaPay(tocompl);
        } else if (tocompl) {
            const response = await requesttoBackend('POST', 'orders/nuance', tocompl);

            if (response && response.done) {
                await deletePannier();
                load.classList.remove("load28");
                load.classList.add("tohi");
                tohia.classList.remove("tohi");
                window.location.href = "client";
            } else if (!response) {
                handleError("Erreur inconnue, Veuillez réessayer plus tard");
            }
        }
    } catch (e) {
        handleError("Vérifiez que vous avez accès à l'internet");
    }

    function handleError(message) {
        setTimeout(() => {
            load.classList.remove("load28");
            load.classList.add("tohi");
            tohia.classList.remove("tohi");
            errer.classList.add("rejected");
            document.getElementById('nointer').innerText = message;

            setTimeout(() => {
                errer.classList.remove("rejected");
            }, 3500);
        }, 1500);
    }
}


const PaymenSelecion = (paymen_method) => {
    paymen_method_selected = paymen_method;
    const Orangeci = document.getElementById('orangeci');
    const Mtnci = document.getElementById('mtnci');
    const Waveci = document.getElementById('waveci');
    const Cards = document.getElementById('cards');

    Orangeci.classList.remove('payment_icons_selected');
    Mtnci.classList.remove('payment_icons_selected');
    Waveci.classList.remove('payment_icons_selected');
    Cards.classList.remove('payment_icons_selected');

    document.getElementById(paymen_method).classList.add('payment_icons_selected');

    if (paymen_method !== "cards") {
        const customerphone = document.getElementById('customerphone');
        customerphone.placeholder = `Entrez tél pour ${paymen_method === "orangeci" ? "ORANGE MONEY" : paymen_method === "mtnci" ? "MTN MONEY" : "Wave"}`;
        customerphone.style.display = "block";
    } else {
        const customerphone = document.getElementById('customerphone');
        customerphone.value = "";
        customerphone.placeholder = "";
        customerphone.style.display = "none";
    }
};


const Payment_Choix = (paymen_choix) => {
    if (paymen_choix === "no") {
        paymen_method_selected = "null";

        const customerphone = document.getElementById('customerphone');
        customerphone.value = "";
        customerphone.placeholder = "";
        customerphone.style.display = "none";

        document.getElementById('orangeci').classList.remove('payment_icons_selected');
        document.getElementById('mtnci').classList.remove('payment_icons_selected');
        document.getElementById('waveci').classList.remove('payment_icons_selected');
        document.getElementById('cards').classList.remove('payment_icons_selected');
    }
};


const KaliaPay = async (order) => {
    try {
        const apikey = "ae236ee337b78dfc46a24e3a50e1a270fce8db37";
        const amount = parseInt(order.reduction);
        const service = "010324183052320001";
        const extra = order.transaction_id;
        const custom_data = order.transaction_id;
        const customer = encodeURIComponent(document.getElementById('customerphone').value);

        const PAY_URL = `https://kaliapay.com/flash/${apikey}/${amount}/${service}/${extra}/${custom_data}/?provider=${order.payment_method}&customer=${customer}`;

        const payment_url = await requesttoBackend("GET", PAY_URL);
        console.log(payment_url);

        // Redirect to the obtained payment URL
        window.location.href = payment_url.url;
    } catch (error) {
        console.error("Error during KaliaPay operation:", error);
        // Handle errors appropriately
    }
};
