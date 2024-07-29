import { CreateExpenseDto } from './dto/create-expense.dto';
import { IExpenseRepository } from './expense.repository';
import { CreateExpense } from '../../databases/expense/expense.database';
import { Expense } from './model/expense.model';
import { IGroupService } from '../Group/group.service';

export interface IExpenseService {
    createExpense({
        cost,
        groupId,
        userId,
        description,
    }: CreateExpenseDto): Expense | undefined;
}

export class ExpenseService implements IExpenseService {
    constructor(
        private expenseRepo: IExpenseRepository,
        private groupService: IGroupService
    ) {}

    createExpense = ({
        cost,
        groupId,
        userId,
        description,
    }: CreateExpenseDto): Expense | undefined => {
        if (this.groupService.isUserMember({ userId, groupId })) {
            const expense: CreateExpense = {
                userId: userId,
                groupId: groupId,
                description: description || '',
                cost: cost,
            };

            return this.expenseRepo.createExpense(expense);
        }
    };
}
