import { body } from "express-validator";

export const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("O nome de usuário é obrigatório!")
      .isLength({ min: 3 })
      .withMessage("O nome de usuário precisa ter pelo menos 5 caracteres!"),
    body("email")
      .isString()
      .notEmpty()
      .withMessage("O e-mail é obrigatório!")
      .isEmail()
      .withMessage("Insira um e-mail válido!"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("A senha é obrigatória!")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter pelo menos 6 caracteres!"),
    body("confirmPassword")
      .isString()
      .notEmpty()
      .withMessage("A confirmação da senha é obrigatória!")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais!");
        }
        return true;
      }),
  ];
};

export const userLoginValidation = () => {
  return [
    body("email")
      .isString()
      .notEmpty()
      .withMessage("O e-mail é obrigatório!")
      .isEmail()
      .withMessage("Insira um email válido!"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("A senha é obrigatória!"),
  ];
};
