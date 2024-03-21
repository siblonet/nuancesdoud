let paymen_method_selected = "noselected";
const VALIDAHTML = `
                        <a style="cursor: pointer !important" class="default-btn loading" onclick="sendCommen()"
                                    id="noorderduplu">
                            <span class="" id="tohia">Valider la commande</span>
                            <div class="tohi" id="tohi">
                                <p>En cours ...</p>
                            </div>
                        </a>
`;

const prenomValueA = document.getElementById('prenomValue');
const nomValueA = document.getElementById('nomValue');
const villeValueA = document.getElementById('villeValue');
const adresseValueA = document.getElementById('adresseValue');
const telephoneValueA = document.getElementById('telephoneValue');

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
        document.getElementById('telephoneValue').value = mynam;
        $('.haidville').css('display', 'inline');

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
        const totalPriceb = totalPricea // + prix de livraison;
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
                                        <a href="#">Livraison</a>
                                    </td>
                                    <td class="product-total">
                                        <span class="subtotal-amount">? F</span>
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


        window.location.href = "/"
    }

};



/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command start    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command start    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command start    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/


async function sendCommen() {
    document.getElementById('noorderduplu').setAttribute('onclick', null);

    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    tohia.classList.add("tohi");
    load.classList.remove("tohi");
    load.classList.remove("load28");

    const token = sessionStorage.getItem('tibule');
    const transaction_id = Math.floor(Math.random() * 100000000).toString()

    if (token && paymen_method_selected !== "noselected") {
        const splo = token.split("°");

        const _id = splo[0];
        const mynam = thisiswhat(`${_id}`);
        const villeValue = document.getElementById('villeValue').value;
        const adresseValue = document.getElementById('adresseValue').value;
        const telephoneValue = document.getElementById('telephoneValue').value;

        if (villeValue && adresseValue) {

            const articleOne = {
                articles: [],
                ville: villeValue,
                commune: '',
                lieu: adresseValue,
                phone: telephoneValue,
                note: "",
                owner: "nuance",
                client: mynam,
                reduction: 0,
                payment_method: paymen_method_selected,
                payment_status: "waiting",
                transaction_id: transaction_id,
            };

            SendPanierToOrder(articleOne);
        } else {
            alert("Renseignez les chemps obligatoire");
            document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');
            load.classList.remove("load28");
            load.classList.add("tohi");
            tohia.classList.remove("tohi");
        };

    } else {
        const prenomValue = document.getElementById('prenomValue').value;
        const nomValue = document.getElementById('nomValue').value;
        const villeValue = document.getElementById('villeValue').value;
        const adresseValue = document.getElementById('adresseValue').value;
        const telephoneValue = document.getElementById('telephoneValue').value;

        if (paymen_method_selected !== "noselected" && prenomValue && nomValue && villeValue && adresseValue && telephoneValue) {
            const person = {
                prenom: prenomValue,
                nom: nomValue,
                motdepass: "00",
                email: "",
                phone: telephoneValue,
                owner: "nuance"
            };
            try {
                const response = await requesttoBackend('POST', 'people', person);  // Await the result
                if (response && response.ee) {
                    load.classList.remove("load28")
                    tohia.classList.add("tohi")
                    load.classList.remove("tohi");
                    errer.classList.add("rejected");
                    document.getElementById('nointer').innerText = `Le ${telephoneValue} est déjà associé un compte, \n Connectez-vous pour continuer`;

                    setTimeout(() => {
                        errer.classList.remove("rejected");
                    }, 1000);

                } else if (response && response.token) {
                    sessionStorage.setItem('tibule', response.token);
                    localStorage.removeItem('myLive');

                    const splo = response.token.split("°");
                    const clientid = thisiswhat(splo[0]);

                    const articleOne = {
                        articles: [],
                        ville: villeValue,
                        commune: "",
                        lieu: adresseValue,
                        phone: telephoneValue,
                        note: "",
                        owner: "nuance",
                        reduction: 0,
                        client: clientid,
                        payment_method: paymen_method_selected,
                        payment_status: "waiting",
                        transaction_id: transaction_id,
                    };

                    SendPanierToOrder(articleOne);
                } else if (!response) {
                    load.classList.remove("load28")
                    tohia.classList.add("tohi")
                    load.classList.remove("tohi");
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
                    tohia.classList.add("tohi")
                    load.classList.remove("tohi");
                    errer.classList.add("rejected");
                    document.getElementById('nointer').innerText = "Vérifiez que vous avez access a l'internet";
                }, 1500);

                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 4500);
            }


        } else {
            alert("Renseignez les chemps obligatoire");
            document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');
            load.classList.remove("load28");
            load.classList.add("tohi");
            tohia.classList.remove("tohi");
        }
    }

};

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ send command end    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/




