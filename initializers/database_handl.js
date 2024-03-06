function openArticleDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "Articles";
        const dbVersion = 1;

        const request = indexedDB.open(dbName, dbVersion);
        let articldb;

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            articldb = event.target.result;
            resolve(articldb);
        };

        request.onupgradeneeded = (event) => {
            articldb = event.target.result;

            if (!articldb.objectStoreNames.contains("ArticleStore")) {
                articldb.createObjectStore("ArticleStore", { keyPath: "_id" });
            }
        };
    });
};


function openOrdersDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "OrderdContent";
        const dbVersion = 2;

        const request = indexedDB.open(dbName, dbVersion);
        let orderdb;

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            orderdb = event.target.result;
            resolve(orderdb);
        };

        request.onupgradeneeded = (event) => {
            orderdb = event.target.result;

            if (!orderdb.objectStoreNames.contains("OrderdStore")) {
                orderdb.createObjectStore("OrderdStore", { keyPath: "_id" });
            }
        };
    });
};




function openPeopleDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "peopleDatabase";
        const dbVersion = 3;

        const request = indexedDB.open(dbName, dbVersion);
        let peopledb;

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            peopledb = event.target.result;
            resolve(peopledb);
        };

        request.onupgradeneeded = (event) => {
            peopledb = event.target.result;

            if (!peopledb.objectStoreNames.contains("PeopleContent")) {
                peopledb.createObjectStore("PeopleContent", { keyPath: "_id" });
            }
        };
    });
};

