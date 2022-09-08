import { useQuery } from 'react-query';
import { getAddressCollection } from "../axios/address-collections-service";
import { GET_ADDRESS_COLLECTION } from "../queryConstants";

export const useGetAddressCollection = (address: string) => {
    return useQuery([GET_ADDRESS_COLLECTION, address], () => getAddressCollection(address), {
        // hashTime - duzina kesa...
        enabled: false
    });
};

