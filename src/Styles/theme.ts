import {extendTheme, ThemeConfig} from '@chakra-ui/react'
import ButtonStyles from "./components/ButtonStyles";

// const config: ThemeConfig = {
//     initialColorMode: 'light',
//     useSystemColorMode: false,
// };

const newTheme: any = {
    colors: {
      primary: "#845EC2",
        secondary: "#FF6F91",
        highlight: "#D65DB1",
        warning: "#FFC75F",
        danger: "#F9F871",
    },
    components: {
        Button: ButtonStyles
    }
}

const theme = extendTheme({ newTheme })

export default theme