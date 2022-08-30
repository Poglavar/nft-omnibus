import * as React from "react";
import "../../Atoms/NeonButton/NeonButton.css";
import "../../Atoms/NeonButton/NeonButton"
import _ from "lodash";
import {
    chakra,
    Button,
    Center,
    HStack,
    Icon,
    Image,
    List,
    ListItem,
    Popover, Box, PopoverContent, Portal, PopoverTrigger, Link,
    useDisclosure, Text, VStack, useColorMode, InputGroup, InputLeftElement, Input, Collapse, SlideFade
} from "@chakra-ui/react";
import {
    AddIcon,
    ExternalLinkIcon,
    InfoIcon,
    ArrowRightIcon, SearchIcon
} from '@chakra-ui/icons'

import apePic from "../../../Images/bayc-racism_feature.jpeg";
import mutant from "../../../Images/mutant.png";
import coolCat from "../../../Images/cool_cat.jpeg";
import coolPet from "../../../Images/coolPet.jpeg";
import bat from "../../../Images/cryptobatz.jpeg";
import mutantBat from "../../../Images/mutantBat.png";
import burn from "../../../Images/burn.png";
import airdrop from "../../../Images/baloon_red_yellow.png";
import kennel from "../../../Images/kennel.png";
import {MobileWallet} from "../../../Icons/Icon";
import NeonButton from "../../Atoms/NeonButton/NeonButton";
import NeonBtn from "../../Molecule/NeonBtn/NeonBtn";
import NeonText from "../../Atoms/NeonText/NeonText";
import NeonImage from "../../Atoms/NeonImage/NeonImage";
import {useEffect, useState} from "react";
import {motion, useCycle} from "framer-motion";
import {useGetAddressCollection} from "../../../services/useGetAddressCollection";
import {useLocation, useNavigate} from "react-router-dom";

interface airdropData {
    genesisCollection: string,
    airDropCollection: string,
    description: {
        link: string,
        text: string
    },
    type: string,
    mintDate: string,
    expiryDate: string,
    airDropAmount: string,
    claimPrice: string,
    creationMethod: string,
    combineNft: string,
}

const airDropData: airdropData[] = [
    {
        genesisCollection: apePic,
        airDropCollection: mutant,
        description: {
            link: "https://boredapeyachtclub.com/#/mayc",
            text: "Mutantzzzz are gonna rule the world, just you watch. And when they come, all will be well, Heaven on Earth. When all is said and done, truth will open our eyes and we will know that humans were the error, parasite and equilibrium nullifiers."
        },
        type: "NFT",
        mintDate: "11.3.2022",
        expiryDate: "20.4.2022",
        airDropAmount: "1",
        claimPrice: "Reverse Dutch Auction",
        creationMethod: "burn",
        combineNft: ""
    },
    {
        genesisCollection: coolCat,
        airDropCollection: coolPet,
        description: {
            link: "https://twitter.com/fishyfamNFT/status/1555284808288374790?s=20&t=Au1V8VH2jmDo0pTWdCU8ZQ",
            text: "Ne verujte ljudima koji imaju macke za kucne ljubimce...."
        },
        type: "NFT",
        mintDate: "25.5.2022",
        expiryDate: "20.4.2022",
        airDropAmount: "1",
        claimPrice: "Gas Only",
        creationMethod: "airdrop",
        combineNft: ""
    },
    {
        genesisCollection: mutant,
        airDropCollection: mutantBat,
        description: {
            link: "https://worldofwomen.art/wow-galaxy.html",
            text: "Zene su najjace na svetu, svaka fensi riba gej ortaka ima, u kineskom pismu znak za svadju su dva znaka zene. PAMETNOM DOSTA!!! "
        },
        type: "ERC20",
        mintDate: "30.1.2022",
        expiryDate: "20.4.2022",
        airDropAmount: "10$Bait",
        claimPrice: "Gas Only",
        creationMethod: "combine",
        combineNft: bat
    },
    {
        genesisCollection: apePic,
        airDropCollection: kennel,
        description: {
            link: "https://onchainmonkey.com/collection/ocm-dessert",
            text: "..."
        },
        type: "NFT",
        mintDate: "20.4.2022",
        expiryDate: "20.4.2022",
        airDropAmount: "1",
        claimPrice: "Gas Only",
        creationMethod: "airdrop",
        combineNft: ""
    },
    // {
    //     genesisCollection: apePic,
    //     airDropCollection: threeDPrinter,
    //     description: {
    //         link: "https://onchainmonkey.com/collection/ocm-dessert",
    //         text: "..."
    //     },
    //     type: "ERC20",
    //     mintDate: "6.6.2022",
    //     expiryDate: "20.4.2022",
    //     airDropAmount: "1",
    //     claimPrice: "0 ETH"
    // }
]

