const validateAddress = (e: any) => {
    let value = e.target.value
    if (value.slice(0, 2) !== "0x" && value.length > 0) {
        return {
            errorMessage: 'First two characters should be 0x',
            error: true
        }
    } else if (value.length === 0) {
        return {
            errorMessage: "",
            error: false
        }
    } else if (value.length < 42 || value.length > 42 && value.length !== 0) {
        return {
            errorMessage: "Address should have 42 characters!",
            error: true
        }
    } else if ( value.length === 42) {
        return {
            errorMessage: "",
            error: false
        }
    }
}

export {
    validateAddress
}