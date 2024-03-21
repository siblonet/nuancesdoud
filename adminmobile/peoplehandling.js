function PeopleHandle(who, ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, addAticlebtn, adminiSpace) {
    ActiveDas.classList.remove('active');
    ActiveCo.classList.remove('active');
    ActiveCl.classList.add('active');
    ActiveAr.classList.remove('active');
    ActiveAn.classList.remove('active');

    document.getElementById('filter-order').classList.remove('active');

    addAticlebtn.innerHTML = "";
    const clientsHTML = `
    
    <main class="table">
        <br>
        <br>
        <br>
        <section class="table__body">
        <table class="tableb">
            <thead class="theadb">
            <tr class="trb">
                <th class="thb">Nom et Prénom<span class="icon-arrow">&UpArrow;</span></th>
                <th style="text-align: start !important;">eMail<span class="icon-arrow">&UpArrow;</span></th>
                <th style="text-align: center !important;">Contacts<span class="icon-arrow">&phone;</span></th>
                <th style="text-align: center !important;">Statut<span class="icon-arrow">&UpArrow;</span></th>
            </tr>
            </thead>
            <tbody id="tbody-client">
            
            </tbody>
        </table>

        </section>
    </main>
    `;

    adminiSpace.innerHTML = clientsHTML


    const tbodyId = document.getElementById('tbody-client');
    tbodyId.innerHTML = '';
    GetPeople(who).then((people) =>
        people.forEach(person => {
            const clientTBODY =
                `
                    <tr  style="cursor: pointer" data-toggle="modal" data-target="#optionClient" onclick="openClientforedit('${person._id}', 'online')" >
                        <td class="" style="color: #4d4d4d !important;"> 
                        ${person.nom} ${person.prenom}
                        </td>
                        <td class="" style="color: #4d4d4d !important; text-align: start !important">
                        ${person.email}
                        </td>
                        <td class="" style="color: #4d4d4d !important; text-align: center !important;">
                        <strong>${person.phone}</strong>
                        </td>
                        <td class="" style="text-align: center !important;">
                            <p class="status ${person.staff === 'false' ? person.admin === 'false' ? "shipped" : 'delivered' : person.admin === 'false' ? 'pending' : 'delivered'}">${person.admin === 'false' ? person.staff === 'false' ? 'Client' : "Employé" : 'Admin'}</p>
                        </td>
                    </tr>
                    `;

            tbodyId.innerHTML += clientTBODY;

        })
    ).catch((error) => console.log(error))

}

