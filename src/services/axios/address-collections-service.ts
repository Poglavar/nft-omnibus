import axios from "axios";
import apiUrl from "../api-url";


export const getAddressCollection = async (userAddress: string) => {
    const { data } = await axios.get(`${apiUrl}/address/${userAddress}`);
    return data
};

export const postCollection = async (collectionForm: {}) => {
    console.log("collectionForm", collectionForm);
    const { data } = await (axios.post(`${apiUrl}/collection`, collectionForm))
    console.log("collectionForm - data", data);
    return data;
};

export const postCollectionPrerequisite = async (collectionPrerequisiteForm: {}) => {
    console.log("collectionPrerequisiteForm", collectionPrerequisiteForm);
    const { data } = await (axios.post(`${apiUrl}/collection_prerequisite`, collectionPrerequisiteForm))
    console.log("collectionPrerequisiteForm - data", data);
    return data;
};

export const postNftDrop = async (nftDropForm: {}) => {
    console.log("nftDropForm", nftDropForm);
    const { data } = await (axios.post(`${apiUrl}/nft-drop`, nftDropForm))
    console.log("nftDropForm- data", data);
    return data;
};