import {Box, Button, VStack, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import NeonText from "../Atoms/NeonText/NeonText";
import {usePostCollectionForm} from "../../services/queries/usePostCollectionForm";
import NeonMotionBox from "../Molecule/NeonInput";
import * as React from "react";
import NeonInput from "../Molecule/NeonInput";
import {ERROR_MESSAGES} from "../../CONSTANTS/string_constants";

interface Inputs {
    deployed_at: string,
    creator: string,
    type: string,
    is_variant: boolean,
    name: string,
    short_name: string,
    issuer: string,
    description: string
    chain: string,
    contract_address: string,
    base_uri: string,
    etherscan: string,
    opensea: string,
    website: string,
    twitter: string,
    min_mint_number: number | string,
    max_mint_number: number | string,
    mint_begin_date: string,
    mint_end_date: string,
    mint_currency: string,
    mint_price: number | string,
    items_in_collection: number | string,
    fixed_number_of_items: boolean,
    collection_image: string,
    api_key: string,
}


const CollectionForm = () => {
     const { mutate, isLoading } = usePostCollectionForm()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            deployed_at: "",
            creator: "",
            type: "",
            is_variant: false,
            name: "",
            short_name: "",
            issuer: "",
            description: "",
            chain: "",
            contract_address: "",
            base_uri: "",
            etherscan: "",
            opensea: "",
            website: "",
            twitter: "",
            min_mint_number: 0,
            max_mint_number: 0,
            mint_begin_date: "",
            mint_end_date: "",
            mint_currency: "",
            mint_price: 0,
            items_in_collection: 0,
            fixed_number_of_items: false,
            collection_image: "",
            api_key: "",
        }
    });


    const onSubmit: SubmitHandler<Inputs> = (data) => mutate(data);
    return (
        <VStack>
                    <form>
                        <SimpleGrid marginBottom={"20"} columns={4} spacing='40px'>
                            <NeonInput label={"Issuer"} register={register} id={"issuer"} errors={errors.issuer} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Deployed date"} register={register} id={"deployed_at"} errors={errors.deployed_at} requireMsg={ERROR_MESSAGES.DATE_ERROR} />
                            <NeonInput label={"Creator"} register={register} id={"creator"} errors={errors.creator} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Type"} register={register} id={"type"} errors={errors.type} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Is variant"} register={register} id={"is_variant"} errors={errors.is_variant} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Name"} register={register} id={"name"} errors={errors.name} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Short Name"} register={register} id={"short_name"} errors={errors.short_name} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Contract address"} register={register} id={"contract_address"} errors={errors.contract_address} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Base uri"} register={register} id={"base_uri"} errors={errors.base_uri} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Etherscan"} register={register} id={"etherscan"} errors={errors.etherscan} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Open sea"} register={register} id={"opensea"} errors={errors.opensea} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Website"} register={register} id={"website"} errors={errors.website} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Twitter"} register={register} id={"twitter"} errors={errors.twitter} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Min mint number"} register={register} id={"min_mint_number"} errors={errors.min_mint_number} requireMsg={ERROR_MESSAGES.NUMBER_ERROR} />
                            <NeonInput label={"Max mint number"} register={register} id={"max_mint_number"} errors={errors.max_mint_number} requireMsg={ERROR_MESSAGES.NUMBER_ERROR} />
                            <NeonInput label={"Mint begin date"} register={register} id={"mint_begin_date"} errors={errors.mint_begin_date} requireMsg={ERROR_MESSAGES.DATE_ERROR} />
                            <NeonInput label={"Mint end date"} register={register} id={"mint_end_date"} errors={errors.mint_end_date} requireMsg={ERROR_MESSAGES.DATE_ERROR} />
                            <NeonInput label={"Mint currency"} register={register} id={"mint_currency"} errors={errors.mint_currency} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Mint price"} register={register} id={"mint_price"} errors={errors.mint_price} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Items in collection"} register={register} id={"items_in_collection"} errors={errors.items_in_collection} requireMsg={ERROR_MESSAGES.NUMBER_ERROR} />
                            <NeonInput label={"Fixed number of items"} register={register} id={"fixed_number_of_items"} errors={errors.fixed_number_of_items} requireMsg={ERROR_MESSAGES.BOOLEAN_ERROR} />
                            <NeonInput label={"Collection image"} register={register} id={"collection_image"} errors={errors.collection_image} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"API key"} register={register} id={"api_key"} errors={errors.api_key} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput label={"Name"} register={register} id={"name"} errors={errors.name} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                            <NeonInput textarea={true} width={"calc(30vw)"} height={"calc(10vh)"} label={"Description"} register={register} id={"description"} errors={errors.description} requireMsg={ERROR_MESSAGES.TEXTAREA_STRING_ERROR} additionalErrorMsg={ERROR_MESSAGES.TEXTAREA_LENGTH_ERROR}/>
                        </SimpleGrid>
                    </form>
                    <Box margin={"10"} boxShadow={["0 0 1.25em #fff"]} borderRadius={"10"}>
                        <Button type={"submit"}
                            onClick={handleSubmit(onSubmit)}
                            color={'#fff'} borderColor={"#fff"}
                            textShadow={"0 0 0.5em #fff"} bgColor={"gray.800"} border={"2px"}
                            inset={"lg"} boxShadow={["inset 0 0 1em 0 #fff"]} fontSize={"1xl"}
                            size={"lg"}
                        >
                            Submit
                        </Button>
                    </Box>
        </VStack>

)
}

export default CollectionForm;