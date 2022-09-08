import * as React from "react";
import _ from "lodash";
import {
    Button,
    Center,
    HStack,
    Icon,
    List,
    ListItem,
    Box, Link,
    Flex, Text, Input,
} from "@chakra-ui/react";
import {
    AddIcon,
    ArrowRightIcon
} from '@chakra-ui/icons'

import NeonImage from "../../Atoms/NeonImage/NeonImage";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useGetAddressCollection} from "../../../services/queries/useGetAddressCollection";
import {useLocation} from "react-router-dom";
import CreationMethod from "../../Molecule/CreationMethod";
import TextViewWithHover from "../../Molecule/TextWithHover";
import "../../Atoms/NeonButton/NeonButton.css";
import "../../Atoms/NeonButton/NeonButton"
import { mapCollectionData, getMethodData } from "../../../utils/collectionDataMapping-util";
import WholePageSpinner from "../../Molecule/WholePageSpinner";
import {Fire} from "../../../Icons/Icon";

const transition = { duration: 0.3, ease: "easeInOut"};
const MotionBox = motion(Box);
const MotionText = motion(Text);

const AirDropManagerOverview = () => {
    const location = useLocation();
    // @ts-ignore
    const userAddress = location.state.address
    const { data: addressCollection, refetch } = useGetAddressCollection(userAddress)
    const [collection, setCollection] = useState<any>([]);
    const [filteredCollection, setFilteredCollection] = useState([])
    const [input, setInput] = useState<string>("")
    const [currentWord, setCurrentWord] = useState(0);

    const airDropTotalValue = collection.reduce((prev: number, curr: {airdropFloorPrice: string}) => {
        return prev + Number(curr.airdropFloorPrice)
    }, 0)

    const animatedValueText = [`${collection.length} airdrops`, `${_.round(airDropTotalValue, 2)} ETH`]

    // console.log("addressCollection", addressCollection);

    useEffect(() => {
        // stavi loader kada fetchuje podatke i vidi da optimizujes pozive...
        if(_.isEmpty(addressCollection)) refetch()
        let i = 0;
        const interval = setInterval(() => {
            if (i === animatedValueText.length) {
                setCurrentWord(0);
                i = 0;
            } else setCurrentWord(i);
            i++;
        }, 3000);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if(!_.isEmpty(addressCollection)) setCollection(mapCollectionData(addressCollection))
    }, [addressCollection])

    useEffect(() => {
        filterCollection(input);
    }, [input, collection]);

    const handleInputChange = (e:any) => setInput(e.target.value)

    const filterCollection = (text: any) => {
        if(text === undefined || text === "") setFilteredCollection(collection)
        const filColl = collection.filter((nft: any) => nft.nftKey.toString().includes(text))
        return setFilteredCollection(filColl)
    }

    // console.log("ADDRES", filteredCollection);

    return (
        <Center>
            <Flex zIndex={1} bg={"black"} as={"header"} position={"fixed"} top={0} justifyContent={"space-around"} h={"12.5%"} w={"100%"} alignItems={"center"}>
                <MotionBox
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut", delay: 0.2}}}
                    exit={{ opacity: 0, transition }}
                    h='calc(7vh)' w='calc(30vw)' borderRadius={20}
                    boxShadow={["0 0 1.25em #fff"]}>
                    <Input value={input}
                            onChange={(e) => {
                                handleInputChange(e)
                            }}
                            fontFamily={"Exo2"} _placeholder={{fontWeight: "500", textShadow: "0 0 0.07em #fff" }}
                           fontSize={"xl"} h={"inherit"} w={"inherit"} borderRadius={20}
                           borderColor={"#fff"} fontStyle={"italic"} boxShadow={["inset 0 0 1.25em #fff"]}
                           variant={"filled"} placeholder={"Search for specific ID . . ."}/>
                </MotionBox>
                   <HStack>
                       <Text
                           fontSize={"2xl"} fontStyle={"italic"} fontWeight="100"
                           textShadow={"0 0 0.125em #fff"} fontFamily={"Exo2"}
                       >You have pending</Text>
                           <MotionText w={"13vw"} fontSize={"2xl"} fontStyle={"italic"} fontWeight="100"
                                       textShadow={"0 0 0.125em #fff"} fontFamily={"Exo2"}>{animatedValueText.map((text: string, i: number) => {
                                       return (
                                           i === currentWord ? (
                                               <MotionText
                                                   transition={{
                                                       duration: Infinity,
                                                   }}
                                                   key={i}
                                               >{text}</MotionText>
                                           ) : null
                                       )
                                   }
                               )}</MotionText>
                   </HStack>

                <MotionBox
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut", delay: 0.4}}}
                    exit={{ opacity: 0, transition }}
                >
                    <div className={"neonButton"}>{`${userAddress.substring(0,4)}...${userAddress.substring(userAddress.length-4)}`}</div>
                </MotionBox>
            </Flex>
                <List justifyContent={"space-around"} marginY={"40"}>
                    {filteredCollection.map( (c: any, i: number) => {
                        const method = getMethodData(c);
                        return (
                            <ListItem key={`${c.nftKey+i}`} as={motion.div}
                                      initial={{ y: "10%", opacity: 0, scale: 0.9 }}
                                      animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeInOut", delay: i * 0.1}}}
                                      exit={{ y: "-10%", scale: 1, opacity: 0, transition: { duration: 0.2, ease: "easeInOut"} }}
                                      onClick={() => console.log("kliknuo si polje")}
                                      marginTop={i !== 0 ? 40 : 0 }>
                                <HStack alignItems={"center"} justifyContent={"space-around"} onClick={() => console.log("trt")}  minWidth={"200px"}>
                                    {method.additionalType === "burn" ?
                                        <Box position={"relative"} alignItems={"flex-start"}>
                                            <NeonImage source={c.nftUserImage}/>
                                            <Box position={"absolute"} left={"-59"} top={"0"} boxSize={"50px"}>
                                                <Icon as={Fire}/>
                                            </Box>

                                        </Box>
                                        :
                                        <Box position={"relative"}>
                                            <NeonImage source={c.nftUserImage}/>
                                        </Box>
                                    }
                                    <HStack w={"40vw"}>
                                        <Icon width={"80px"} height={"30px"} as={AddIcon}/>
                                        <CreationMethod description={method}/>
                                        <Icon width={"90px"} height={"30px"} as={ArrowRightIcon}/>
                                        <NeonImage source={c.airdropCollectionImage}/>
                                    </HStack>


                                    <TextViewWithHover data={c}/>
                                    <Box position={"relative"} boxShadow={["0 0 1.25em #fff"]} borderRadius={"10"}>
                                        <Button onClick={() => console.log("Klejma nema")} color={'#fff'} borderColor={"#fff"}
                                                textShadow={"0 0 0.5em #fff"} bgColor={"gray.800"} border={"2px"}
                                                inset={"lg"} boxShadow={["inset 0 0 1em 0 #fff"]} fontSize={"1xl"}
                                                size={"lg"}>
                                            <Link textShadow={"0 0 0.5em #fff"} color={"white"} fontFamily={"Exo2"} alignItems={"center"} href={`${c.description.link}`} isExternal>Claim</Link>
                                        </Button>
                                        <Box position={"absolute"} bgColor={'#fff'} top={"230%"}
                                             width={"100%"} height={"100%"}
                                             sx={{filter: 'blur(2em)', transform: [`scale(0.75, 0.25)`]}}/>
                                    </Box>
                                </HStack>
                            </ListItem>
                        )
                    })}
                </List>
            {!addressCollection && <WholePageSpinner showParachute={false}/>}
    </Center>
                )
    }
    export default AirDropManagerOverview;