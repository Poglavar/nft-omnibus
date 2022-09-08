import {Box, Center, HStack, Icon, Text} from "@chakra-ui/react";
import {Fire, Merge, MobilePhone, ParachuteWithCrate} from "../../Icons/Icon";
import NeonImage from "../Atoms/NeonImage/NeonImage";
import * as React from "react";

interface CreationMethodProps {
    description: {
        type: string,
        image: string,
    }
}

const CreationMethod: React.FC<CreationMethodProps> = ({description}) => {
    const method = description.type;
    const image = description.image;

    // console.log("method", method, "image", image);

    switch (method) {
        case "burn":
            return (
                <HStack alignItems={"flex-start"}>
                    <Box boxSize={"50px"} >
                        <Icon as={Fire}/>
                    </Box>
                    <NeonImage source={image}/>
                </HStack>
            )
        case "combine":
            return (
                <HStack alignItems={"flex-start"}>
                    <Box boxSize={"50px"} position={"relative"}>
                        <Box position={"absolute"} left={"4"} top={"5"}>
                            <Icon as={Merge}/>
                        </Box>
                        <Icon as={MobilePhone}/>
                    </Box>
                    <NeonImage source={image}/>
                </HStack>

            )
        case "airdrop":
            return (
                <HStack fontFamily={"Exo2"} fontWeight={"800"} alignItems={"flex-start"}>
                    <Box boxSize={"50px"}>
                        <ParachuteWithCrate/>
                    </Box>
                    <Center borderRadius={"30px"} boxSize={"200px"}>
                        <Text fontSize={"9xl"}>?</Text>
                    </Center>
                </HStack>


            )
        default:
            return null

    }
};

export default CreationMethod;