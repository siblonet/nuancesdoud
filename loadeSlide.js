function  setPad(setPad) {
    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('mobile');
    }
    if (setPad && setPad.length > 0) {
        if (isMobileDevice()) {
            $(".banner-bg1").css("background-image", `url(${setPad.find(item => item.which === "phonea") ? setPad.find(item => item.which === "phonea").image : "assets/img/par4.png"})`);
            $(".banner-bg2").css("background-image", `url(${setPad.find(item => item.which === "phoneb") ? setPad.find(item => item.which === "phoneb").image : "assets/img/par3.png"})`);
            $(".banner-bg3").css("background-image", `url(${setPad.find(item => item.which === "phonec") ? setPad.find(item => item.which === "phonec").image : "assets/img/par2.png"})`);

        } else {
            $(".banner-bg1").css("background-image", `url(${setPad.find(item => item.which === "slidea") ? setPad.find(item => item.which === "slidea").image : "assets/img/par4.png"})`);
            $(".banner-bg2").css("background-image", `url(${setPad.find(item => item.which === "slideb") ? setPad.find(item => item.which === "slideb").image : "assets/img/par3.png"})`);
            $(".banner-bg3").css("background-image", `url(${setPad.find(item => item.which === "slidec") ? setPad.find(item => item.which === "slidec").image : "assets/img/par2.png"})`);

        }

        $("#chanVideo").attr("src", `${setPad.find(item => item.which === "baVdeo") ? setPad.find(item => item.which === "baVdeo").image : "assets/background.webm"}`);
        $("#background-video")[0].load();
        $("#background-video")[0].play();

        $(".nobleim").attr("src", `${setPad.find(item => item.which === "logoextern") ? setPad.find(item => item.which === "logoextern").image : "assets/img/logonouce.jpg"}`);
        $(".bg-image1").css("background-image", `url(${setPad.find(item => item.which === "backglise") ? setPad.find(item => item.which === "backglise").image : "assets/img/offer-bg.jpg"})`);
    } else {
        $(".nobleim").attr("src", "assets/img/logonouce.jpg")
        $("#chanVideo").attr("src", "assets/background.webm");
        $("#background-video")[0].load();
        $("#background-video")[0].play();

        $(".banner-bg1").css("background-image", "url(assets/img/par4.png)");
        $(".banner-bg2").css("background-image", "url(assets/img/par3.png)");
        $(".banner-bg3").css("background-image", "url(assets/img/par2.png)");

        $(".bg-image1").css("background-image", "url(assets/img/offer-bg.jpg)");
    }

};