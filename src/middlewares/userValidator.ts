import { body, param } from 'express-validator';

export const updateUserValidator = [
  param('id').escape().trim(),
  body('username', 'Username does not empty!').notEmpty(),
];
