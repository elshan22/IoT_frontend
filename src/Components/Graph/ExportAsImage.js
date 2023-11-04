
import html2canvas from "html2canvas";
const exportAsImage = async (el, imageFileName) => {
    const canvas = await html2canvas(el,{
        background:'#b22626',
    });
    canvas.style.backgroundImage = el.style.backgroundImage
    canvas.blur()
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(el,image, imageFileName);
};
const downloadImage = (el,blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = `display:none;`;
    // fakeLink.style.backgroundImage =el.style.backgroundImage;
    console.log("fakeLink.style")
    console.log(fakeLink.style)
    console.log(el.style.backgroundImage)
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
};

export default exportAsImage;