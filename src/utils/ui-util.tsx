

function getDominantColor(source: string) {
    const myImg = new Image();
    myImg.crossOrigin = "Anonymous";
    myImg.onload = () => {
        const context = document.createElement('canvas').getContext('2d');
        // @ts-ignore
        context.drawImage(myImg, 0, 0);

        const {
            data
            // @ts-ignore
        } = context.getImageData(0, 0, 1, 1);
        // console.log("data", data);
    }
    myImg.src = source;
}

export {
    // getDominantColor
}