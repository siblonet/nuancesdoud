async function Inscription() {
    const tohia = document.getElementById('tohia');
    const load = document.getElementById('tohi');
    const errer = document.getElementById('rejected');
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phonea').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if (fname != "" && lname != "" && email != "" && password != "") {
        if (password === confirm) {
            tohia.classList.add("tohi");
            load.classList.remove("tohi");
            load.classList.add("load28");

            const person = {
                prenom: fname,
                nom: lname,
                motdepass: password,
                email: email,
                phone: phone,
                owner: "nuance"
            };


            const response = await requesttoBackend('POST', 'people', person);
            if (response && response.ee) {
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");
                errer.classList.add("rejected");
                document.getElementById('nointer').innerText = `Le ${phone} est déjà associé un compte`;

                setTimeout(() => {
                    errer.classList.remove("rejected");
                }, 1000);

            } else if (response && response.token) {
                sessionStorage.setItem('tibule', response.token);
                localStorage.removeItem('myLive');

                const splo = response.token.split("°");
                const admin = splo[6];
                load.classList.remove("load28")
                load.classList.add("tohi")
                tohia.classList.remove("tohi");

                window.location.href = admin == "GIFV" ? "admin" : "client"


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
};


async function loGin() {
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

        const response = await requesttoBackend('POST', 'people/login/nuance', person);

        if (response && response.ee) {
            load.classList.remove("load28")
            load.classList.add("tohi")
            tohia.classList.remove("tohi");
            errer.classList.add("rejected");


            setTimeout(() => {
                errer.classList.remove("rejected");
            }, 1500);

        } else if (response && response.token) {
            sessionStorage.setItem('tibule', response.token);
            localStorage.removeItem('myLive');


            const splo = response.token.split("°");
            const admin = splo[6];
            load.classList.remove("load28")
            load.classList.add("tohi")
            tohia.classList.remove("tohi");
            window.location.href = admin == "GIFV" ? "admin" : "client"

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
    }

}
