async function selectStatus(sta) {
    const ido = document.getElementById('ido').value;

    await sendRequestforOrder('PUT', `orders/change/order/statuts/${ido}`, { statut: sta });
    window.location.href = "/"
};

async function cancelItemById() {

    var result = window.confirm("Voulez vous vraiment annuller?");

    if (result) {

        const ido = document.getElementById('ido').value;
        const proid = document.getElementById('proid').value;
        const arti_id = document.getElementById('arti_id').value;
        const quan = document.getElementById('productQuantity').value;
        const vin_or = Orderdata.find(re => re._id === ido);
        if (vin_or.articles.length > 1) {
            await sendRequestforOrder('DELETE', `orders/oarderar/${ido}/${proid}/${arti_id}/${quan}`);

        } else {
            await sendRequestforOrder('DELETE', `orders/${ido}/${arti_id}/${quan}`);

        }
        window.location.reload()
    }

};

async function optionCancileView(_id, proid, arti_id) {
    //console.log(_id, proid, arti_id);
    await openOrdersDatabase();

    getDasbordById(_id).then(result => {
        const product = result.articles.find(po => po._id == proid);


        if (product && product.arti_id) {

            document.getElementById('optionCancilename').innerText = product.arti_id.addarticle;
            document.getElementById('optionViewNewPrice').innerText = `${product.arti_id.addprix} F.CFA`;
            document.getElementById('productQuantity').value = product.quantcho;


            const orderStatuHtml = document.getElementById('statusOrder');
            orderStatuHtml.innerHTML = '';
            const orderStatus = result.statut === "done" ? "livré" : result.statut == "review" ? "en attente" : result.statut === "onway" ? "en cours" : "échoué";
            const orderStatu = `                     <p>Statut: </p> <span style="color: ${orderStatus === 'livré' ? 'green' : orderStatus === 'en attente' ? 'orange' : orderStatus === 'en cours' ? 'pink' : 'red'}">${orderStatus}</span>
                                    `;
            orderStatuHtml.innerHTML = orderStatu;


            document.getElementById('ido').value = `${_id}`;
            document.getElementById('proid').value = `${proid}`;
            document.getElementById('arti_id').value = `${arti_id}`;

            const element = document.getElementById('hidlater');
            element.classList.remove('hiddendhid');
            element.classList.add('hiddendshow');


            document.getElementById('villeValue').value = `${result.ville}`;
            document.getElementById('communeValue').value = `${result.commune}`;
            document.getElementById('adresseValue').value = `${result.lieu}`;
            document.getElementById('telephoneValue').value = `${result.phone}`;

            const bacgro = document.getElementById('bagron');
            bacgro.style.backgroundColor = product.backgroundColor;
            const modalImage = document.getElementById('ipage');
            modalImage.src = product.arti_id.image[0].ima;


            quiColorfunb(product.arti_id.image[0].ima);

            if (result.statut === "done") {
                document.getElementById('hidchange').innerHTML = "";
            }
        } else {
            document.getElementById('optionCancilename').innerText = "Article Supprimé";

        };

    }).catch();

};

const imasEdi = [];

function previewImageEdite(event) {
    const fileInput = document.getElementById('imageInputf');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const base64Data = e.target.result.split(',')[1];
            const response = await fetch(apiUrlfine + "boutique/uploadImage", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ima: base64Data, nam: file.name }),
            });

            if (response.ok) {
                const url = await response.json();

                // Find the first element in imasEdi with ima set to "one"
                imasEdi[0].ima = url.ima;
                const imagePreview = document.getElementById(`Editeimage1`);
                imagePreview.innerHTML = `<img src="${url.ima}" alt="aricle image" width="200px" height="300">`;


                fileInput.value = '';
            } else {
                alert("Operation failed", response.statusText);
            }
        };

        reader.readAsDataURL(file);
    }
}


function removeImageEdite() {
    var result = window.confirm("Voulez vous vraiment le retirer?");

    if (result) {
        document.getElementById(`Editeimage1`).innerHTML = "";
    }

}


