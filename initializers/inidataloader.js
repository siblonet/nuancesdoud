async function initDataLoader() {

    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('mobile');
    };
    if (!isMobileDevice()) {
        adMinurl = 'admin';
    }

    try {
        deleteArticle();
        deleteOrder();
        deleteSetting();
        deletePeople();

        const online = await requesttoBackend('GET', 'boutique/nuance');
        if (online.article || online.pagesetting || online.order) {

            const people = await requesttoBackend('GET', 'people/persons/nuance');
            await PostPeople(people);
            await PostOrder(online.order);
            await PostArticle(online.article);
            await PostSettings(online.pagesetting);
            recentProduct(online.article);

        } else {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            const productHTML = `
                <div class="container">
                    <div class="section-title">
                        <span style="color: red !important">Vérifiez que vous avez access a l'internet</span>
                    </div>
                    <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                        <img src="assets/img/error-404.png" alt="Internet Error">
                    </div>
                    <br>
                    <br>
                    <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                        <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
                    </div>
        
                </div>
        `;
            productContainer.innerHTML += productHTML;
            const loaderRemove = document.getElementById('loaderRemove');
            loaderRemove.innerHTML = "";
            loaderRemove.style.display = "none";
        }

    } catch (error) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        const productHTML = `
        <div class="container">
            <div class="section-title">
                <span style="color: red !important" id="isemptyorintern">Vérifiez que vous avez access a l'internet</span>
            </div>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <img src="assets/img/error-404.png" alt="Internet Error">
            </div>
            <br>
            <br>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
            </div>

        </div>
`;
        productContainer.innerHTML += productHTML;
        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
        console.log("initDataLoader try catch", error);

    };
    setPageSettings();

};

initDataLoader();