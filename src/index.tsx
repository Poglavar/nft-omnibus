import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { store } from './store';
import { queryClientSetup } from "../src/config/queryClient";

import './index.css';
import App from './App';
import theme from './Styles/index'

export const queryClient = queryClientSetup();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// console.log("theme", theme);
// console.log("heme.config.initialColorMode", theme.config.initialColorMode);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <App/>
            </ChakraProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
