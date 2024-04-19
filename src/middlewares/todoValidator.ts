import { body, param } from 'express-validator';

export const createTodoValidator = [
  body('title', 'The minimum title length is 3 characters and maximum is 50 characters.')
    .notEmpty()
    .isLength({ min: 3, max: 50 }),
  body('description', 'The minimum description length is 3 characters.')
    .notEmpty()
    .isLength({ min: 3 }),
  body('finished').isBoolean({ strict: true }).default(false),
];

export const todoParamsValidator = param('id').escape().trim();

export const updateTodoValidator = [
  body('title', 'The minimum title length is 3 characters and maximum is 50 characters.')
    .notEmpty()
    .isLength({ min: 3, max: 50 }),
  body('description', 'The minimum description length is 3 characters.')
    .notEmpty()
    .isLength({ min: 3 }),
  body('finished').isBoolean({ strict: true }).default(false),
  param('id').escape().trim(),
];
