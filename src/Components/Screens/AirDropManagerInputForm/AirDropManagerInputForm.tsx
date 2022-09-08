import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import NeonText from "../../Atoms/NeonText/NeonText";
import CollectionForm from "../../Organism/CollectionForm";
import CollectionPrerequisiteForm from "../../Organism/CollectionPrerequisiteForm";
import NftDropForm from "../../Organism/NftDropForm";

const AirDropManagerInputForm = () => {

    return (
        <Tabs isLazy isFitted>
            <TabList mt="2em" mb='1em'>
                <Tab><NeonText marginBottom={"0"} fontSize={"xl"} textValue={"Collection Form"}/></Tab>
                <Tab><NeonText marginBottom={"0"} fontSize={"xl"} textValue={"Collection Prerequisite Form"}/></Tab>
                <Tab><NeonText marginBottom={"0"} fontSize={"xl"} textValue={"NFT Drop Form"}/></Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <CollectionForm/>
                </TabPanel>
                <TabPanel>
                    <CollectionPrerequisiteForm/>
                </TabPanel>
                <TabPanel>
                    <NftDropForm/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default AirDropManagerInputForm;