const TextViewWithHover = (prop: any) => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}

    const { text, link } = prop.description;
    const numberOfLetters = 140;
    const textForChange = text
    const shortenedText = textForChange.slice(0, numberOfLetters) + "..."

    return (
        <Box width={"25vw"}>
            <Popover trigger={"hover"}>
                <PopoverTrigger>
                    <HStack>
                        <Icon as={InfoIcon} w='22px' h='22px' flexShrink={0} />
                        <Text>{shortenedText}</Text>
                    </HStack>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent padding={"10"} borderRadius={"20"} backgroundColor={"lightgrey"}>
                        <Text>{text}</Text>
                        <Link alignItems={"center"} marginTop={"5"} color={"blue"} href={`${link}`} isExternal>Link <ExternalLinkIcon mx={"2px"}/></Link>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Box>
    )
}

const CreationMethod = (prop: any) => {
    const method = prop.method.creationMethod;
    const combined = prop.method.combineNft
    switch (method) {
        case "burn":
    return (
        <HStack width={"15vw"} justifyContent={"space-around"}>
            <VStack marginRight={"5"}>
                <Box borderRadius={"20"} border={"2px"} padding={"3"}>
                    Token V1
                </Box>
                <Box borderRadius={"20"} border={"2px"} padding={"3"}>
                    Token V2
                </Box>
                <Box borderRadius={"20"} border={"2px"} padding={"3"}>
                    Token V3
                </Box>
            </VStack>
            <Image boxSize={"50px"} src={burn}/>
        </HStack>
    )
        case "combine":
            return (
                <HStack width={"15vw"} justifyContent={"center"}>
                    <Image borderRadius={"10"} boxSize={"150px"} src={combined}/>
                </HStack>
            )
        case "airdrop":
            return (
                <HStack width={"15vw"} justifyContent={"center"}>
                    <Image boxSize={"150px"} src={airdrop}/>
                </HStack>
            )
        default:
            return null

    }
}

// const itemsAnimation = {
//     initial: {scale: 0.8},
//     animate: { scale: 1, transition: { staggerChildren: 0.2 } },
//     exit: { opacity: 0, transition: { staggerChildren: 0.2 } }
// }

const itemsAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}
const transition = { duration: 0.3, ease: "easeInOut"};
const MotionBox = motion(Box);
const MotionText = motion(Text);

interface nftObject {
    nft_content_url: string,
    nft_number: number,
    collection: {
        type: string,
        mint_begin_date: string,
        mint_end_date: string,
        mint_price: string,
    },
    drops: [{
            name: string,
            id: string,
            children: [{
                parentid: string,
                name: string,
                id: number,
                children: [{
                    action: string,
                    name: string,
                    length: number,
                }]
            }]
    }],
};

interface airdrop {
    airdropNft: string,
    airdroppedNftData: string
};

interface airdroppedNftData {

}

