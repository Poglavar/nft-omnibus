import axios from "axios";
import apiUrl from "./api-url";


export const getAddressCollection = async (userAddress: string) => {
    const { data } = await axios.get(`${apiUrl}/address/${userAddress}`)
    return data
}

export const deleteAddressCollection = async (id: string) => {
    // @ts-ignore
    return await (axios.post(`${apiUrl}/address/${id}`)).data
}