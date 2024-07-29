import { CreateExpense } from '../../databases/expense/expense.database';
import { DbRepo } from '../../db-repo';
import { Expense } from './model/expense.model';

export interface IExpenseRepository {
    createExpense(expense: CreateExpense): Expense;
}

export class ExpenseRepository implements IExpenseRepository {
    constructor(private expenseRepo: DbRepo<Expense>) {}

    createExpense(expense: CreateExpense): Expense {
        return this.expenseRepo.save(expense);
    }
}
