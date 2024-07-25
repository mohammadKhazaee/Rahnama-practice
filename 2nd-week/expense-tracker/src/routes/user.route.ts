import { Router } from 'express';
import { z, ZodError } from 'zod';
import { ApplicationError } from '../utility/Application-error';
import {
    getExpenseMade,
    getExpenseReceived,
} from '../modules/User/get-expense-made';
import { getExpenseDto } from '../modules/User/dto/get-expense.dto';
import { groups } from './group.route';

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

app.get('/:userId/groups/:groupId/expenses/made', (req, res) => {
    try {
        const dto = getExpenseDto.parse(req.params);

        const expenses = getExpenseMade(dto);

        res.status(200).send(expenses);
    } catch (error) {
        if (error instanceof ZodError) res.status(400).send(error.errors);
        if (error instanceof ApplicationError)
            res.status(error.statusCode).send(error.message);
    }
});

app.get('/:userId/groups/:groupId/expenses/received', (req, res) => {
    try {
        const dto = getExpenseDto.parse(req.params);

        const expenses = getExpenseReceived(dto);

        res.status(200).send(expenses);
    } catch (error) {
        if (error instanceof ZodError) res.status(400).send(error.errors);
        if (error instanceof ApplicationError)
            res.status(error.statusCode).send(error.message);
    }
});
