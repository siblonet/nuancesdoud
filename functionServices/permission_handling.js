/*userdelete
userinfo
userstatus
orderback
orderchange
orderdone
orderwof*/

const PermissionHandled = async (inputid) => {
    const checked = document.getElementById(`${inputid}`).checked;
    const userid = document.getElementById('clientid').value;
    const usa = {
        [inputid]: checked, // Using inputid as a property name
    };
    const people = await requesttoBackend('PUT', `people/permission/handle/${userid}/nuance`, usa);
    deletePeople();
    await PostPeople(people);
};
