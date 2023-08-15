import joi from "joi"
export const createPost = joi.object({
    content:joi.string().alphanum() 
})