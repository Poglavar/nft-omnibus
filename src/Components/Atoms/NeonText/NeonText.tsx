import * as React from "react";
import {Text} from "@chakra-ui/react";

interface NeonTextProps {
    textValue: string,
    fontSize: string,
    // fontWeight: string,
    // textShadow: string,
    marginBottom: string
}


const NeonText: React.FC<NeonTextProps> = ({textValue, marginBottom,fontSize})  => {

    return (
        <Text marginBottom={marginBottom} textShadow={"0 0 1em #000"} fontWeight={"600"} fontSize={fontSize}>{textValue}</Text>
    )
};

export default NeonText;