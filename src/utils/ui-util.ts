// @ts-ignore
import analyze from 'rgbaster'

const getDominantColor = async (image: string) => {
    const imageColors = await analyze(image, { scale: 0.05 })
    return imageColors[0].color;
}

export {
    getDominantColor
}