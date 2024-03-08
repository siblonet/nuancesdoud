let ActiveDasa;
let ActiveCoa;
let ActiveCla;
let ActiveAra;
let ActiveAna;
let adminiSpacea;

function ArticlesUI(ActiveDas, ActiveCo, ActiveCl, ActiveAr, ActiveAn, adminiSpace) {
    ArticleFromPhoneSearch = [];
    ActiveDasa = ActiveDas;
    ActiveCoa = ActiveCo;
    ActiveCla = ActiveCl;
    ActiveAra = ActiveAr;
    ActiveAna = ActiveAn;
    adminiSpacea = adminiSpace;
    isExaminating = true;
    isArticle = true;
    isVendu = false;
    isCommande = false;
    isFinis = false;
    isPeoples = false;
    if (connected) {

        ActiveDas.classList.remove('active');
        ActiveCo.classList.remove('active');
        ActiveCl.classList.remove('active');
        ActiveAr.classList.add('active');
        ActiveAn.classList.remove('active');
        document.getElementById('filter-order').classList.remove('active');

        const livecha = document.getElementById('add-article');

        setTimeout(() => {
            livecha.classList.add('active');
        }, 1000);

        GetArticle("avail").then((offarticles) => {


            const articlesHTML = `
                <br>
                <br>
                <br>
                <br>
              
        ${offarticles.map(article => {
                return `
            <div class="articlerow">
      
                <div class="articlerwedgea">
      
                    <div class="articlesInfosa">
                       
                            <div class="imageholder">
                               
                                <img src="${article.image[0] ? article.image[0].ima : ''}" alt="image1">


                            </div>
                           
                            <div class="">
                                <p class="sta shipp"  style="cursor: pointer" data-toggle="modal" data-target="#modArticle" onclick="openArticleforediting('${article._id}')">Ouvrir</p>
                                <div style="height: 5px"></div>
                                <p  class="sta" style="padding-left: ${article.quantity > 0 ? '10px' : '30px'}; padding-right: ${article.quantity > 0 ? '10px' : '30px'}; font-size: 14px; background-color: ${article.quantity > 0 ? "#054846" : "rgba(255, 0, 89, 0.341)"}; font-weight: bold; color: ${article.quantity > 0 ? "#ffffff" : "red"}">${article.quantity > 0 ? "Disponible" : "Finis"}</p>
                                <div style="height: 7px"></div>

                                <i onclick="addArticletoPannierManually('${article._id}')" class="sta vente lnr lnr-cart"></i>
                            </div>
                    </div>
      
                    <hr>

                    
                    <div class="orderinfoso">
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Article: <strong>${article.addarticle}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Quantité: <strong>${article.quantity}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Vendu: <strong>${article.quanvend}</strong></p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Prix: <strong>${article.addprix}</strong> F</p>
                        </div>
      
                        <span style="width: 10px;"></span>
                        <div style="background-color: #ffffff;">
                            <p style="max-height: 50px; overflow: hidden;">Promo: <strong>${article.addreduction ? article.addreduction : 0}</strong> F</p>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
      
            `;
            }).join('')}

        `;



            adminiSpace.innerHTML = articlesHTML;
        }).catch((error) => console.log(error))
    }

}


const addArticletoPannierManually = async (article_id) => {//appler par maint
    if (internet == "online" && connected) {
        const result = await GetArticleByID(article_id);
        if (result && !ArticleFromPhone.find((exito) => exito._id == article_id)) {
            const buybag = document.getElementById("buybag");
            const previe = parseInt(buybag.innerText);
            buybag.style.backgroundColor = 'rgb(255, 0, 98)';
            document.getElementById("buybag").innerText = `${previe ? previe + 1 : 1}`;

            result.quantcho = 1;
            result.prix = result.addprix;
            ArticleFromPhone.push(result);
            GetFromPhone();
        }

    } else if (connected) {
        const result = await GetOfflineArticleByID(article_id);
        if (result && !ArticleFromPhone.find((exito) => exito.id_has == article_id)) {
            const buybag = document.getElementById("buybag");
            const previe = parseInt(buybag.innerText);
            buybag.style.backgroundColor = 'rgb(255, 0, 98)';
            document.getElementById("buybag").innerText = `${previe ? previe + 1 : 1}`;

            result.quantcho = 1;
            result.prix = result.addprix;
            ArticleFromPhone.push(result);
            GetFromPhone();
        }
    }

};