const AirDropManagerOverview = () => {
    const [ isWalletConnected, setIsWalletConnected ] = useCycle<boolean>(false, true)
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const location = useLocation();
    const [collection, setCollection] = useState({})
    // @ts-ignore location.state.address

    const { data: addressCollection } = useGetAddressCollection(location.state.address)

    console.log("addressCollection", addressCollection);

    useEffect(() => {
        if(!_.isEmpty(addressCollection)) setCollection(getData(addressCollection))
    }, [addressCollection])

    const getData = (coll: []) =>  {
        // let airDropArray: any = []
        let nftAirDropArray: any = []
        let count: number = 0
        let deepCount: number = 0
        return coll.map((nft: nftObject, i) => {
            let airdropDataObject: any = {}
            let dropDataArray: any = [];
            let dropDataObject: any = {};
            airdropDataObject[i] = {
                    nftKey: nft.nft_number,
                    usersNftImage: nft.nft_content_url,
                    airdropCurrency: nft.collection.type,
                    mintDate: nft.collection.mint_begin_date,
                    expiryDate: nft.collection.mint_end_date,
                    claimPrice: nft.collection.mint_price,
            }
            nft.drops.map((dropType,n) => {
                count++
                nftAirDropArray.push({
                                    ...airdropDataObject[i],
                                    airdropNftName: dropType.name,
                                    airdropNftId: dropType.id,
                                })
                if(dropType.children.length === 1) {
                        nftAirDropArray[count-1].airdropType = "airdrop";
                        nftAirDropArray[count-1].airdropRequirement1 = dropType.children[0].name
                    return
                }
                dropType.children.map((droppedChild, z) => {
                    console.log("i", i, "z", z, "n", n);
                    if(droppedChild.children.length === 1) {
                        dropDataObject[z] = {
                            airdropRequirement1: droppedChild.children[z].name,
                            airdropType: "airdrop"
                        }
                            // dropDataArray[z].push({
                            //     airdropRequirement1: droppedChild.children[z].name,
                            //     airdropType: "airdrop",
                            // })
                        }
                    if(droppedChild.children && droppedChild.children.length >= 2) {
                            droppedChild.children.map((grandChild, y) => {
                                dropDataObject[z] = {
                                    [`airdropRequirement${y + 1}`] : grandChild.name,
                                    airdropType: grandChild.action ? "burn" : "combine"
                                }
                                // dropDataObject[`airdropRequirement${y + 1}`] = grandChild.name
                                // dropDataObject.airdropType = grandChild.action ? "burn" : "combine"
                                // dropDataArray.push({
                                //     [`airdropRequirement${y + 1}`] : grandChild.name,
                                //     airdropType : grandChild.action ? "burn" : "combine"
                                // })
                            })
                        }
                    console.log("11111111111",dropDataObject);
                    // console.log( "22222222ss2222", nftAirDropArray[i])
                });
                console.log("33333333333");
            })
            // console.log(nftAirDropArray);
        })
    }

    // console.log("collection", collection);

    // klikom na claim potencijalni scenariji
    // onClick={() => deleteCollection(id, { onSuccess: () => console.log("open modal"), onError: () => console.log()})}


    return (
        <Center flexDirection={"column"}>
            <HStack marginY={"10"} width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                <MotionBox
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut", delay: 0.2}}}
                    exit={{ opacity: 0, transition }}
                    h='calc(7vh)' w='calc(30vw)' borderRadius={20}
                    boxShadow={["0 0 1.25em #fff"]}>
                    {/*<InputGroup h='calc(10vh)' w='calc(60vw)' borderRadius={20} boxShadow={["0 0 1.25em #fff"]}>*/}
                    {/*<InputLeftElement className={"InputLeft"} children={<SearchIcon w={"8"} h={"8"}/>}/>*/}
                    <Input fontFamily={"Exo2"} _placeholder={{fontWeight: "500", textShadow: "0 0 0.07em #fff" }}
                           fontSize={"xl"} h={"inherit"} w={"inherit"} borderRadius={20}
                           borderColor={"#fff"} fontStyle={"italic"} boxShadow={["inset 0 0 1.25em #fff"]}
                           variant={"filled"} placeholder={"Search for specific ID . . ."}/>
                    {/*</InputGroup>*/}
                </MotionBox>
                    <Text
                        fontSize={"2xl"} fontStyle={"italic"} fontWeight="100"
                        textShadow={"0 0 0.125em #fff"} fontFamily={"Exo2"}
                        marginBottom={"auto"}>You have 4 airdrops/ $500 waiting
                    </Text>

                <MotionBox
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut", delay: 0.4}}}
                    exit={{ opacity: 0, transition }}
                >
                    <div className={"neonButton"}>0x23...4387</div>
                </MotionBox>
            </HStack>
                <List paddingTop={"5"} maxHeight={"100vh"}>
                    {airDropData.map( (transaction, i) => {
                        return (
                            <ListItem as={motion.div}
                                      initial={{ y: "10%", opacity: 0, scale: 0.9 }}
                                      animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeInOut", delay: i * 0.1}}}
                                      exit={{ y: "-10%", scale: 1, opacity: 0, transition: { duration: 0.2, ease: "easeInOut"} }}
                                      onClick={() => setIsWalletConnected()} marginTop={i !== 0 ? "40" : "0" }>
                                <HStack alignItems={"center"} justifyContent={"space-around"} onClick={() => console.log("trt")}  minWidth={"200px"}
                                    //         _hover={{
                                    //     bg: colorMode === "light" ? "gray.200" : "gray.600",
                                    //     borderRadius: 20
                                    // }}
                                >
                                    <Box position={"relative"} >
                                        <Image boxShadow={["0 0 1em 0 #00ECB3"]} borderRadius={"30px"} boxSize={"200px"} src={transaction.genesisCollection}/>
                                        <Box position={"absolute"} bgColor={'#00ECB3'} top={"80%"}
                                             width={"100%"} height={"100%"} sx={{filter: 'blur(7em)', transform: [`scale(0.4, 0.1)`]}}/>
                                    </Box>
                                    <Icon width={"50px"} height={"30px"} as={AddIcon}/>
                                    <CreationMethod method={transaction}/>
                                    <Icon width={"50px"} height={"30px"} as={ArrowRightIcon}/>
                                    <HStack width={"25vw"} justifyContent={"space-between"}>
                                        <Box position={"relative"}>
                                            <VStack alignItems={"flex-start"}>
                                                <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Type: ${transaction.type}`} />
                                                <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Airdrop amount: ${transaction.airDropAmount}`}/>
                                                <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Claim price: ${transaction.claimPrice}`}/>
                                                <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Mint date: ${transaction.mintDate}`}/>
                                                <NeonText marginBottom={"0"} fontSize={"md"} textValue={`Expiry date: ${transaction.expiryDate}`}/>
                                            </VStack>
                                            {/*<Box position={"absolute"} bgColor={'#fff'} top={"80%"} right={"10%"} width={"100%"} height={"100%"} sx={{filter: 'blur(7em)', transform: [`scale(0.4, 0.1)`]}}/>*/}
                                        </Box>
                                        <NeonImage source={transaction.airDropCollection}/>
                                    </HStack>

                                    {/*<Icon width={"30px"} height={"30px"} as={ArrowRightIcon}/>*/}
                                    <TextViewWithHover description={transaction.description}/>
                                    <Box position={"relative"} boxShadow={["0 0 1.25em #fff"]} borderRadius={"10"}>
                                        <Button onClick={() => toggleColorMode} color={'#fff'} borderColor={"#fff"}
                                                textShadow={"0 0 0.5em #fff"} bgColor={"gray.800"} border={"2px"}
                                                inset={"lg"} boxShadow={["inset 0 0 1em 0 #fff"]} fontSize={"1xl"}
                                                size={"lg"}>
                                            Claim
                                        </Button>
                                        <Box position={"absolute"} bgColor={'#fff'} top={"330%"}
                                             width={"100%"} height={"100%"}
                                             sx={{filter: 'blur(2em)', transform: [`scale(0.75, 0.25)`]}}/>
                                    </Box>
                                    {/*<NeonButton/>*/}
                                    {/*<NeonBtn/>*/}
                                </HStack>
                            </ListItem>
                        )
                    })}
                </List>
    </Center>
                )
    }
    export default AirDropManagerOverview;