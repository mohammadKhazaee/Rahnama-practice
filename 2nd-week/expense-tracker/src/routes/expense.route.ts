import { Router } from 'express';
import { z, ZodError } from 'zod';
import { createExpenseDto } from '../modules/Expense/dto/create-expense.dto';
import { groups } from './group.route';
import { ApplicationError, NotFoundError } from '../utility/Application-error';
import { createExpense } from '../modules/Expense/create-expense';

export type Expense = {
    id: number;
    userId: number;
    groupId: number;
    description: string;
    cost: number;
};

export const app = Router();

app.post('/', (req, res) => {
    try {
        const dto = createExpenseDto.parse(req.body);

        const expense = createExpense(dto);

        res.status(201).send(expense);
    } catch (error) {
        if (error instanceof ZodError) res.status(400).send(error.errors);
        if (error instanceof ApplicationError)
            res.status(error.statusCode).send(error.message);
    }
});
