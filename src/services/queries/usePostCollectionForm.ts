import {useMutation, useQueryClient} from 'react-query';
import { postCollection } from "../axios/address-collections-service";
import { useToast } from '@chakra-ui/react'
import {POST_COLLECTION_FORM} from "../queryConstants";

export const usePostCollectionForm = () => {
    // const queryClient = useQueryClient();
    const toast = useToast()
    return useMutation((data: {}) => postCollection(data), {
        mutationKey: POST_COLLECTION_FORM,
        onSuccess: data => {
            toast({
                status: "success",
                title: "Form successfully submitted!",
                description: `Checking validity of your post.`
            })
            // queryClient.invalidateQueries([LOANS_KEY]);
            // toastr.success('Success', 'Loan created');
            // history.push(`/loan-overview/retail-loan/${data.id}`);
        },
        onError: (e: { response: { data: { message: string}} }) => {
            toast({
                status: "error",
                title: "Submitting unsuccessful!",
                description: `${e.response.data.message}`
        })
        },
    });
}

