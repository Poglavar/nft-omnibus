import {
    Box,
    Center,
    HStack, Icon,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Portal,
    Text,
    VStack
} from "@chakra-ui/react";
import NeonText from "../Atoms/NeonText/NeonText";
import _ from "lodash";
import {OpenSeaIcon} from "../../Icons/Icon";
import * as React from "react";

interface TextViewWithHoverProps {
    data: {
        description: {
            desc: string,
            openSeaLink: string,
        },
        airdropCurrency: string,
        airdropNftName: string,
        airdropClaimPrice: number,
        airdropMintDate: string,
        airdropExpiryDate: string
    }
}

const TextViewWithHover: React.FC<TextViewWithHoverProps> = ({ data }) => {
    const { description: {desc, openSeaLink}, airdropCurrency, airdropNftName, airdropClaimPrice, airdropMintDate, airdropExpiryDate } = data;
    return (
        <Popover trigger={"hover"}>
            <Box w={"25vw"}>
                <PopoverTrigger>
                    <HStack marginX={"5"} alignItems={"flex-start"}>
                        <Center sx={{
                            width: 7,
                            height: 7,
                            borderRadius: 7*2,
                            border: "2px",
                            borderWidth: "2px",
                        }}>
                            <Text fontSize={"xl"} fontWeight={"600"} fontFamily={"Exo2"}>i</Text>
                        </Center>
                        <VStack alignItems={"flex-start"}>
                            <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Type: ${airdropCurrency}/${airdropNftName}`} />
                            <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Airdrop amount: ${1}`}/>
                            <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Claim price: ${_.round(airdropClaimPrice, 5)}`}/>
                            <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Mint date: ${airdropMintDate}`}/>
                            <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Expiry date: ${airdropExpiryDate}`}/>
                        </VStack>
                    </HStack>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent border={"0.5px"} borderColor={"white"} boxShadow={["0 0 1.25em #fff"]} borderRadius={"20"}>
                        <Box borderRadius={"20"} backgroundColor={"black"} boxSize={"inherit"} borderColor={"white"} border={"2px"} padding={"5"} boxShadow={["inset 0 0 1em 0 #fff"]}>
                            <Text>{desc}</Text>
                            <Link alignItems={"center"} marginTop={"5"} color={"cyan"} href={`${openSeaLink}`} isExternal><Icon as={OpenSeaIcon}/></Link>
                        </Box>
                    </PopoverContent>
                </Portal>
            </Box>
        </Popover>
    )
};

export default TextViewWithHover;