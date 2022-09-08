import {
    Box,
    Button,
    VStack,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    SimpleGrid
} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import NeonText from "../Atoms/NeonText/NeonText";
import {usePostCollectionPrerequisiteForm} from "../../services/queries/usePostCollectionPrerequisiteForm";
import {useState} from "react";
import NeonMotionBox from "../Molecule/NeonInput";
import * as React from "react";
import NeonInput from "../Molecule/NeonInput";
import {ERROR_MESSAGES} from "../../CONSTANTS/string_constants";

interface Inputs {
    collection_id: string,
    collection_name: string,
    prerequisite_id: string,
    prerequisite_name: string,
    action: string,
    api_key: string,
}


const CollectionPrerequisiteForm = () => {
    const { mutate, isLoading } = usePostCollectionPrerequisiteForm()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            collection_id: "",
            collection_name: "",
            prerequisite_id: "",
            prerequisite_name: "",
            action: "",
            api_key: ""
        }
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => mutate(data);

    return (
        <VStack>
            <form>
                <SimpleGrid marginBottom={"20"} columns={3} spacing={"20"}>
                    <NeonInput label={"Collection Id"} register={register} id={"collection_id"} errors={errors.collection_id} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                    <NeonInput label={"Collection Name"} register={register} id={"collection_name"} errors={errors.collection_name} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                    <NeonInput label={"Prerequisite Id"} register={register} id={"prerequisite_id"} errors={errors.prerequisite_id} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                    <NeonInput label={"Prerequisite Name"} register={register} id={"prerequisite_name"} errors={errors.prerequisite_name} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                    <NeonInput label={"Prerequisite Id"} register={register} id={"prerequisite_id"} errors={errors.prerequisite_id} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                    <NeonInput label={"API key"} register={register} id={"api_key"} errors={errors.api_key} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                </SimpleGrid>
            </form>
            <VStack paddingX={"100"}>
                <Box marginBottom={"10"} position={"relative"} boxShadow={["0 0 1.25em #fff"]} borderRadius={"10"}>
                    <Button type={"submit"} onClick={handleSubmit(onSubmit)} color={'#fff'} borderColor={"#fff"}
                            textShadow={"0 0 0.5em #fff"} bgColor={"gray.800"} border={"2px"}
                            inset={"lg"} boxShadow={["inset 0 0 1em 0 #fff"]} fontSize={"1xl"}
                            size={"lg"}>
                        Submit
                    </Button>
                </Box>
                <NeonText fontSize={"md"} marginBottom={"0"} textValue={"*Remember to use Variants even when a collection can be reached only from one path (this is for consistency). A variant is a collection and has a collection_id, but it does not have any other attributes and does not contain any NFTs. In code it can be distinguished from normal collections because it has the property is_variant set to true."} />
            </VStack>
        </VStack>
    )
}

export default CollectionPrerequisiteForm;