import Joi from "joi";

export const rentalSchema = Joi.object({
    customerId: Joi.number(),
  gameId: Joi.number(),
  rentDate: Joi.date(),    // data em que o aluguel foi feito
  daysRented: Joi.number(),             // por quantos dias o cliente agendou o aluguel
  returnDate: Joi.date().allow(null),          // data que o cliente devolveu o jogo (null enquanto não devolvido)
  originalPrice: Joi.number(),       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
  delayFee: Joi.number().allow(null), 
})