function CreateArticle() {
    try {
        const addarticle = document.getElementById('addarticle').value;
        const addquant = document.getElementById('addquant').value;
        const addgenre = document.getElementById('addgenre').value;
        const addprix = document.getElementById('addprix').value;
        const addreduction = document.getElementById('addreduction').value;
        const addoccasion = document.getElementById('addoccasion').value;
        const addbarcode = document.getElementById('addbarcode').value;

        const addcoul = document.getElementById('addcoul').value;
        const addmarque = document.getElementById('addmarque').value;
        const notes = document.getElementById('notes').value;


        if (addarticle && addgenre && addbarcode && addprix && addmarque && (Offlineimas.length > 0 || Onlineimas.length > 0)) {
            const product = {
                id_has: Math.floor(Math.random() * 100000000).toString(),
                addarticle: addarticle,
                quantity: parseInt(addquant),
                addgenre: addgenre,
                addprix: parseInt(addprix),
                addreduction: parseInt(addreduction),
                addoccasion: addoccasion,
                addcoul: addcoul ? addcoul : "#000000,#000000,#000000,#000000",
                addmarque: addmarque,
                notes: notes,
                barcode: addbarcode,
                owner: "nuance",
                image: internet === "online" ? Onlineimas : Offlineimas
            };
            document.getElementById("ajouteencou").innerText = "En cours"

            if (internet === "online") {
                const createItem = async () => {
                    try {
                        const createdProdec = await requesttoBackend('POST', 'boutique', product);
                        if (createdProdec) {
                            const items = await requesttoBackend('GET', 'boutique/only/article/nuance');
                            await deleteArticle();
                            await PostArticle(items);
                        }

                    } catch (error) {
                        console.error('Error creating product:', error.message);
                    }
                };

                createItem();

            } else {
                const createArticle = async () => {
                    await PostOfflineArticle(product).then((dd) => console.log(dd)).catch((error) => console.log(error));
                };
                createArticle();
            }

            document.getElementById("ajouteencou").innerText = "Ajouter Encore"

        }
    } catch (error) {
        console.log(error)
    }
}

async function AddArticleImage(pos) {
    const imagePreview = document.getElementById(`imagePreview${pos}`);
    imagePreview.innerHTML = '';

    if (Onlineimas.length < 4) {

        const fileInput = document.getElementById(`doblik${pos}${pos}`);
        const file = fileInput.files[0];

        if (!file) {
            alert("Aucune image n'a été selectionné!");
            return;
        }

        const reader = new FileReader();
        reader.onload = async function (event) {
            const base64Data = event.target.result.split(',')[1];
            const url = await requesttoBackend('POST', 'boutique/uploadImage', { ima: base64Data, nam: file.name });
            const imarandomid = Math.floor(Math.random() * 100000000).toString()
            Onlineimas.push({ ima: url.ima, has_aidii: imarandomid });

            const img = document.createElement('img');
            img.src = url.ima;
            img.style.height = '100%';
            img.style.width = '100%';
            imagePreview.appendChild(img);
            imagePreview.appendChild(img);
            const doblik = document.getElementById(`doblik${pos}`);
            doblik.style.width = "40%";

            doblik.setAttribute('onclick', `Duplique('${pos}', '${imarandomid}')`);
            doblik.innerHTML = `<p style="color: #ffffff;">Dupliquer</p>`
        };
        reader.readAsDataURL(file);
        if (Onlineimas.length == 4) {
            document.getElementById('limitimag1').style.display = "none";
            document.getElementById('limitimag2').style.display = "none";
        }
    }


}

function removeImageCreate(pos) {
    var result = window.confirm("Voulez vous vraiment le retirer?");
    const imagePreview = document.getElementById(`imagePreview${pos}`);
    imagePreview.innerHTML = '';

    if (result) {
        Onlineimas.splice(pos - 1, 1);




        document.getElementById('limitimag1').style.display = "flex";
        document.getElementById('limitimag2').style.display = "flex";
    }

}


