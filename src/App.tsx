import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {Box} from '@chakra-ui/react';

import './index.css';
import "./fonts/Exo2/Exo2.ttf"
import AirDropManagerOverview from "./Components/Screens/AirDropManagerOverview/AirDropManagerOverview";
import AirDropManagerLanding from "./Components/Screens/AirDropManagerLanding/AirDropManagerLanding";
import AirDropManagerInputForm from "./Components/Screens/AirDropManagerInputForm/AirDropManagerInputForm";

// check for animate presence exitBeforeEnter initial={true} and why it's stumping the navigation when imported
function App() {
    const location = useLocation();
    return (
        <Box>
            <Routes location={location} key={location.pathname}>
                <Route path={"/"} element={<AirDropManagerLanding/>}/>
                <Route path={"/airdrop-manager-overview"} element={<AirDropManagerOverview/>}/>
                <Route path={"/airdrop-manager-forms"} element={<AirDropManagerInputForm/>}/>
            </Routes>
        </Box>
    );
}

export default App;


