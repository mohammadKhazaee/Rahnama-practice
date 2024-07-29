import { InMemoryDb } from '../../db-repo';
import { Expense } from '../../modules/Expense/model/expense.model';

export interface UpdateExpense {
    id: number;
    userId?: number;
    groupId?: number;
    description?: string;
    cost?: number;
}

export interface CreateExpense {
    userId: number;
    groupId: number;
    description: string;
    cost: number;
}

export class ExpenseDb extends InMemoryDb<Expense> {}
