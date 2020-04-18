export type FieldValidatorType = (value: string | undefined) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined
    return 'field is required'
}
export const maxLength = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    }
    return undefined
}
export const email: FieldValidatorType = (value) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
}
    