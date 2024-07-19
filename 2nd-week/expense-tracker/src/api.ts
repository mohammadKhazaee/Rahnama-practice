import express from 'express';
import { app as expenseRouter } from './routes/expense.route';
import { app as userRouter } from './routes/user.route';
import { app as groupRouter } from './routes/group.route';

export const app = express();

app.use(express.json());

app.use('/expense', expenseRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});
