function getAdmin() {
    const token = sessionStorage.getItem('tibule');
    if (token) {
        const splo = token.split("°");
        const nam = splo[1];
        const lastname = splo[2];
        username = thisiswhat(`${nam}â${lastname}`);
        document.getElementById('usernam').innerText = username;
        isAdmin = splo[6] == "GIFV" ? true : false;
        document.getElementById('userstatus').innerText = splo[6] == "GIFV" ? "Administrateur" : "Employé(e)";
        connected = true;

        return splo[6] == "GIFV" ? true : false
    }
    return false
};


async function initDataLoader() {
    if (getAdmin()) {

        try {
            deleteArticle();
            deleteOrder();
            deleteSetting();
            //deletePeople();

            const online = await requesttoBackend('GET', 'boutique/annoncedata/nuance');
            if (online) {

                //const people = await requesttoBackend('GET', 'people/persons/nuance');
                //const order = await requesttoBackend('GET', 'orders/nuance');
                //await PostPeople(people);
                //await PostOrder(order);
                //await PostArticle(online.article);
                await PostSettings(online);

            }
            NafigatioTo("dasboard");

        } catch (error) {
            console.log(error);
        }
        $(function () {
            $("#loaderRemove").fadeOut("slow");;
        });
    } else {
        window.location.href = "/"
    }
};



initDataLoader();