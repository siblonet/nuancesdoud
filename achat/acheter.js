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


























async function sendCommen() {
    document.getElementById('noorderduplu').setAttribute('onclick', null);

    const paypal = document.getElementById('paypal').checked;
    //const cash = document.getElementById('cash-on-delivery').checked;

    const payment_method = paypal ? "electronical" : "cash"
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');

    const token = sessionStorage.getItem('tibule');
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
                payment_method: payment_method,
                payment_status: "nopay",
                transaction_id: "",
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
                            client: response.token,
                            payment_method: payment_method,
                            payment_status: "nopay",
                            transaction_id: "",
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


async function loginCommage() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    if (phone != "" && password != "") {
        tohia.classList.add("tohi");
        load.classList.remove("tohi");
        load.classList.add("load28");

        const person = {
            phone: phone,
            motdepass: password,
        };
        try {
            const responseData = await requesttoBackend('POST', 'people/login/nuance', person);

            if (!responseData) {
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");
                errer.classList.add("rejected");
                document.getElementById('nointer').innerText = "Erreur incconnu, Veuillez re-essayer plus tard";


                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 1500);

            } else if (responseData && responseData.token) {
                sessionStorage.setItem('tibule', responseData.token);
                localStorage.removeItem('myLive');

                const splo = responseData.token.split("°");
                const name = splo[1];
                const lastname = splo[2];
                const mail = splo[4];
                const mynama = thisiswhat(`${name}â${lastname}`)
                const mynam = thisiswhat(`${name}â${lastname}â${mail}`)
                const myspl = mynam.split(" ");


                document.getElementById('prenomValue').value = myspl[0];
                document.getElementById('prenomValue').disabled = true;
                document.getElementById('nomValue').value = myspl[1];
                document.getElementById('nomValue').disabled = true;
                document.getElementById('motValue').value = password;
                document.getElementById('motValue').disabled = true;
                document.getElementById('confirmezValue').value = password;
                document.getElementById('confirmezValue').disabled = true;
                document.getElementById('emailValue').value = myspl[2];
                document.getElementById('emailValue').disabled = true;
                document.getElementById('telephoneValue').value = phone;
                const connectedor = document.getElementById('connectedor');
                connectedor.innerHTML = '';
                const connectedorHTML =
                    `
             
            <div class="user-actions-linear"></div>
    
            <span class="span" style="color: #037703 !important;"> Bienvenue ${mynama}</span>
    
            `;
                connectedor.innerHTML = connectedorHTML;

                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");

            } else if (responseData && responseData.ee) {
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");
                errer.classList.add("rejected");
                document.getElementById('nointer').innerText = "Identifiants Incorrect !";


                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 1500);

            }



        } catch (e) {
            console.log(e);
            const tohia = document.getElementById('tohia');
            const load = document.getElementById('tohi');
            const errer = document.getElementById('rejected');

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
        document.getElementById('nointer').innerText = "Les champs de renseignement sone obligatoire";
        setTimeout(() => {
            errer.classList.remove("rejected");
        }, 3500);
    };

}



async function SendPanierToOrder(tocomp) {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');

    const tocompl = await GetPannierToSend(tocomp);

    if (tocompl && tocompl.payment_method === "electronical") {
        CinetPayment(tocompl);

    } else if (tocompl) {

        try {
            const response = requesttoBackend('POST', 'orders/nuance', tocompl);
            if (response && response.done) {
                await deletePannier();
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");
                window.location.href = "client"
            } else if (!response) {
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

    };
};