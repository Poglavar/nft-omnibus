import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getAddressCollection, deleteAddressCollection} from "./address-collections-service";
import {ADDRESS_COLLECTION} from "./queryConstants";

export const useGetAddressCollection = (address: string) => {
    return useQuery([ADDRESS_COLLECTION, address], () => getAddressCollection(address), {
        // hashTime - duzina kesa...
        enabled: false
    });
};

// LOKAL STORAGE za cuvanje podataka sesije...

// export const useDeleteOneCollection = (id: string) => {
//     const queryClient = useQueryClient();
//     return useMutation( deleteAddressCollection, {
//         onSuccess: () => {
//             queryClient.invalidateQueries("ADDRESS_COLLECTION");
//             // toastr.success('Success', 'Account closed successfully');
//         },
//         onError: error => toastr.error('Error', error.message),
//     } )
// }