import request from 'supertest';
import { app } from '../../src/api';
import { CreateExpenseDto } from '../../src/modules/Expense/dto/create-expense.dto';

export const createExpenseTest = (
    expense: Partial<CreateExpenseDto>,
    expectedCode: number
) => request(app).post('/expense').send(expense).expect(expectedCode);
