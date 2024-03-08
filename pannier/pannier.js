async function getallPanier() {
    const allPannier = await GetPannier();
    if (allPannier.length > 0) {
        const tbodyId = document.getElementById('tbody-data');
        tbodyId.innerHTML = '';

        allPannier.forEach(pani => {
            const panierTBODY =
                `
                        <tr>
                            <td class="product-thumbnail">
                                <a href="#">
                                    <img class="imgo" src="${pani.image[0].ima}" alt="item">
                                </a>
                            </td>
                            <td class="product-name">
                                <a href="#">${pani.addarticle}</a>
                               
                            </td>
                            <td class="product-price">
                                <span class="unit-amount">${(parseInt(pani.prix) / 1000).toFixed(3)} F</span>
                            </td>
                            <td class="product-quantity">
                                <div class="input-counter" id="quantity-manipulate">
                                    <div class="input-counter">
                                        <span class="minus-btn" onclick="decreaseQuantity('${pani._id}')">-</span>
                                        <input type="text" min="1" id="${pani._id}" value="${parseInt(pani.quantcho)}">
                                        <span class="plus-btn" onclick="increaseQuantity('${pani._id}')">+</span>
                                    </div>
                                </div>
                            </td>
                            <td class="product-subtotal">
                                <span class="subtotal-amount">${(parseInt(pani.prix) * parseInt(pani.quantcho) / 1000).toFixed(3)} F.CFA</span>
                                <a class="remove" style="cursor: pointer !important;" onclick="removePanierById('${pani._id}')"><i class="bx bx-trash"></i></a>
                            </td>
                        </tr>
                    `;

            tbodyId.innerHTML += panierTBODY;

        });

        const pantotalid = document.getElementById('toteaux');
        pantotalid.innerHTML = '';

        let totalPricea = 0; // Initialize to 1 so that the first multiplication works

        for (const pri of allPannier) {
            const adda = parseInt(pri.prix) * parseInt(pri.quantcho);
            totalPricea += adda;
        };
        const totalPriceb = totalPricea + 1000;
        const pantotalhtml = `
                            <li>Sous-total <span>${(totalPricea / 1000).toFixed(3)} F</span></li>
                            <li>Livraison <span>1000 F</span></li>
                            <li>Total <span>${(totalPriceb / 1000).toFixed(3)} F.CFA</span></li>
                            `;
        pantotalid.innerHTML += pantotalhtml;
    } else {
        window.location.href = '/';

    }

};

async function removePanierById(id) {
    await deletePannierByID(id);
    getallPanier();
};


async function decreaseQuantity(inputId) {

    const result = await GetPannierByID(inputId);
    const inputElement = document.getElementById(inputId);
    if (parseInt(inputElement.value) > 1) {
        inputElement.value = parseInt(inputElement.value) - 1;
        result.quantcho = inputElement.value;
        PutPannier(result);
        //getallPanier();
    }
}

async function increaseQuantity(inputId) {
    const result = await GetPannierByID(inputId);
    const inputElement = document.getElementById(inputId);
    if (parseInt(result.quantity) > parseInt(inputElement.value)) {
        inputElement.value = parseInt(inputElement.value) + 1;
        result.quantcho = inputElement.value;
        PutPannier(result);
        //getallPanier();
    }
}

async function clearPanier() {
    await deletePannier();
    getallPanier();
};
getallPanier();
