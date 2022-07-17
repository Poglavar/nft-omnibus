import {Box, Button, useColorMode} from "@chakra-ui/react";
import {HeaderComponent} from "../HeaderComponent";
import {Pricing} from "../Pricing";
import {Features} from "../Features";

const Home = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    console.log("colorMode", colorMode);
    return (
        <Box>
            <Button onClick={toggleColorMode}>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
            <HeaderComponent />
            <Pricing />
            <Features />
        </Box>
    )
}

export default Home;