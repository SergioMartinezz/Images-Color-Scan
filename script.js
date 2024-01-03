const colorScan = document.getElementById("colorScan");
const fileInput = document.getElementById("file");
const image = document.getElementById("image");
const hexCode = document.getElementById("hexCode");
const rgbCode = document.getElementById("rgbCode");
const scannedColor = document.getElementById("scannedColor");

const initEyeDropper = () =>{
    if("EyeDropper" in window){
        colorScan.classList.remove("hide");
        const eyeDropper = new EyeDropper();

        colorScan.addEventListener("click", async () =>{
            try{
                const colorValue = await eyeDropper.open();
                const hexValue = colorValue.sRGBHex.toLowerCase();
                const rgbValue = hexToRgb(hexValue);

                result.style.display = "grid";
                hexCode.value = hexValue;
                rgbCode.value = rgbValue;

                scannedColor.style.backgroundColor = hexValue;
            }
            catch{
                alert("¡Error! Es posible que su navegador no sea compatible con la funcionalidad de esta página.");
            }
        });
    }
    else{
        alert("¡Error! Es posible que su navegador no sea compatible con la funcionalidad de esta página.");
    }
}

fileInput.addEventListener("change", () =>{
    result.style.display = "none";
    const reader = new FileReader();
    reader.onload = () => image.setAttribute("src", reader.result);
    reader.readAsDataURL(fileInput.files[0]);
});

const copyToClipboard = (textId) => {
    const textElement = document.getElementById(textId);
    textElement.select();
    document.execCommand("copy");
};

const hexToRgb = (hex) =>{
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
};

window.onload = initEyeDropper;
