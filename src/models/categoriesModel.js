import joi from "joi";

export const categorySchema = joi.object({
    name: joi.string().required().min(2),
    
})