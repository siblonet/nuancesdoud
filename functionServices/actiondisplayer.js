const LoadActionsRecors = async (ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, adminiSpace) => {
    adminiSpace.innerHTML = "";

    ActiveDas.classList.remove('active');
    ActiveCo.classList.remove('active');
    ActiveCl.classList.remove('active');
    ActiveAr.classList.remove('active');
    ActiveAn.classList.remove('active');
    const actionrecordHTML = ` 
                <br>
                <br>
                <br>
                <br>

                <div class="containerz">
                    <div class="row">
                        <h3 id="number_of_user">0</h3>
                        <div class="col-12">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Actioner</th>
                                        <th scope="col">Action</th>
                                        <th scope="col">date</th>
                                        <th scope="col">software</th>
                                        <th scope="col">Article</th>
                                    </tr>
                                </thead>
                                <tbody id="action_records">


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                `;

    adminiSpace.innerHTML = actionrecordHTML;

    try {
        const aciontRecord = await requesttoBackend('GET', `boutique/Action/Records/request`);

        if (aciontRecord && aciontRecord.length > 0) {
            const action_records = document.getElementById('action_records');
            let contentHTML = ''; // Initialize an empty string to accumulate HTML

            aciontRecord.forEach((user) => {
                contentHTML += `
                    <tr>
                        <th scope="row">${user.actioned_user.nom} ${user.actioned_user.prenom}</th>
                        <td>${user.action}</td>
                        <td>${moment(user.actioned_dat).format("MMMM D, YYYY HH:mm:ss")}</td>
                        <td>${user.soft_use}</td>
                        <td>${user.actioned_article ? user.actioned_article.addarticle : "Exist Plus"}</td>
                    </tr>
                `;
            });

            action_records.innerHTML = contentHTML; // Update the DOM once
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
};
