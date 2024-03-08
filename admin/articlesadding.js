


function StartCreateArticle() {
    document.getElementById('autocliaddcheck').value = "on";
    const onlineImapro1 = document.getElementById('doblik1');
    const onlineImapro2 = document.getElementById('doblik2');
    const onlineImapro3 = document.getElementById('doblik3');
    const onlineImapro4 = document.getElementById('doblik4');

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
    background-color: #000000;
    overflow: hidden;
`;

    onlineImapro1.style = styels;
    onlineImapro2.style = styels;
    onlineImapro3.style = styels;
    onlineImapro4.style = styels;

    if (internet == "online") {
        onlineImapro1.setAttribute('onclick', "");
        onlineImapro1.innerHTML = `
        <input type="file" id="doblik11" accept="image/*"
    onchange="AddArticleImage(1)" >
    `;


        const onlineImapro2 = document.getElementById('doblik2');
        onlineImapro2.setAttribute('onclick', "");
        onlineImapro2.innerHTML = `
        <input type="file" id="doblik22" accept="image/*"
    onchange="AddArticleImage(2)" >
    `;

        const onlineImapro3 = document.getElementById('doblik3');
        onlineImapro3.setAttribute('onclick', "");

        onlineImapro3.innerHTML = `
        <input type="file" id="doblik33" accept="image/*"
    onchange="AddArticleImage(3)" >
    `;

        const onlineImapro4 = document.getElementById('doblik4');
        onlineImapro4.setAttribute('onclick', "");
        onlineImapro4.innerHTML = `
        <input type="file" id="doblik44" accept="image/*"
    onchange="AddArticleImage(4)" >
    `;
    }
}

function closeModaldata() {
    document.getElementById('autocliaddcheck').value = "off";
}

