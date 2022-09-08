import { Styles } from "@chakra-ui/theme-tools"


export const styles: Styles = {
    global: (props: any) => ({
        'html, body': {
            bg: props.colorMode === 'dark' ? 'black' : 'white',
        },
    }),
};