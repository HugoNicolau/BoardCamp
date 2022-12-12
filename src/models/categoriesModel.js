import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().required().min(2),
    
})