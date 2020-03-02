export const required = (value: any): undefined | string => {
    if (value) {
        return undefined
    }
    return 'field is required'
}
export const maxLength = (maxLength: number) => (value: any): undefined | string => {
    if (value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    }
    return undefined
}

export const email = (value: any): undefined | string => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
}
    