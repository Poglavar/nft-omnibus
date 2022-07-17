import {Route, Routes} from "react-router-dom";
import {Box} from '@chakra-ui/react';
import Home from "./Components/Screens/Home";
import FeaturePage from "./Components/Screens/FeaturePage";

function App() {
    return (
        <Box>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/featurePage"} element={<FeaturePage/>}/>
            </Routes>
        </Box>
    );
}

export default App;