async function openArticleforediting(id_has) {


    const Editeimageonline1 = document.getElementById('Editeimageonline1');
    const Editeimageonline2 = document.getElementById('Editeimageonline2');
    const Editeimageonline3 = document.getElementById('Editeimageonline3');
    const Editeimageonline4 = document.getElementById('Editeimageonline4');

    const styels = `
    align-items: center; 
    justify-content: center; 
    text-align: center; 
    cursor: pointer; 
    height: 25px; 
    width: 100px;
    padding-right: 0; 
    padding-left: 0; 
    border-radius: 7px; 
    background-color: #aaaaaa;
    overflow: hidden;
`;

    Editeimageonline1.style = styels;
    Editeimageonline2.style = styels;
    Editeimageonline3.style = styels;
    Editeimageonline4.style = styels;

    Onlineimas.length = 0;

    GetArticleByID(id_has).then(product => {
        product.image.forEach((ed, index) => {
            Onlineimas.push(ed);
        });

        document.getElementById('ediatiid').value = id_has;
        document.getElementById('editearticle').value = product.addarticle;
        document.getElementById('editequant').value = parseInt(product.quantity);
        document.getElementById('editegenre').value = product.addgenre;
        document.getElementById('editereduction').value = product.addreduction;
        document.getElementById('editeprix').value = product.addprix;
        document.getElementById('editeoccasion').value = product.addoccasion;
        document.getElementById('editecoul').value = product.addcoul;
        document.getElementById('editemarque').value = product.addmarque;
        document.getElementById('editebarcode').value = product.barcode;
        document.getElementById('editenotes').value = product.notes;


        const imagePreview1 = document.getElementById(`Editeimage1`);
        imagePreview1.src = Onlineimas[0].ima;
        document.getElementById('editeimageid1').value = Onlineimas[0]._id;

        /*const imagePreview2 = document.getElementById(`Editeimage2`);
        imagePreview2.src = Onlineimas[1].ima;
        document.getElementById('editeimageid2').value = Onlineimas[1]._id;

        const imagePreview3 = document.getElementById(`Editeimage3`);
        imagePreview3.src = Onlineimas[2].ima;
        document.getElementById('editeimageid3').value = Onlineimas[2]._id;

        const imagePreview4 = document.getElementById(`Editeimage4`);
        imagePreview4.src = Onlineimas[3].ima;
        document.getElementById('editeimageid4').value = Onlineimas[3]._id;*/



        const onlineImapro1 = document.getElementById('Editeimageonline1');
        onlineImapro1.setAttribute('onclick', "");
        onlineImapro1.innerHTML = `
                <input type="file" id="Editeimageonline1inpu" accept="image/*"
            onchange="EditeArticleImage(1)" >
            `;

        const onlineImapro2 = document.getElementById('Editeimageonline2');
        onlineImapro2.setAttribute('onclick', "");

        onlineImapro2.innerHTML = `
                <input type="file" id="Editeimageonline2inpu" accept="image/*"
            onchange="EditeArticleImage(2)" >
            `;


        const onlineImapro3 = document.getElementById('Editeimageonline3');
        onlineImapro3.setAttribute('onclick', "");

        onlineImapro3.innerHTML = `
                <input type="file" id="Editeimageonline3inpu" accept="image/*"
            onchange="EditeArticleImage(3)" >
            `;

        const onlineImapro4 = document.getElementById('Editeimageonline4');
        onlineImapro4.setAttribute('onclick', "");

        onlineImapro4.innerHTML = `
                <input type="file" id="Editeimageonline4inpu" accept="image/*"
            onchange="EditeArticleImage(4)" >
            `;

        if (Onlineimas.length == 4) {
            document.getElementById('limitimage1').style.display = "none";
            document.getElementById('limitimage2').style.display = "none";
        }

    });

};



function removeImageEdite(pos) {
    var result = window.confirm("Voulez vous vraiment le retirer?");
    const imid = document.getElementById(`editeimageid${pos}`).value;


    if (result) {
        const imagePreview = document.getElementById(`Editeimage${pos}`);
        imagePreview.src = '';
        const newOfflineime = Onlineimas.filter((im) => im._id !== imid);
        Onlineimas.length = 0;
        newOfflineime.forEach((ed, index) => {
            Onlineimas.push(ed);
        });

        document.getElementById('limitimage1').style.display = "flex";
        document.getElementById('limitimage2').style.display = "flex";
    }


}