async function EditeViewArticle() {
    const _id = document.getElementById('ediatiid').value;
    try {
        const addarticle = document.getElementById('Editearticle').value;
        const addquant = parseInt(document.getElementById('Editequant').value);
        const addgenre = document.getElementById('Editegenre').value;
        const addprix = document.getElementById('Editeprix').value;
        const addreduction = document.getElementById('Editereduction').value;
        const addoccasion = document.getElementById('Editeoccasion').value;
        const addcoul = document.getElementById('Editecoul').value;
        const addmarque = document.getElementById('Editemarque').value;
        const addbarcode = document.getElementById('Editebarcode').value;
        const notes = document.getElementById('Editenotes').value;


        if (addarticle && addgenre && addbarcode && addprix && addcoul && addmarque) {
            const product = {
                addarticle: addarticle,
                quantity: parseInt(addquant),
                addgenre: addgenre,
                addprix: parseInt(addprix),
                addreduction: parseInt(addreduction),
                addoccasion: addoccasion,
                addcoul: addcoul,
                addmarque: addmarque,
                notes: notes,
                barcode: addbarcode,
                image: imasEdi

            };
            const createItem = async () => {
                try {
                    await sendRequestforOrder('PUT', `boutique/${_id}`, product);
                    FetchArticle('PUT', _id, product);

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


async function optionEditeView(_id) {
    imasEdi.length = 0
    await openArticleDatabase();
    getArticleById(_id).then(product => {

        document.getElementById('ediatiid').value = _id;
        document.getElementById('Editearticle').value = product.addarticle;
        document.getElementById('Editequant').value = parseInt(product.quantity);
        document.getElementById('Editegenre').value = product.addgenre;
        document.getElementById('Editereduction').value = product.addreduction;
        document.getElementById('Editeprix').value = product.addprix;
        document.getElementById('Editeoccasion').value = product.addoccasion;
        document.getElementById('Editecoul').value = product.addcoul;
        document.getElementById('Editemarque').value = product.addmarque;
        document.getElementById('Editebarcode').value = product.barcode;
        document.getElementById('Editenotes').value = product.notes;

        /*Editetransage Editeexpe Editefour Editephone Editetypepro Editetype Editemateri Editedispo Editetail Editenouveaute*/
        /*addtransage addexpe addfour addphone addtypepro addtype addmateri adddispo addtail addnouveaute*/

        product.image.forEach((ed, index) => {
            const imagePreview = document.getElementById(`Editeimage1`);
            imagePreview.innerHTML = '';
            imasEdi.push(ed);
            imagePreview.innerHTML = `<img src="${ed.ima}" alt="aricle image" width="200px" height="300">`;
        });

    });
};

async function deleteArticleById() {
    var result = window.confirm("Voulez vous vraiment supprimer?");

    if (result) {

        const _ide = document.getElementById("ediatiid").value;
        await sendRequestforOrder('DELETE', `boutique/${_ide}`);
        FetchArticle('DEL', _ide, 'DEL');
    }

}

function addArticlesa(data) {
    return new Promise((resolve, reject) => {
        const transaction = articldb.transaction(["ArticleStore"], "readwrite");
        const objectStore = transaction.objectStore("ArticleStore");

        const requests = data.map(article => {
            return new Promise((innerResolve, innerReject) => {
                const request = objectStore.add(article);
                request.onsuccess = () => innerResolve();
                request.onerror = (event) => innerReject(event.target.error);
            });
        });

        Promise.all(requests)
            .then(() => resolve('done'))
            .catch(error => reject(error));
    });
}

const sendRequestforOrder = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);

    return response;

};

async function getDasbordById(_id) {
    return new Promise((resolve, reject) => {
        const transaction = orderdb.transaction(["OrderdStore"], "readonly");
        const objectStore = transaction.objectStore("OrderdStore");
        const getRequest = objectStore.get(_id);

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };

        getRequest.onsuccess = (event) => {
            const actioa = event.target.result;
            resolve(actioa)
        };


    });
}


async function getArticleById(_id) {
    return new Promise((resolve, reject) => {
        const transaction = articldb.transaction(["ArticleStore"], "readonly");
        const objectStore = transaction.objectStore("ArticleStore");
        const getRequest = objectStore.get(_id);

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };

        getRequest.onsuccess = (event) => {
            const actioa = event.target.result;
            resolve(actioa)
        };


    });
}





function quiColorfunb(im) {
    const modalImage = document.getElementById('ipage');
    modalImage.src = im;
};




function addOrders(data) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(data)) {
            reject(new Error('Data is not an array'));
            return;
        }

        const transaction = orderdb.transaction(["OrderdStore"], "readwrite");
        const objectStore = transaction.objectStore("OrderdStore");

        const requests = data.map(article => {
            return new Promise((innerResolve, innerReject) => {
                const request = objectStore.put(article);
                request.onsuccess = () => innerResolve();
                request.onerror = (event) => innerReject(event.target.error);
            });
        });

        Promise.all(requests)
            .then(() => resolve('done'))
            .catch(error => reject(error));
    });
}






function clearOrder() {
    return new Promise((resolve, reject) => {
        const transaction = orderdb.transaction(["OrderdStore"], "readwrite");
        const objectStore = transaction.objectStore("OrderdStore");
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = (event) => {
            resolve("cleared")
        };

        transaction.onerror = (event) => {
            console.error("Error accessing object store:", event.target.error);
            reject("Error accessing object store");
        };


    });

}
