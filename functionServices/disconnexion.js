async function Disconexion() {
    var result = window.confirm("Etes vous sur ne vouloir, vous deconnectez?");

    if (result) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "login"
    }
};