import {
    Box,
    Center,
    Input,
    Text,
    Spinner,
    Modal,
    useDisclosure,
    useToast,
    FormControl,
    FormErrorMessage,
    Button,
    ModalContent
} from "@chakra-ui/react";
import _ from "lodash"
import { Formik, Field, Form } from 'formik';
import {motion} from "framer-motion";
import * as React from "react";
import {Navigate, useNavigate} from "react-router-dom";
import FallingParachute from "../../Atoms/FallingParachute/FallingParachute";
import {useGetAddressCollection} from "../../../services/useGetAddressCollection";
import {useEffect, useState} from "react";
import {isEmpty} from "../../../utils/helper-util";

const height = window.innerHeight;
const width = window.innerWidth;

const transition = { duration: 0.3, ease: "easeInOut"};
const landingVariants = {
    initial: { y: "10%", opacity: 0, scale: 0.7 },
    animate: { y: 0, opacity: 1, scale: 1, transition},
    exit: { y: "-10%", scale: 1, opacity: 0, transition }
}

const MotionText = motion(Text)
const MotionBox = motion(Box)
// const MotionCenter = motion(Center)
const parachuteIterrateArray = [1, 2, 3]

const AirDropManagerLanding = () => {
    const navigate = useNavigate();
    // const {onClose} = useDisclosure()
    const [input, setInput] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const toast = useToast();
    const emptyArrayToast = "error-toast"
    const { isLoading, status, refetch, data} = useGetAddressCollection(input)

    const handleInputChange = (e:any) => setInput(e.target.value)
    const navigateTo = () => navigate(`/airdrop-manager-overview`, {
        state: {
            address: input
        },
    })

    if (_.isEmpty(data) && status === "success" && !toast.isActive(emptyArrayToast)) {
                    toast({
                        id: emptyArrayToast,
                        title: "Error!",
                        description: "Entered address is wrong or has no data",
                                status: 'error',
                                duration: 5000,
                                isClosable: true,
                            }, )
    }
    if(status === "success" && !_.isEmpty(data)) navigateTo();

    const validateAddress = (e: any) => {
        let value = e.target.value
        if (value.slice(0, 2) !== "0x" && value.length > 0) {
            setErrorMessage('First two characters should be 0x')
        } else if (value.length === 0) {
            return setIsError(false)
        } else if (value.length < 42 || value.length > 42 && value.length !== 0) {
            setErrorMessage("Address should have 42 characters!")
        } else if ( value.length === 42) {
            return setIsError(false)
        }
        return setIsError(true)
    }

    return (
        <Center
            flexDirection={"column"}
            marginTop={200}
        >
            {/*<FallingParachute/>*/}
            {/*<FallingParachute/>*/}
            {/*<FallingParachute/>*/}
            {/*<FallingParachute/>*/}
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
                    <FormControl h={"inherit"} w={"inherit"} isInvalid={isError} borderRadius={"inherit"} boxShadow={["inset 0 0 1.25em #fff"]} borderColor={"#fff"} >
                        <Input
                            value={input}
                            onChange={(e) => {
                                handleInputChange(e)
                                validateAddress(e)
                            }}
                            onKeyPress={(e) => {
                            if(e.code === "Enter" || e.code === "NumpadEnter") refetch()
                            }}
                                       fontFamily={"Exo2"} _placeholder={{fontWeight: "500", textShadow: "0 0 0.07em #fff" }}
                                       fontSize={"xl"} h={"inherit"} w={"inherit"} borderRadius={"inherit"}
                                       fontStyle={"italic"}
                                       variant={"filled"} placeholder={"Enter address . . ."}/>
                        <FormErrorMessage marginLeft={4}>{errorMessage}</FormErrorMessage>
                    </FormControl>
            </MotionBox>
            <MotionBox  initial={{ opacity: 0, }}
                        animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut", delay: 0.4}}}
                        exit={{ opacity: 0, transition }}>
                <div style={{fontSize: "2em"}} className={"neonButton"}>Connect Wallet</div>
            </MotionBox>
            {isLoading && <Center position={"absolute"}
                                  bg={"transparent"}
                                  backdropFilter="auto"
                                  backdropBlur={"sm"}
                                  boxSize={"full"}
            >
                <Spinner
                    bg={"transparent"}
                    thickness='7px'
                    speed='0.65s'
                    size='xl'
                />
            </Center>}
        </Center>
    )
}

export default AirDropManagerLanding;
