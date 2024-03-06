async function Disconexion() {
    var result = window.confirm("Etes vous sur ne vouloir, vous deconnectez?");
    const pincode = sessionStorage.getItem('pincode');

    if (result && pincode) {

        await deleteMemberByPincode(pincode);
    }
};