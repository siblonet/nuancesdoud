function getColorsFromImageData(imageData) {
    const colors = [];
    let or = [];
    let og = [];
    let ob = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

        // Skip transparent pixels
        if (a === 0) continue;

        // Convert RGB to HSL
        const hsl = rgbToHsl(r, g, b);

        // Check saturation and luminance thresholds
        if (hsl[1] > 0.7 && hsl[2] < 0.7) { // Adjust thresholds as needed
            const color = rgbToHex(r, g, b);
            let isDifferent = true;
            for (let co = 0; co < or.length; co++) {
                if (Math.abs(r - or[co]) <= 25 && Math.abs(g - og[co]) <= 25 && Math.abs(b - ob[co]) <= 25) {
                    isDifferent = false;
                    break; // No need to check further if a similar color is found
                }
            }
            if (isDifferent) {
                or.push(r);
                og.push(g);
                ob.push(b);
                colors.push(color);
            }
        }
    }

    return colors;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function displayColors(colors) {
    const colorsDiv = document.getElementById('colors');
    AutoChoosenColor = `${colors[0] ? colors[0] : '#000000'},${colors[1] ? colors[1] : '#000000'},${colors[2] ? colors[2] : '#000000'},${colors[3] ? colors[3] : '#000000'}`
    colorsDiv.innerHTML = '';
    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;

        // Add onclick function to each color box
        colorBox.onclick = function () {
            choosedColor(color);
        };

        colorsDiv.appendChild(colorBox);
    });
}

function choosedColor(color) {
    const choosenColor = document.getElementById('choosenColor');
    if (ChoosenColor.length < 4) {
        ChoosenColor.push(color);

        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;

        // Add onclick function to each color box
        colorBox.onclick = function () {
            RemoveColor(color);
        };

        choosenColor.appendChild(colorBox);

        // Update addcoul input field
        document.getElementById('addcoul').value += color + (ChoosenColor.length === 4 ? "" : ",");
    }
}

function RemoveColor(removedColor) {
    ChoosenColor = ChoosenColor.filter(color => color !== removedColor);
    const choosenColor = document.getElementById('choosenColor');
    document.getElementById('addcoul').value = "";
    choosenColor.innerHTML = '';
    ChoosenColor.forEach((color, index) => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;

        // Add onclick function to each color box
        colorBox.onclick = function () {
            RemoveColor(color);
        };

        choosenColor.appendChild(colorBox);

        // Update addcoul input field
        document.getElementById('addcoul').value += color + (index + 1 < ChoosenColor.length ? "," : ChoosenColor.length < 4 ? "," : "");
    });
}





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Function to load image from URL
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Function to load image from URL
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Function to load image from URL
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Function to load image from URL
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Function to load image from URL
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Function to load image from URL
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Function to load image from URL

function loadImageFromURL(url, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // This is necessary if the image is hosted on a different domain
    img.onload = function () {
        callback(img);
    };
    img.src = url;
}


function displayColorsA(colors) {
    const colorsDiv = document.getElementById('colorsa');
    AutoChoosenColor = `${colors[0] ? colors[0] : '#000000'},${colors[1] ? colors[1] : '#000000'},${colors[2] ? colors[2] : '#000000'},${colors[3] ? colors[3] : '#000000'}`

    colorsDiv.innerHTML = '';
    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;

        // Add onclick function to each color box
        colorBox.onclick = function () {
            choosedColorA(color);
        };

        colorsDiv.appendChild(colorBox);
    });
}

function choosedColorA(color) {
    const choosenColor = document.getElementById('choosenColora');
    if (ChoosenColor.length < 4) {
        ChoosenColor.push(color);

        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;

        // Add onclick function to each color box
        colorBox.onclick = function () {
            RemoveColorA(color);
        };

        choosenColor.appendChild(colorBox);

        // Update addcoul input field
        document.getElementById('editecoul').value += color + (ChoosenColor.length === 4 ? "" : ",");
    }
}

function RemoveColorA(removedColor) {
    ChoosenColor = ChoosenColor.filter(color => color !== removedColor);
    const choosenColor = document.getElementById('choosenColora');
    document.getElementById('editecoul').value = "";
    choosenColor.innerHTML = '';
    ChoosenColor.forEach((color, index) => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;

        // Add onclick function to each color box
        colorBox.onclick = function () {
            RemoveColorA(color);
        };

        choosenColor.appendChild(colorBox);

        // Update addcoul input field
        document.getElementById('editecoul').value += color + (index + 1 < ChoosenColor.length ? "," : ChoosenColor.length < 4 ? "," : "");
    });
}