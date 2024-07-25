import { CreateExpenseDto } from '../../src/modules/Expense/dto/create-expense.dto';
import { createExpenseTest } from './utility';

describe('Expense module test suite', () => {
    let validExpense: CreateExpenseDto;
    beforeEach(() => {
        validExpense = {
            groupId: 1,
            userId: 2,
            description: 'cafe',
            cost: 300_000,
        };
    });
    it('should create new expense for valid input', async () => {
        await createExpenseTest(validExpense, 201);
    });

    it('should fail groupId is not in database', async () => {
        validExpense.groupId = Infinity;
        await createExpenseTest(validExpense, 400);
    });

    it('should fail userId is not in database', async () => {
        validExpense.userId = Infinity;
        await createExpenseTest(validExpense, 400);
    });

    it('should fail if user is not one of group members', async () => {
        validExpense.userId = 1;
        await createExpenseTest(validExpense, 400);
    });

    it('should fail for incomplete request body', async () => {
        await createExpenseTest({}, 400);
    });
});
