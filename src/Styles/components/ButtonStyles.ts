import { whiten, mode, darken } from "@chakra-ui/theme-tools"

const ButtonStyles: any = {
    // Styles for the base style
    baseStyle: {},
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {
        primary: (props: any) => ({
            bg: "primary",
            color: "white",
            _hover: {
                bg: mode(darken("primary", 20), whiten("primary", 20))(props),
                boxShadow: "md"
            }
        }),
        secondary: (props: any) => ({
            bg: "secondary",
            color: "white",
            _hover: {
                bg: mode(darken("secondary", 20), whiten("secondary", 20))(props),
                boxShadow: "md"
            }
        })
    },
    // The default `size` or `variant` values
    defaultProps: {},
};

export default ButtonStyles;