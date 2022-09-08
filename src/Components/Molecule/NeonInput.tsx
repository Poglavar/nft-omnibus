import * as React from "react";
import {motion} from "framer-motion";
import {Box, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";

interface NeonInputProps {
    height?: string,
    width?: string,
    register: any
    errors: any,
    id: string,
    label: string,
    requireMsg: string,
    textarea?: boolean,
    additionalErrorMsg?: string,
}

const transition = { duration: 0.3, ease: "easeInOut"};
const MotionBox = motion(Box);

const NeonInput: React.FC<NeonInputProps> = ({   id,
                                                         errors,
                                                         register,
                                                         height = 'calc(5vh)',
                                                         width = 'calc(20vw)',
                                                         label,
                                                          requireMsg,
                                                            textarea= false,
                                                            additionalErrorMsg = ""
                                                    }) => {

    return (
        <MotionBox
            initial={{ y: "10%", opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeInOut", delay: 0.2}}}
            exit={{ y: "-10%", scale: 1, opacity: 0, transition }}
            h={height} w={width} borderRadius={20}
            boxShadow={["0 0 1.25em #fff"]}
        >
            <FormControl variant={"floating"} h={"inherit"} w={"inherit"} isInvalid={errors} borderRadius={"inherit"} boxShadow={["inset 0 0 1.25em #fff"]} borderColor={"#fff"} >
                {textarea ?
                    <Textarea
                        id={id}
                        fontFamily={"Exo2"} _placeholder={{fontWeight: "500", textShadow: "0 0 0.07em #fff" }}
                        fontSize={"md"} borderRadius={"inherit"}
                        fontStyle={"italic"}  h={"inherit"} w={"inherit"}
                        variant={"filled"} placeholder={" "}
                        {...register(id, {
                            required: requireMsg,
                            minLength: { value: 140, message: additionalErrorMsg },
                        })}
                    />
                    :
                    <Input
                        id={id}
                        fontFamily={"Exo2"} _placeholder={{fontWeight: "500", textShadow: "0 0 0.07em #fff"}}
                        fontSize={"md"} h={"inherit"} w={"inherit"} borderRadius={"inherit"}
                        fontStyle={"italic"}
                        variant={"filled"} placeholder={" "}
                        {...register(id, {
                            required: requireMsg,
                            // minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                }
                <FormLabel>{label}</FormLabel>
                <FormErrorMessage marginLeft={4}>{errors && errors.message}</FormErrorMessage>
            </FormControl>
        </MotionBox>
    )
};

export default NeonInput;