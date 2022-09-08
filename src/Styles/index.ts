import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import {styles} from "./globalStyles";

const activeLabelStyles = {
    transform: "scale(0.75) translateY(-25px)"
};

const config: ThemeConfig = {
    initialColorMode: `dark`,
    useSystemColorMode: false,
};

const t = {
    config,
    styles,
    components: {
        Form: {
            variants: {
                floating: {
                    container: {
                        _focusWithin: {
                            label: {
                                ...activeLabelStyles
                            }
                        },
                        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                            ...activeLabelStyles
                        },
                        label: {

                            top: 0.5,
                            left: 0,
                            zIndex: 2,
                            position: "absolute",
                            backgroundColor: "transparent",
                            pointerEvents: "none",
                            mx: 3,
                            px: 1,
                            my: 2,
                            fontFamily: "Exo2",
                            transformOrigin: "left top",
                            fontStyle: "italic",
                            fontSize: "sm",
                            fontWeight: "100", textShadow: "0 0 0.1em #fff"
                        }
                    }
                }
            }
        }
    }
}

const theme = extendTheme(t);

export default theme;