import { Router } from 'express';
import { z, ZodError } from 'zod';
import { createExpense } from '../modules/Expense/create-expense';
import { createExpenseDto } from '../modules/Expense/dto/create-expense.dto';
import { ApplicationError } from '../utility/Application-error';
import { getExpenseMade } from '../modules/User/get-expense-made';

export type User = {
    id: number;
    name: string;
};

export const users: User[] = [
    {
        id: 1,
        name: 'ali',
    },
    {
        id: 2,
        name: 'hasan',
    },
    { id: 3, name: 'parisa' },
    { id: 4, name: 'mohammad ali' },
    { id: 5, name: 'yalda' },
    { id: 6, name: 'shayan' },
];

export const app = Router();

app.get('/users/:userId/groups/:groupId/expenses/made', (req, res) => {
    try {
        const userId = z.coerce.number().parse(req.params.userId);
        const groupId = z.coerce.number().parse(req.params.groupId);

        const expenses = getExpenseMade(groupId, userId);

        res.status(200).send(expenses);
    } catch (error) {
        if (error instanceof ZodError) res.status(400).send(error.errors);
        if (error instanceof ApplicationError)
            res.status(error.statusCode).send(error.message);
    }
});

app.get('/users/:userId/groups/:groupId/expenses/received', (req, res) => {});
