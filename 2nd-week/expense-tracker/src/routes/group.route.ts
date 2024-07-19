import { Router } from 'express';
import { ZodError } from 'zod';
import { Expense } from './expense.route';
import { User, users } from './user.route';

export type Group = {
    id: number;
    users: User[];
    expenses: Expense[];
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

app.get('/groups/:groupId/settlements', (req, res) => {});
