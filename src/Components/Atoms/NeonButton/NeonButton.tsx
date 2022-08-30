import * as React from "react";
import {Box} from "@chakra-ui/react";
import {motion} from "framer-motion";

interface NeonButtonProps {
    onClick(): any
}

const NeonButton : React.FC<NeonButtonProps> = ({onClick}) => {
    console.log("onClick", onClick);
    return (
        <Box
            as={motion.div}
        >
            <div onClick={onClick} className={"neonButton"} spellCheck="false">Connect Wallet</div>
        </Box>
    )
}

export default NeonButton;

