


function StartCreateArticle() {
    document.getElementById('autocliaddcheck').value = "on";
    const onlineImapro1 = document.getElementById('doblik1');

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
    document.getElementById('opp-bottom').classList.remove('active');
    document.getElementById('discount-feildsall').classList.remove('active');
    document.getElementById('discount-feildsone').classList.remove('active');
    document.getElementById('opp-bottom-open').classList.add('active');
}

function closeModaldata() {
    document.getElementById('autocliaddcheck').value = "off";
}

