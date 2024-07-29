import express, { ErrorRequestHandler } from 'express';
import { ExpenseRouter } from './routes/expense.route';
import { ApplicationError } from './utility/Application-error';
import { ZodError } from 'zod';
import { dbs } from './databases/instances';
import { ExpenseRepository } from './modules/Expense/expense.repository';
import { ExpenseService } from './modules/Expense/expense.service';
import { GroupRepository } from './modules/Group/group.repository';
import { GroupService } from './modules/Group/group.service';
import { UserRepository } from './modules/User/user.repository';
import { UserService } from './modules/User/user.service';
import { UserRouter } from './routes/user.route';
import { GroupRouter } from './routes/group.route';
import { seedDb } from './seed-db';

export const app = express();

app.use(express.json());

const groupRepo = new GroupRepository(dbs.groups, dbs.groups_users);
const userRepo = new UserRepository(dbs.users);
const expenseRepo = new ExpenseRepository(dbs.expenses);

const groupService = new GroupService(groupRepo);
const userService = new UserService(userRepo, groupService);
const expenseService = new ExpenseService(expenseRepo, groupService);

const expenseRouter = new ExpenseRouter(expenseService);
const userRouter = new UserRouter(userService);
const groupRouter = new GroupRouter(groupService);

seedDb();

app.use('/expense', expenseRouter.getApp());
app.use('/users', userRouter.getApp());
app.use('/groups', groupRouter.getApp());

app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ZodError) res.status(400).send(error.errors);
    if (error instanceof ApplicationError)
        res.status(error.statusCode).send(error.message);
};

app.use(errorHandler);
