import { Router } from 'express';
import { z, ZodError } from 'zod';
import { Expense } from './expense.route';
import { User, users } from './user.route';
import { calculateSettlement } from '../modules/Group/calculate-settlement';
import { ApplicationError } from '../utility/Application-error';

export type Group = {
    id: number;
    users: User[];
    expenses: Expense[];
};

export type Settlement = {
    debtorId: number;
    creditorId: number;
    amount: number;
};

export const groups: Group[] = [
    {
        id: 1,
        users: [users[1], users[3], users[4]],
        expenses: [],
    },
    {
        id: 2,
        users: [users[0], users[1], users[2]],
        expenses: [],
    },
    {
        id: 3,
        users: [users[4], users[5]],
        expenses: [],
    },
];

export const app = Router();

app.get('/groups/:groupId/settlements', (req, res) => {
    try {
        const groupId = z.coerce.number().parse(req.params.groupId);

        const settlements = calculateSettlement(groupId);

        res.status(200).send(settlements);
    } catch (error) {
        if (error instanceof ZodError) res.status(400).send(error.errors);
        if (error instanceof ApplicationError)
            res.status(error.statusCode).send(error.message);
    }
});
