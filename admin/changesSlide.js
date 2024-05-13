async function ChangeSlade() {
    const items = await GetSettings();
    annoncePers = items;

    if (items && items.length > 0) {

        $("#logointerne").attr("src", `${items.find(item => item.which === "logointern") ? items.find(item => item.which === "logointern").image : "./assets/img/logo.png"}`);

    } else {
        $("#logointerne").attr("src", "./assets/img/logo.png");
    };

};
ChangeSlade()

const changeIcons = (event, which, idvalue) => {
    const slideaid = document.getElementById(idvalue).value;
    SladeLoading(which);
    const chanBack = document.getElementById(which).style.backgroundImage;

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const base64Data = e.target.result.split(',')[1];
            sendAnnonce(base64Data, file.name, which, slideaid, chanBack, "image");
            $(`#${which}`).css("background-image", `url(${e.target.result})`);

        };
        reader.readAsDataURL(file);
    };

}



const deleteAnnonce = async (idvalue) => {
    const slideaid = document.getElementById(idvalue).value;
    await requesttoBackend('POST', `boutique/deleteannonce/annonce/${slideaid}`, {});
    initDataLoader();
}

const changeSlade = (event, which, idvalue) => {
    const slideaid = document.getElementById(idvalue).value;
    SladeLoading(which);
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const base64Data = e.target.result.split(',')[1];
            if (which === "baVdeo") {
                checkVideoDuration(file, base64Data, which, slideaid, "chanVideo", "id");

                $("#chanVideo").attr("src", videoElement.src);
                $("#baVdeo")[0].load();
                $("#baVdeo")[0].play();
                $(".loadavideo").css("display", "none");
            } else {
                const chanBack = document.getElementById(which).style.backgroundImage;

                sendAnnonce(base64Data, file.name, which, slideaid, chanBack, "image");

                $(`#${which}`).css("background-image", `url(${e.target.result})`);
            }
            // Check video duration
        };

        reader.readAsDataURL(file);
    }
};

function checkVideoDuration(file, base64Data, which, anonceid, chanVideoid, ido) {
    const maxDurationInSeconds = 10; // Set your desired maximum duration in seconds

    const videoElement = document.createElement('video');
    document.body.appendChild(videoElement); // You can append it to the desired container or element

    videoElement.src = URL.createObjectURL(file);

    videoElement.addEventListener('loadedmetadata', function () {
        if (videoElement.duration > maxDurationInSeconds) {
            alert('La video selectionné depasse ' + maxDurationInSeconds + ' seconds.');
            $("#videoChange").val('');
            videoElement.src = '';
            document.body.removeChild(videoElement);
        } else {
            sendAnnonce(base64Data, file.name, which, anonceid, chanVideoid, ido);

            document.body.removeChild(videoElement);
        }
    });

    videoElement.addEventListener('durationchange', function () {
        // This event will be fired when the duration of the video changes (e.g., when the metadata is loaded)
        // You can use it to check the video duration as well
    });
}




const SladeLoading = (which) => {
    if (which === "baVdeo") {

        $(".loadavideo").css("display", "block");

    } else {
        $(`#${which}`).css("background-image", "url(admin/assets/loadingc.gif)");

    }

}


async function sendAnnonce(base64Data, fileName, which, anonceid, iddata, contint) {
    if (contint === "id" && document.getElementById(`${iddata}`).src.startsWith("https")) {
        const imagePreview = document.getElementById(`${iddata}`);
        if (await DeleteAnnonceImage(imagePreview.src)) {
            const response = await fetch(apiUrlfine + `boutique/annonce/nuance/${anonceid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ima: base64Data, nam: fileName, which: which, old_image: null }),
            });

            if (!response.ok) {
                alert('Error sending announcement:', response.statusText);
            }
        }
    } else if (contint === "image" && iddata.startsWith("https")) {
        if (await DeleteAnnonceImage(iddata)) {
            const response = await fetch(apiUrlfine + `boutique/annonce/nuance/${anonceid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ima: base64Data, nam: fileName, which: which, old_image: null }),
            });

            if (!response.ok) {
                alert('Error sending announcement:', response.statusText);
            }
        }
    } else {
        const response = await fetch(apiUrlfine + `boutique/annonce/nuance/${anonceid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ima: base64Data, nam: fileName, which: which, old_image: null }),
        });

        if (!response.ok) {
            alert('Error sending announcement:', response.statusText);
        }
    }
}


const DeleteAnnonceImage = async (imagetagid) => {
    try {
        const del_url = await requesttoBacken('POST', 'boutique/deleteImage', { image_url: imagetagid });
        if (del_url.done) {
            return true;
        }
    } catch (error) {
        alert("Error deleting image:");
        console.error("Error deleting image:", error);
        return false;
    }

};