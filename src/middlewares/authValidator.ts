import { body } from 'express-validator';

export const registerValidator = [
  body('username', 'Username does not empty!').notEmpty(),
  body('email', 'Invalid email address!').notEmpty().isEmail(),
  body(
    'password',
    'The minimum password length is 6 characters and maximum is 25 characters'
  )
    .notEmpty()
    .isLength({
      min: 6,
      max: 25,
    }),
];

export const loginValidator = [
  body('email', 'Invalid email address!').notEmpty().isEmail(),
  body(
    'password',
    'The minimum password length is 6 characters and maximum is 25 characters'
  )
    .notEmpty()
    .isLength({
      min: 6,
      max: 25,
    }),
];
