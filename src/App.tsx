import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {Box} from '@chakra-ui/react';

import './index.css';
import "./fonts/Exo2/Exo2.ttf"
import AirDropManagerOverview from "./Components/Screens/AirDropManagerOverview/AirDropManagerOverview";
import AirDropManagerLanding from "./Components/Screens/AirDropManagerLanding/AirDropManagerLanding";


function App() {
    const location = useLocation();
    return (
        <Box>
            <AnimatePresence exitBeforeEnter initial={true}>
                    <Routes location={location} key={location.pathname}>
                        <Route path={"/"} element={<AirDropManagerLanding/>}/>
                        <Route path={"/airdrop-manager-overview"} element={<AirDropManagerOverview/>}/>
                    </Routes>
                </AnimatePresence>
        </Box>
    );
}

export default App;


