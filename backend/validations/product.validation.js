const Joi = require("joi");
const mongoose = require("mongoose");

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  fastdescription: Joi.string().required(),
  quantity: Joi.number().required(),
  quantityp: Joi.number().required(),
  weight: Joi.number().required().default(0),
  price: Joi.number().required(),
  // mfg: Joi.date().required(),

  exp: Joi.date().required(),
  type: Joi.string().required(),
  feature: Joi.string().required(),
  images: Joi.array().optional(),
});

const validateProduct = (productData) => {
  return productValidationSchema.validate(productData);
};

module.exports = validateProduct;
