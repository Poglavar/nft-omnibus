import {Icon, Box, keyframes} from "@chakra-ui/react";
import * as React from "react";
import {ParachuteWithCrateBlue, ParachuteWithCrate, ParachuteWithCratePurple, ParachuteWithCrateYellow, ParachuteWithCrateGreen} from "../../../Icons/Icon";
import {motion, useAnimation, useInView} from "framer-motion";
import {useEffect, useRef} from "react";

const MotionBox = motion(Box)
const height = window.innerHeight;
const width = window.innerWidth;

interface FallingParachuteProps {
    // xValue: number[],
    // yValue: number[],
    // duration: number,
};
// , ["-20deg", "40deg", "-10deg", "50deg", "-10deg", "-10deg"]
const zIndex = [-1, -2, -3];
const rotation = [["40deg", "-20deg", "40deg", "-20deg", "40deg", "10deg"]]
const leftPosition = [50, width/2, width * 2/3, width*3/4, width*2/5, width/3, width/4, width*4/5];
const delay = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5];
const xPosition = [50, 200, 80, 250, 80, 230]
const parachute = [<ParachuteWithCrate/>, <ParachuteWithCratePurple/>, <ParachuteWithCrateBlue/>, <ParachuteWithCrateYellow/>, <ParachuteWithCrateGreen/>]
const boxSize = [200, 100, 150, 20, 180]

const FallingParachute: React.FC<FallingParachuteProps> = () => {
    const ref = useRef(null)
    const isInView = useInView(ref);
    const controls = useAnimation();

    const randomZIndex = zIndex[Math.floor(Math.random()*zIndex.length)];
    const randomRotation = rotation[Math.floor(Math.random()*rotation.length)];
    const randomLeftPosition = leftPosition[Math.floor(Math.random()*leftPosition.length)];
    const randomDelay = delay[Math.floor(Math.random()*delay.length)];
    const randomParachute = parachute[Math.floor(Math.random()*parachute.length)];
    const randomBoxSize = boxSize[Math.floor(Math.random()*boxSize.length)];

    // useEffect(() => {
    //     if(!isInView) {
    //         controls.stop()
    //         controls.start({
    //             x: xPosition
    //         }, [])
    //     }
    // }, [isInView])

    return (
        <MotionBox
            ref={ref}
            boxSize={randomBoxSize}
            animate={{
                opacity: [0.5, 1, 1, 1, 1, 1],
                rotate: randomRotation,
                x: xPosition,
                y: [0, height / 4, height /2, height / 2 + height /4, height / 2 + height / 3, height + 200],
            }}
            transition={{
            duration: 10,
            ease: "easeInOut",
                delay: randomDelay
            }}
            position={"absolute"}
            zIndex={randomZIndex}
            left={randomLeftPosition}
        >
            {randomParachute}
        </MotionBox>
    )
}

// boxShadow={"0 0 10em #000"}

export default FallingParachute;