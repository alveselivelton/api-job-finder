import { body } from "express-validator";

export const jobCreateValidation = () => {
  return [
    body("title")
      .isString()
      .notEmpty()
      .withMessage("O título é obrigatório!")
      .isLength({ min: 5 })
      .withMessage("O título precisa ter no mínimo 5 caracteres!"),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("A descrição é obrigatória!"),
    body("company")
      .isString()
      .notEmpty()
      .withMessage("O nome da empresa é obrigatório!"),
    body("email").isEmail().notEmpty().withMessage("Insira um e-mail válido!"),
    body("salary")
      .isNumeric()
      .notEmpty()
      .withMessage("Preencha apenas com números!"),
    body("experience")
      .isString()
      .notEmpty()
      .withMessage("O nível de experiência é obrigatório!"),
    body("workingModel")
      .isString()
      .notEmpty()
      .withMessage("Por favor, especifique a rotina de trabalho!"),
  ];
};
