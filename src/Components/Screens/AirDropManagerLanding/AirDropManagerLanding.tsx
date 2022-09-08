import {
    Box,
    Center,
    Input,
    Text,
    useToast,
    FormControl,
    FormErrorMessage,
    Link
} from "@chakra-ui/react";
import _ from "lodash"

import {motion} from "framer-motion";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useGetAddressCollection} from "../../../services/queries/useGetAddressCollection";
import {useState} from "react";
import WholePageSpinner from "../../Molecule/WholePageSpinner";
import {validateAddress} from "../../../utils/validation-util";

const transition = { duration: 0.3, ease: "easeInOut"};
const MotionText = motion(Text)
const MotionBox = motion(Box)
const MotionLink = motion(Link)

const AirDropManagerLanding = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState<string>("")
    const [isError, setIsError] = useState<any>({});
    const toast = useToast();
    // check for update on setting dark mode inside ThemeConfig in theme.js
    localStorage.setItem('chakra-ui-color-mode', 'dark')
    const emptyArrayToast = "error-toast"
    const { isLoading, status, refetch, data} = useGetAddressCollection(input)
    // add address into the path when navigating to address overview

    const handleInputChange = (e:any) => {
        setInput(e.target.value)
        const validation = validateAddress(e)
        setIsError(validation)
    }
    const navigateToOverview = () => navigate(`/airdrop-manager-overview`, {
        state: {
            address: input
        },
    })

    const navigateToForms = () => navigate(`/airdrop-manager-forms`);

    // cekiraj pojavljivanje greske, zasto kad je prazno polje
    if ((status === "error" ||  (status === "success" && _.isEmpty(data))) && !toast.isActive(emptyArrayToast)) {
                    toast({
                        id: emptyArrayToast,
                        title: "Error!",
                        description: "Entered address is wrong or has no data",
                                status: 'error',
                                duration: 5000,
                                isClosable: true,
                            })
    }
    if(status === "success" && !_.isEmpty(data)) navigateToOverview();

    return (
        <Center
            flexDirection={"column"}
            marginTop={200}
        >
            <MotionLink
                position={"absolute"}
                top={"10"}
                right={"20"}
                as={motion.div}
                onClick={() => navigateToForms()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                fontSize={"2xl"} fontStyle={"italic"} fontWeight="100"
                textShadow={"0 0 0.125em #fff"} fontFamily={"Exo2"}
            >
                Import Forms
            </MotionLink>
            <MotionText as={motion.div}
                  initial={{ y: "10%", opacity: 0, scale: 0.7 }}
                  animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeInOut"}}}
                  exit={{ y: "-10%", scale: 1, opacity: 0, transition }}
                  fontSize={"5xl"} fontStyle={"italic"} fontWeight="100" textShadow={"0 0 0.125em #fff"} fontFamily={"Exo2"}
                  marginBottom={"20"}>Your place for every NFT airdrop</MotionText>
            <MotionBox
                initial={{ y: "10%", opacity: 0, scale: 0.7 }}
                animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeInOut", delay: 0.2}}}
                exit={{ y: "-10%", scale: 1, opacity: 0, transition }}
                marginBottom={"20"} h='calc(10vh)' w='calc(60vw)' borderRadius={20}
                boxShadow={["0 0 1.25em #fff"]}>
                    <FormControl h={"inherit"} w={"inherit"} isInvalid={isError.error} borderRadius={"inherit"} boxShadow={["inset 0 0 1.25em #fff"]} borderColor={"#fff"} >
                        <Input
                            value={input}
                            onChange={(e) => {
                                handleInputChange(e)
                            }}
                            onKeyPress={(e) => {
                            if(e.code === "Enter" || e.code === "NumpadEnter") refetch()
                            }}
                                       fontFamily={"Exo2"} _placeholder={{fontWeight: "500", textShadow: "0 0 0.07em #fff" }}
                                       fontSize={"xl"} h={"inherit"} w={"inherit"} borderRadius={"inherit"}
                                       fontStyle={"italic"}
                                       variant={"filled"} placeholder={"Enter address . . ."}/>
                        <FormErrorMessage marginLeft={4}>{isError.errorMessage}</FormErrorMessage>
                    </FormControl>
            </MotionBox>
            <MotionBox  initial={{ opacity: 0, }}
                        animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut", delay: 0.4}}}
                        exit={{ opacity: 0, transition }}>
                <div style={{fontSize: "2em"}} className={"neonButton"}>Connect Wallet</div>
            </MotionBox>
            {isLoading && <WholePageSpinner showParachute={true}/>}
        </Center>
    )
}

export default AirDropManagerLanding;
