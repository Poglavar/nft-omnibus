import {useMutation} from 'react-query';
import { postNftDrop } from "../axios/address-collections-service";
import { useToast } from '@chakra-ui/react'
import {POST_NFT_DROP_FORM} from "../queryConstants";

export const usePostNftDropForm = () => {
    // const queryClient = useQueryClient();
    const toast = useToast()
    return useMutation((data: {}) => postNftDrop(data), {
        mutationKey: POST_NFT_DROP_FORM,
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
                status: `error`,
                title: "Submitting unsuccessful!",
                description: `${e.response.data.message}`
            })
        },
    });
}

