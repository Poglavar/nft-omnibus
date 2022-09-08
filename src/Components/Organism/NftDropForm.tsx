import * as React from "react";
import {
    Box,
    Button,
    VStack,
    SimpleGrid,
} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";

import NeonInput from "../Molecule/NeonInput";
import {usePostNftDropForm} from "../../services/queries/usePostNftDrop";
import {ERROR_MESSAGES} from "../../CONSTANTS/string_constants";



interface Inputs {
    issuer: string,
    name: string,
    campaign_id: string,
    description: string,
    description_site: string,
    type: string,
    collection_id: string,
    genesis_collection_id: string,
    mint_start_date: string,
    mint_end_date: string,
    end_date_enforced: string,
    claim_transaction: string,
    tree: string,
    api_key: string,
}

const NftDropForm = () => {
    const { mutate } = usePostNftDropForm()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            issuer: "",
            name: "",
            campaign_id: "",
            description: "",
            description_site: "",
            type: "",
            collection_id: "",
            genesis_collection_id: "",
            mint_start_date: "",
            mint_end_date: "",
            end_date_enforced: "",
            claim_transaction: "",
            tree: "",
            api_key: "",
        }
    });
    const onSubmit: SubmitHandler<Inputs> = data => mutate(data);

    return (
       <VStack>
           <form>
               <SimpleGrid marginBottom={"20"} columns={3} spacingY={"40px"}>
                   <NeonInput label={"Issuer"} register={register} id={"issuer"} errors={errors.issuer} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput label={"Name"} register={register} id={"name"} errors={errors.name} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput label={"Campaign"} register={register} id={"campaign_id"} errors={errors.campaign_id} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput label={"Description site"} register={register} id={"description_site"} errors={errors.description_site} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput label={"Type"} register={register} id={"type"} errors={errors.type} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput label={"Genesis collection id"} register={register} id={"genesis_collection_id"} errors={errors.genesis_collection_id} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput label={"Mint start date"} register={register} id={"mint_start_date"} errors={errors.mint_start_date} requireMsg={ERROR_MESSAGES.DATE_ERROR} />
                   <NeonInput label={"Mint end date"} register={register} id={"mint_end_date"} errors={errors.mint_end_date} requireMsg={ERROR_MESSAGES.DATE_ERROR} />
                   <NeonInput label={"End date enforced"} register={register} id={"end_date_enforced"} errors={errors.end_date_enforced} requireMsg={ERROR_MESSAGES.BOOLEAN_ERROR} />
                   <NeonInput label={"Claim transaction"} register={register} id={"claim_transaction"} errors={errors.claim_transaction} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput label={"Tree"} register={register} id={"tree"} errors={errors.tree} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput label={"API key"} register={register} id={"api_key"} errors={errors.api_key} requireMsg={ERROR_MESSAGES.STRING_ERROR} />
                   <NeonInput textarea={true} width={"calc(30vw)"} height={"calc(10vh)"} label={"Description"} register={register} id={"description"} errors={errors.description} requireMsg={ERROR_MESSAGES.TEXTAREA_STRING_ERROR} additionalErrorMsg={ERROR_MESSAGES.TEXTAREA_LENGTH_ERROR}/>

               </SimpleGrid>
           </form>
           <Box marginTop={"30"} boxShadow={["0 0 1.25em #fff"]} borderRadius={"10"}>
               <Button onClick={handleSubmit(onSubmit)}
                       type={"submit"} color={'#fff'} borderColor={"#fff"}
                       textShadow={"0 0 0.5em #fff"} bgColor={"gray.800"} border={"2px"}
                       inset={"lg"} boxShadow={["inset 0 0 1em 0 #fff"]} fontSize={"1xl"}
                       size={"lg"}>
                  Submit
               </Button>
           </Box>
       </VStack>
    )
}

export default NftDropForm;