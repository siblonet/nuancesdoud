async function initDataLoader() {
    const pincode = sessionStorage.getItem('pincode');

    if (connected) {

        ArticleFromPhone = [];
        const all = [];
        try {
            const online = await requesttoBackend('GET', 'boutique/nuance');
            if (online.article || online.pagesetting || online.order) {

                let localOrders = await GetOffline();
                let localPerson = await GetOfflinePeople();
                const articles = await GetOfflineArticle();

                if (articles.length > 0) {
                    document.getElementById("asyncdata").innerHTML = `<img src="assets/img/offline.gif" style="height: 100% !important; width: 100% !important;" alt="offline" />`;



                    for (const article of articles) {
                        if (!article._id) {
                            //article.quantity = 0;
                            const docid = await requesttoBackend('POST', 'boutique', article);
                            if (localOrders.length > 0) {
                                for (const lord of localOrders) {
                                    lord.articles.find((orit) => orit.arti_id.id_has == article.id_has).arti_id = docid;

                                    const NewlocalOrders = localOrders.filter((orid) => orid.has_id !== lord.has_id);
                                    localOrders = [];
                                    NewlocalOrders.forEach((ed, index) => {
                                        localOrders.push(ed);
                                    });
                                    localOrders.push(lord);

                                }

                            }
                        }

                    };
                };
                if (localPerson.length > 0) {
                    document.getElementById("asyncdata").innerHTML = `<img src="assets/img/offline.gif" style="height: 100% !important; width: 100% !important;" alt="offline" />`;
                    for (const locPers of localPerson) {
                        const docpid = await requesttoBackend('POST', 'people/account/local', locPers);
                        if (localOrders.length > 0) {
                            for (const lord of localOrders) {
                                if (locPers.phone == lord.client.phone) {
                                    lord.client = docpid.token;

                                    const NewlocalOrders = localOrders.filter((orid) => orid.client.phone !== locPers.phone);
                                    localOrders = [];
                                    NewlocalOrders.forEach((ed, index) => {
                                        localOrders.push(ed);
                                    });
                                    localOrders.push(lord);

                                } else {
                                    console.log("else")
                                }
                            };

                        } else {
                            console.log(localOrders.length);
                        }
                    };
                };
                //console.log("persone loop done");

                if (localOrders.length > 0) {
                    for (const lord of localOrders) {
                        await requesttoBackend('POST', 'orders/syncro/local/toline/nuance', lord);
                    }

                }


                deleteOfflineArticle();
                deleteOfflinePeople();
                deleteOffline();

                /*
    
               
    
    */
                deletePeople();
                const people = await requesttoBackend('GET', 'people/persons/nuance');
                all.push(people);
                await PostPeople(people);

                deleteArticle();
                deleteOrder();
                const items = await requesttoBackend('GET', 'boutique/nuance');
                all.push(items);

                await PostOrder(items.order);
                await PostArticle(items.article);
                await PostOfflineArticleReserve(items.article);
                annoncePers = items.pagesetting;
                internet = "online";
                document.getElementById("asyncdata").innerHTML = `<i class="lnr lnr-cloud-sync" style="color: #aaa"></i>`;
                AdminUIinit();

                const version = await requesttoBackend('GET', 'boutique/version/new/pc/software/pc');

                if (version.version > parseInt(document.getElementById("downloadVersion").value)) {
                    const downloadNew = document.getElementById("downloadNew");
                    downloadNew.style.color = "green";  // Fix typo in 'color'
                    document.getElementById("downloadUrl").value = version.url;
                    document.getElementById("downloadName").value = `NuancesDoud${version.version}.zip`;
                }

                if (backup) {
                    getDaysBetweenDates(backup, all)

                } else {
                    const currentDate = new Date(); // Get the current date
                    const startDate = currentDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
                    getDaysBetweenDates(startDate, all)
                }
            } else {
                console.log("no data from backend")
            }

        } catch (error) {
            console.log("catch", error);
            internet = "offline";
            AdminUIinit();

            document.getElementById("asyncdata").innerHTML = ` <i class="lnr lnr-cloud-sync" style="color: red"></i>`;

            /*
            deletePeople();
            deleteArticle();
            deleteOrder();
            */

        }
    } else {
        ArticleFromPhone = [];
        $(function () {
            $("#loaderRemove").fadeOut("slow");;
        });
        document.getElementById('pinCodeOpen').click();

    }
};

const downloadNewVersion = () => {
    const url = document.getElementById("downloadUrl").value;
    const filename = document.getElementById("downloadName").value;

    ipc.send("newversionavailable", url, filename);
    const downloadNew = document.getElementById("downloadNew");
    downloadNew.style.color = "#aaa";  // Fix typo in 'color'
    ipc.once("download-complete", (event, message) => {
        alert("Téléchargement complet, décompressez et installez");
    });
};

const changeUser = async () => {
    const passwordchange = document.getElementById("passwordchange").value;
    if (passwordchange) {
        const member = await GetMemberbyPincode(passwordchange);
        if (member) {
            sessionStorage.clear();
            sessionStorage.setItem('pincode', passwordchange);
            document.getElementById('connexionClose').click();
            /*document.getElementById("realchangea").innerHTML = `
            <h1>Bonjour <span class="text-primary">${username}</span></h1>
            `;*/

            initDataLoader();
            NafigatioTo("dasboard")
        } else {

            document.getElementById('connexionQli').click();
        }

    } else {

        document.getElementById('connexionQli').click();
    }
};


function getDaysBetweenDates(dateString1, data) {
    const currentDate = new Date(); // Get the current date
    const endDate = currentDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
    const date1 = new Date(dateString1);
    const date2 = new Date(endDate);

    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(date2 - date1);

    // Convert the time difference to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if (daysDifference > 0) {
        localStorage.setItem('backup', endDate);
        ipc.send("saveDataToFile", data);
    }
};

setInterval(() => {
    const addarticle = document.getElementById('addarticle').value;
    const addbarcode = document.getElementById('addbarcode').value;
    const _id = document.getElementById('ediatiid').value;

    if (ArticleFromPhone.length < 1 && ArticleFromPhoneSearch.length < 1 && !addarticle && !addbarcode && !_id && !isExaminating) {
        console.log("not baying");
        initDataLoader()
    } else {
        console.log("skiping")
    }
}, 70000);


setInterval(() => {
    if (!isArticle && !isVendu && !isCommande && !isFinis && !isPeoples) {
        isExaminating = false;
    }
}, 80000);

initDataLoader();