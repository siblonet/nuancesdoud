function getAdmin() {
    const token = sessionStorage.getItem('tibule');
    if (token) {
        const splo = token.split("°");
        const nam = splo[1];
        const lastname = splo[2];
        username = thisiswhat(`${nam}â${lastname}`);
        document.getElementById('usernam').innerText = username;
        isClient = true;
        isAdmin = false;
        document.getElementById('userstatus').innerText = splo[6] == "UZOHV" ? "Client/Employé(e)" : "Administrateur";
        connected = true;

        return splo[6] == "UZOHV" ? true : false
    }
    return false
};


async function initDataLoader() {
    if (getAdmin()) {

        try {
            deleteOrder();
            deletePeople();
            const token = sessionStorage.getItem('tibule');
            const splo = token.split("°");
            const userid = thisiswhat(`${splo[0]}`);
            const data = await requesttoBackend('GET', `orders/myorder/${userid}`);
            if (data) {
                await PostOrder(data);
            };
            NafigatioTo("ActiveDasboard");
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