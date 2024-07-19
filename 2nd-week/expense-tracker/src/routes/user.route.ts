import { Router } from 'express';

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

app.get('/users/:userId/groups/:groupId/expenses/made', (req, res) => {});

app.get('/users/:userId/groups/:groupId/expenses/received', (req, res) => {});