//let opennedClient = {};
async function openClientforedit(clid, whos) {
    const opennedClient = await GetPersonByID(clid);


    document.getElementById('clientid').value = clid;
    document.getElementById('clientNom').value = opennedClient.nom;
    document.getElementById('clientPrenom').value = opennedClient.prenom;
    document.getElementById('clientEmail').value = opennedClient.email;
    document.getElementById('clientPhone').value = opennedClient.phone;


    document.getElementById('userStatus').classList.add(`${opennedClient.admin === 'true' ? 'btn-success' : opennedClient.staff === 'true' ? 'btn-info' : 'btn-dangera'}`);
    document.getElementById('userStatus').innerText = `${opennedClient.admin === 'true' ? 'Statut: Adminitrateur' : opennedClient.staff === 'true' ? 'Statut: Employé' : 'Statut: Client'}`;

    document.getElementById('userdelete').checked = opennedClient.userdelete ? opennedClient.userdelete : false;
    document.getElementById('userinfo').checked = opennedClient.userinfo ? opennedClient.userinfo : false;
    document.getElementById('userstatus').checked = opennedClient.userstatus ? opennedClient.userstatus : false;
    document.getElementById('orderback').checked = opennedClient.orderback ? opennedClient.orderback : false;
    document.getElementById('orderchange').checked = opennedClient.orderchange ? opennedClient.orderchange : false;
    document.getElementById('orderdone').checked = opennedClient.orderdone ? opennedClient.orderdone : false;
    document.getElementById('orderwof').checked = opennedClient.orderwof ? opennedClient.orderwof : false;

    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    const userid = thisiswhat(`${splo[0]}`);
    const userCurrent = await GetPersonByID(userid)

    /*userdelete = userCurrent.userdelete;
    userinfo = userCurrent.userinfo;
    userstatus = userCurrent.userstatus;
    orderback = userCurrent.orderback;
    orderchange = userCurrent.orderchange;
    orderdone = userCurrent.orderdone;
    orderwof = userCurrent ? userCurrent.orderwof : true;*/


    const usermodif = document.getElementById('usermodif');
    usermodif.innerHTML = "";

    if (isAdmin && userid == clid) {
        $('.ifadminopen').css('display', 'inline');
        const usermodifHTML = `
            <button type="button" class="btn btn-info" data-dismiss="modal"
            onclick="changePeopleStatus('staff')">Employer</button>
            <button type="button" class="btn btn-success" data-dismiss="modal"
                onclick="changePeopleStatus('admin')">Admin</button>
            <button type="button" class="btn btn-dangera" data-dismiss="modal"
                onclick="changePeopleStatus('client')">Client</button>
        
            <button type="button" class="btn btn-outline-success" data-dismiss="modal"
                onclick="updateUser()">Modifer
            </button>
    `;
        usermodif.innerHTML += usermodifHTML;

    } else if (isAdmin) {
        $('.ifadminopen').css('display', 'inline');
        const usermodifHTML = `
        <button type="button" class="btn btn-info" data-dismiss="modal"
        onclick="changePeopleStatus('staff')">Employer</button>
        <button type="button" class="btn btn-success" data-dismiss="modal"
            onclick="changePeopleStatus('admin')">Admin</button>
        <button type="button" class="btn btn-dangera" data-dismiss="modal"
            onclick="changePeopleStatus('client')">Client</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal"
            onclick="deleteUser()">Supprimer</button>
        <button type="button" class="btn btn-outline-success" data-dismiss="modal"
            onclick="updateUser()">Modifer
        </button>
`;
        usermodif.innerHTML += usermodifHTML;
    } else if (userid == clid) {
        const usermodifHTML = `
        <button type="button"  class="btn btn-outline-success" data-dismiss="modal"
            onclick="updateUser()">Modifer
        </button>
    `;
        usermodif.innerHTML = usermodifHTML;
    }

    if (userCurrent.userdelete && !isAdmin) {
        const usermodifHTML = `
        <button type="button" class="btn btn-danger" data-dismiss="modal"
        onclick="deleteUser()">Supprimer</button>
    `;
        usermodif.innerHTML = usermodifHTML;
    } else if (userCurrent.userinfo && !isAdmin) {
        const usermodifHTML = `
        <button type="button"  class="btn btn-outline-success" data-dismiss="modal"
            onclick="updateUser()">Modifer
        </button>
    `;
        usermodif.innerHTML += usermodifHTML;
    } else if (userCurrent.userstatus && !isAdmin) {
        const usermodifHTML = `
        <button type="button" class="btn btn-info" data-dismiss="modal"
        onclick="changePeopleStatus('staff')">Employer</button>


        <button type="button" class="btn btn-dangera" data-dismiss="modal"
                        onclick="changePeopleStatus('client')">Client</button>
    `;
        usermodif.innerHTML += usermodifHTML;
    }

};

async function changePeopleStatus(pro) {
    if (isAdmin) {
        const clid = document.getElementById('clientid').value;
        await requesttoBackend('PUT', `people/status/${clid}`, pro == "client" ? { staff: 'false', admin: "false" } : pro == "staff" ? { staff: 'true' } : { staff: 'true' });

        deletePeople();
        const people = await requesttoBackend('GET', 'people/persons/nuance');
        await PostPeople(people);
        initDataLoader();

    } else {
        alert(`${username}, Vous n'êtes pas autoriser à faire celà!`)
    }
};


async function deleteUser() {
    if (isAdmin) {
        var result = window.confirm("Voulez vous vraiment le retirer?");

        const phone = document.getElementById('clientPhone').value;
        const clid = document.getElementById('clientid').value;

        if (clid !== phone && result) {
            const orderdata = await GetOrder();
            const myode = orderdata.find(re => re.phone == phone);

            if (myode) {
                alert("Supprimez dabord ses commandes")
            } else {
                await requesttoBackend('DELETE', `people/${clid}`);
                initDataLoader();
            }
        }
    } else {
        alert(`${username}, Vous n'êtes pas autoriser à faire celà!`)
    }
};
