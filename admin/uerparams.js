async function openProfile() {

    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    const userid = thisiswhat(`${splo[0]}`);

    myprofil = await GetPersonByID(userid);

    document.getElementById('clientid').value = userid;
    document.getElementById('clientNom').value = myprofil.nom;
    document.getElementById('clientPrenom').value = myprofil.prenom;
    document.getElementById('clientEmail').value = myprofil.email;
    document.getElementById('clientPhone').value = myprofil.phone;
    document.getElementById('userStatus').classList.add('btn-success');
    document.getElementById('userStatus').innerText = 'Adminitrateur';

    const usermodif = document.getElementById('usermodif');

    const usermodifHTML = `
        <button type="button" class="btn btn-outline-success" data-dismiss="modal"
            onclick="updateUser()">Modifer
        </button>
    `;
    usermodif.innerHTML = usermodifHTML;

};


async function updateUser() {
    const nom = document.getElementById('clientNom').value;
    const prenom = document.getElementById('clientPrenom').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const toUpda = {
        prenom: nom,
        nom: prenom,
        phone: phone,
        email: email,
    }
    const clid = document.getElementById('clientid').value;
    await requesttoBackend('PUT', `people/personupdate/${clid}`, toUpda);
    NafigatioTo("dasboard");
};

