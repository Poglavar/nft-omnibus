import * as React from "react";
import {Box, Image} from "@chakra-ui/react";
// import {getDominantColor} from "../../../utils/ui-util"
// import { FastAverageColor } from 'fast-average-color';

// const fac = new FastAverageColor();
interface NeonImageProps {
    source: string
}

const NeonImage: React.FC<NeonImageProps> = ({source})  => {
    // const color = getDominantColor(source)
    // console.log("color", color);
    return (
        <Box position={"relative"}>
        <Image boxShadow={["0 0 1em 0 #69DD00"]} borderRadius={"20px"} boxSize={"200px"} src={source} />
            <Box position={"absolute"} bgColor={'#69DD00'} top={"80%"}
                 width={"100%"} height={"100%"} sx={{filter: 'blur(7em)', transform: [`scale(0.4, 0.1)`]}}/>
        </Box>
    )
};

export default NeonImage;