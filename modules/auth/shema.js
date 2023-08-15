import joi from "joi";
export const register = joi.object({
    username: joi.string().required().min(3).max(10).alphanum(),
    email: joi.string().email().required(),
    phoneNumber: joi.number(),
    image: joi.allow(),
    password: joi.string().pattern(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/).required(),
})
export const login = joi.object({
    username: joi.string().required().min(3).max(10).alphanum(),
    password: joi.string().pattern(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/).required()
})

export const forgetPassword = joi.object({
    email: joi.string().email().required()
})

export const verficationCode = joi.object({
    code: joi.number().required()  
})

export const changePassword = joi.object({
    newPass: joi.string().pattern(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/).required(),
    confirmPass: joi.valid(joi.ref("newPass")) 
})