async function EditeArticleImage(pos) {
    const imagePreview = document.getElementById(`Editeimage${pos}`);

    if (Onlineimas.length < 4) {

        const fileInput = document.getElementById(`Editeimageonline${pos}inpu`);
        const file = fileInput.files[0];

        if (!file) {
            alert("Aucune image n'a été selectionné!");
            return;
        };
        console.log(file.name, file.name.toString());
        const reader = new FileReader();
        reader.onload = async function (event) {
            const base64Data = event.target.result.split(',')[1];

            const response = await fetch(apiUrlfine + "boutique/uploadImage", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ima: base64Data, nam: file.name }),
            });

            if (response.ok) {
                const url = await response.json();
                console.log(url);
                Onlineimas.push(url);
                setTimeout(() => {
                    imagePreview.src = url.ima;
                    imagePreview.style.height = '100%';
                    imagePreview.style.width = '100%';
                }, 2500);
            } else {
                console.log("gegegeg")
            }


        };
        reader.readAsDataURL(file);
        if (Onlineimas.length == 4) {
            document.getElementById('limitimage1').style.display = "none";
            document.getElementById('limitimage2').style.display = "none";
        }
    }



}


function ClearArticleinfos(caller) {
    if (caller == "addarticles") {
        document.getElementById('autocliaddcheck').value = "off";
        initDataLoader();
        Offlineimas.length = 0;
        Onlineimas.length = 0;
    } else {
        Offlineimas.length = 0;
        Onlineimas.length = 0;
    }
}


async function EditeArticle() {
    const _id = document.getElementById('ediatiid').value;
    try {
        const addarticle = document.getElementById('editearticle').value;
        const addquant = parseInt(document.getElementById('editequant').value);
        const addgenre = document.getElementById('editegenre').value;
        const addprix = document.getElementById('editeprix').value;
        const addreduction = document.getElementById('editereduction').value;
        const addoccasion = document.getElementById('editeoccasion').value;
        const addcoul = document.getElementById('editecoul').value;
        const addmarque = document.getElementById('editemarque').value;
        const addbarcode = document.getElementById('editebarcode').value;
        const notes = document.getElementById('editenotes').value;


        if (addarticle && addgenre && addbarcode && addprix && addcoul && addmarque) {
            const product = {
                id_has: _id,
                addarticle: addarticle,
                quantity: parseInt(addquant),
                addgenre: addgenre,
                addprix: parseInt(addprix),
                addreduction: parseInt(addreduction),
                addoccasion: addoccasion,
                addcoul: addcoul,
                addmarque: addmarque,
                notes: notes,
                owner: "nuance",
                barcode: addbarcode,
                image: internet == "online" ? Onlineimas : Offlineimas

            };

            const createItem = async () => {
                try {
                    await requesttoBackend('PUT', `boutique/${_id}`, product);
                    initDataLoader();

                } catch (error) {
                    console.error('Error updating product:', error.message);
                }
            };

            createItem();


        }
    } catch (error) {
        console.log(error)
    }
};


async function RemoveArticleById() {
    var result = window.confirm("Voulez vous vraiment supprimer?");

    if (result) {
        const _ide = document.getElementById("ediatiid").value;
        await requesttoBackend('DELETE', `boutique/${_ide}`);
        Onlineimas.length = 0;
        Offlineimas.length = 0;
        initDataLoader();


    }

};


async function PatploVisualation() {
    const DATA = {
        labels: [],
        datasets: []
    };
    const DATAA = {
        labels: [],
        datasets: []
    };
    const COLORS = ["#eb9f50", "#054846", "#f0b968", "#03c895", "#20c997", "#234bbb", "#6076d8", "#B162AC", "#4755AB", "#58595b", "#1e1d1d", "#166a8f", "#acc236", "#f53794"];
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * COLORS.length);
        return COLORS[randomIndex];
    };


    const offarticles = await GetArticle();


    // Initialize the data array with zeros
    DATA.labels = offarticles.map(item => item.addmarque);
    DATAA.labels = offarticles.map(item => item.addmarque);

    let dataSol;
    let dataAvl;

    for (let i = 0; i < offarticles.length; i++) {
        dataSol = Array(offarticles.length).fill(0);
        dataAvl = Array(offarticles.length).fill(0);

        // Set the value at the current iteration's position to the quanvend value
        dataSol[i] = offarticles[i].quanvend;
        dataAvl[i] = offarticles[i].quantity;

        DATA.datasets.push({
            label: offarticles[i].addarticle,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            data: dataSol,
            fill: false,
        });


        DATAA.datasets.push({
            label: offarticles[i].addarticle,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            data: dataAvl,
            fill: false,
        });
    };

    new Chart(document.getElementById("linechart"), {
        type: 'line',
        data: DATA,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Plus Vendu'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    });

    new Chart(document.getElementById("barchart"), {
        type: 'bar',
        data: DATAA,
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Etat d'est articles"
            },
            legend: {
                position: 'top',
            },
        }
    });


}
