import Joi from "joi";

export const gameSchema = Joi.object({
    name: Joi.string().required().min(2),
    image: Joi.string().uri().required().min(7),
    stockTotal: Joi.number().required(),
    categoryId: Joi.number().required(),
    pricePerDay: Joi.number().required(),
});