async function loginCommage() {
    const connectedor = document.getElementById('connectedor');
    const errer = document.getElementById('rejected');
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    if (phone && password) {
        connectedor.innerHTML = `
            <div class="user-actions-linear"></div>
            <span class="span" style="color: #ff0000 !important;">Connexion en cours ...</span>
        `;
        try {
            const userCredentials = {
                phone: phone,
                motdepass: password,
            };

            const responseData = await requesttoBackend('POST', 'people/login/nuance', userCredentials);

            if (!responseData) {
                connectedor.innerHTML = `
                <div class="user-actions-linear"></div>


                <i style="color: #037703 !important;" class="bx bx-log-in">
                </i>
                <span class="span" style="color: #000000 !important;">Client
                    déjà enregistré ?
                    <a style="color: #037703 !important;" onmouseover="this.style.color='#007bff'"
                        onmouseout="this.style.color='#000000'" data-bs-toggle="modal"
                        data-bs-target="#connexionComade">
                        Cliquez ici pour vous connecter
                    </a>
                </span>
            `;
                handleLoginError("Erreur inconnue, veuillez réessayer plus tard");
            } else if (responseData && responseData.token) {
                handleSuccessfulLogin(responseData);
            } else if (responseData && responseData.ee) {
                handleLoginError("Identifiants incorrects !");
                connectedor.innerHTML = `
                <div class="user-actions-linear"></div>


                <i style="color: #037703 !important;" class="bx bx-log-in">
                </i>
                <span class="span" style="color: #000000 !important;">Client
                    déjà enregistré ?
                    <a style="color: #037703 !important;" onmouseover="this.style.color='#007bff'"
                        onmouseout="this.style.color='#000000'" data-bs-toggle="modal"
                        data-bs-target="#connexionComade">
                        Cliquez ici pour vous connecter
                    </a>
                </span>
            `;
            }
        } catch (error) {
            console.log(error);
            connectedor.innerHTML = `
            <div class="user-actions-linear"></div>


                <i style="color: #037703 !important;" class="bx bx-log-in">
                </i>
                <span class="span" style="color: #000000 !important;">Client
                    déjà enregistré ?
                    <a style="color: #037703 !important;" onmouseover="this.style.color='#007bff'"
                        onmouseout="this.style.color='#000000'" data-bs-toggle="modal"
                        data-bs-target="#connexionComade">
                        Cliquez ici pour vous connecter
                    </a>
                </span>
        `
            handleLoginError("Vérifiez que vous avez accès à l'internet");
        }
    } else {
        handleLoginError("Les champs de renseignement sont obligatoires");
    }

    function handleLoginError(errorMessage) {
        setTimeout(() => {
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

        const [id, name, lastname, phone, mail] = responseData.token.split("°");
        const mynama = thisiswhat(`${name}â${lastname}`);
        const mynam = thisiswhat(`${name}â${lastname}â${phone}â${mail}`);
        const [firstName, lastName, telphone, email] = mynam.split(" ");

        document.getElementById('prenomValue').value = firstName;
        document.getElementById('prenomValue').disabled = true;
        document.getElementById('nomValue').value = lastName;
        document.getElementById('nomValue').disabled = true;
        document.getElementById('telephoneValue').value = telphone;
        $('.haidville').css('display', 'inline');

        const connectedor = document.getElementById('connectedor');
        connectedor.innerHTML = `
            <div class="user-actions-linear"></div>
            <span class="span" style="color: #037703 !important;"> Bienvenue ${mynama}</span>
        `;
    }
}


async function SendPanierToOrder(tocomp) {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');


    try {
        const tocompl = await GetPannierToSend(tocomp);
        if (tocompl && tocompl.payment_method !== "cash" && tocompl.payment_method !== "noselected") {
            await KaliaPay(tocompl);
        } else if (tocompl) {
            const response = await requesttoBackend('POST', 'orders/nuance', tocompl);

            if (response && response.created_order) {
                await deletePannier();
                window.location.href = "client";
            } else if (!response) {
                handleError("Erreur inconnue, Veuillez réessayer plus tard");
                document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');
            }
        }
    } catch (e) {
        console.log(e);
        handleError("Vérifiez que vous avez accès à l'internet");
        document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');
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
    };


    if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

    }
};


const Payment_Choix = (paymen_choix) => {
    paymen_method_selected = paymen_choix;

    if (paymen_choix === "cash") {
        const customerphone = document.getElementById('customerphone');
        customerphone.value = "";
        customerphone.placeholder = "";
        customerphone.style.display = "none";

        document.getElementById('orangeci').classList.remove('payment_icons_selected');
        document.getElementById('mtnci').classList.remove('payment_icons_selected');
        document.getElementById('waveci').classList.remove('payment_icons_selected');
        document.getElementById('cards').classList.remove('payment_icons_selected');

        if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
            document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

        }
    }
};


const KaliaPay = async (order) => {

    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    try {
        const customer = encodeURIComponent(document.getElementById('customerphone').value);

        const response = await requesttoBackend('POST', `orders/${customer ? customer : "0701743686"}/nuance`, order);

        if (response && response.orderid) {
            await deletePannier();
            window.location.href = response.orderid


        } else if (!response) {
            handleError("Erreur inconnue, Veuillez réessayer plus tard");
            document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');
        }

    } catch (error) {
        console.log(error);
        handleError("Vérifiez que vous avez accès à l'internet");
        document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');

        // Handle errors appropriately
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
};



// Add an event listener for the input event
prenomValueA.addEventListener("input", function () {

    if (prenomValueA.value.length > 2) {
        $('.haidville').css('display', 'inline');

    };

    if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

    } else {
        document.getElementById("validate-hide-forfil").innerHTML = ""

    }
});

nomValueA.addEventListener("input", function () {

    if (nomValueA.value.length > 2) {
        $('.haidprenom').css('display', 'inline');

    };

    if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

    } else {
        document.getElementById("validate-hide-forfil").innerHTML = ""

    }
});

villeValueA.addEventListener("input", function () {

    if (villeValueA.value.length > 2) {
        $('.haidadress').css('display', 'inline');

    };

    if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

    } else {
        document.getElementById("validate-hide-forfil").innerHTML = ""

    }
});

adresseValueA.addEventListener("input", function () {
    if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

    } else {
        document.getElementById("validate-hide-forfil").innerHTML = ""

    }
});

telephoneValueA.addEventListener("input", function () {

    if (telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        $('.haidnom').css('display', 'inline');

    };

    if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

    } else {
        document.getElementById("validate-hide-forfil").innerHTML = ""

    }
});