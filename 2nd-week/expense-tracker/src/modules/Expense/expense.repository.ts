import { CreateExpense } from '../../databases/expense/expense.database';
import { DbRepo } from '../../db-repo';

import { Expense } from './model/expense.model';

export class ExpenseRepository {
    constructor(private expenseRepo: DbRepo<Expense>) {}

    createExpense(expense: CreateExpense): Expense {
        return this.expenseRepo.save(expense);
    }
}
