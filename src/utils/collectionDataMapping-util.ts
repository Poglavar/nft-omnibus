import _ from "lodash";

type nftObject = {
    nft_content_url: string,
    nft_number: number,
    nft_short_name: string,
    collection_id: string,
    drops: [{
        name: string,
        id: string,
        collection: {
            type: string,
            mint_begin_date: string,
            mint_end_date: string,
            mint_price: string,
            collection_image: string,
            description: string,
            website: string,
            opensea: string,
            floor_price: string
        },
        children: [{
            parentId: string,
            name: string,
            children: [{
                id: string,
                action: string,
                name: string,
                length: number,
                collection: {
                    collection_image: string,
                    id: string,
                }
            }]
        }]
    }],
};

const mapCollectionData = (c: []) =>  {
    let nftAirDropArray: any = []
    c.map((nft: nftObject, i) => {
        let nftData: any = {}
        nftData[i] = {
            nftKey: nft.nft_number,
            nftName: nft.nft_short_name,
            nftUserImage: nft.nft_content_url,
            nftCollectionId: nft.collection_id,
        }
        nft.drops.map((dropType,n) => {
            // console.log("dropType.collection", dropType);
            let airDropNftData: any = {}
            airDropNftData[i] = {
                airdropNftName: dropType.name,
                airdropNftId: dropType.id,
                airdropCurrency: dropType.collection.type,
                airdropMintDate: dropType.collection.mint_begin_date,
                airdropExpiryDate: dropType.collection.mint_end_date,
                airdropClaimPrice: dropType.collection.mint_price,
                airdropCollectionImage: dropType.collection.collection_image,
                airdropFloorPrice: dropType.collection.floor_price,
                description: {
                    desc: dropType.collection.description,
                    link: dropType.collection.website,
                    openSeaLink: dropType.collection.opensea,
                }
            }
            if(dropType.children.length === 1) {
                return nftAirDropArray.push({
                    ...nftData[i],
                    ...airDropNftData[i],
                    airdropRequirementTypeData: [{
                        airdropRequirement : dropType.children[0].name,
                        airdropType : "airdrop"
                    }]
                })
            }

            dropType.children.map((droppedChild, z) => {
                // console.log("droppedChild", droppedChild.children);
                const arr: any = [];
                if (droppedChild.children.length === 1) {
                    if(!_.some(droppedChild.children, ['id', nft.collection_id])) return;
                    arr.push({
                        airdropRequirement: droppedChild.children[z].name,
                        airdropRequirementUrl: droppedChild.children[z].collection.collection_image,
                        airdropRequirementCollectionId: droppedChild.children[z].collection.id,
                        airdropType: "airdrop",
                    })
                }
                if(droppedChild.children && droppedChild.children.length >= 2) {
                    droppedChild.children.map((grandChild, y) => {
                        if(!_.some(droppedChild.children, ['id', nft.collection_id])) return;
                        arr.push({
                            airdropRequirement : grandChild.name,
                            airdropRequirementUrl: grandChild.collection.collection_image,
                            airdropRequirementCollectionId: grandChild.collection.id,
                            airdropType : grandChild.action ? "burn" : "combine"
                        })
                    })
                }
                return nftAirDropArray.push({
                    ...nftData[i],
                    ...airDropNftData[i],
                    airdropRequirementTypeData: [...arr]

                })
            })
        })
    })
    return nftAirDropArray.filter((array: any) => !_.isEmpty(array.airdropRequirementTypeData));
};

const getMethodData = (typeData: any) => {
    let method;
    if(typeData.airdropRequirementTypeData.length < 2) {
        method = {
            type: typeData.airdropRequirementTypeData[0].airdropType,
            image: typeData.airdropCollectionImage,
            additionalType: ""
        }
    } else if (typeData.airdropRequirementTypeData.length === 2) {
        const requirementUrl = typeData.airdropRequirementTypeData.filter((data: { airdropRequirementCollectionId : string}) => data.airdropRequirementCollectionId !== typeData.nftCollectionId)
        const hasBurnToken = typeData.airdropRequirementTypeData.find((data: { airdropRequirementCollectionId : string, airdropType: string}) => data.airdropRequirementCollectionId === typeData.nftCollectionId && data.airdropType === "burn")
        method = {
                type: hasBurnToken ? "combine" : typeData.airdropRequirementTypeData[1].airdropType,
                image: requirementUrl[0].airdropRequirementUrl,
                additionalType: hasBurnToken ? "burn" : "",
            }
    } else {
        method = {
            type: "unknown",
            image: typeData.airdropCollectionImage,
            additionalType: ""
        }
    }
    return method;
}

export {
    mapCollectionData,
    getMethodData
}