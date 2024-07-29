import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseRepository } from './expense.repository';
import { CreateExpense } from '../../databases/expense/expense.database';
import { GroupService } from '../Group/group.service';

export class ExpenseService {
    constructor(
        private expenseRepo: ExpenseRepository,
        private groupService: GroupService
    ) {}

    createExpense = ({
        cost,
        groupId,
        userId,
        description,
    }: CreateExpenseDto) => {
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
