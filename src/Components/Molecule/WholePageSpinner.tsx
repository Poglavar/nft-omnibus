import FallingParachute from "../Atoms/FallingParachute/FallingParachute";
import {Box, Center, Spinner} from "@chakra-ui/react";
import * as React from "react";

interface WholePageSpinnerProps {
    showParachute: boolean
}

const WholePageSpinner: React.FC<WholePageSpinnerProps> = ({showParachute}) => {

    return (
        <Center position={"absolute"}
                bg={"transparent"}
                backdropFilter="auto"
                backdropBlur={"sm"}
                boxSize={"full"}
        >
            {/*{showParachute &&*/}
            {/*       <Box>*/}
            {/*           <FallingParachute/>*/}
            {/*           <FallingParachute/>*/}
            {/*           <FallingParachute/>*/}
            {/*           <FallingParachute/>*/}
            {/*       </Box>*/}
            {/*}*/}
            <Spinner
                bg={"transparent"}
                thickness='7px'
                speed='0.65s'
                size='xl'
            />
        </Center>
    )
};

export default WholePageSpinner;