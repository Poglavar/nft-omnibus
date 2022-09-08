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
        <Text  marginBottom={marginBottom} fontWeight={"600"} fontFamily={"Exo2"} textShadow={"0 0 0em #fff"} fontSize={fontSize}>{textValue}</Text>
    )
};

export default NeonText;