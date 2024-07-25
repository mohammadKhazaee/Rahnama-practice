import { Expense } from '../../routes/expense.route';
import { Group, groups } from '../../routes/group.route';
import { ApplicationError } from '../../utility/Application-error';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const createExpense = (dto: CreateExpenseDto) => {
    if (isExpensePossible(dto, groups)) {
        const group = groups.find((g) => g.id === dto.groupId)!;

        const expense: Expense = {
            id: group.expenses.length + 1,
            userId: dto.userId,
            groupId: dto.groupId,
            description: dto.description || '',
            cost: dto.cost,
        };

        group.expenses.push(expense);
        return expense;
    }

    throw new ApplicationError(400, 'Expense input is not valid');
};

export const isExpensePossible = (
    dto: CreateExpenseDto,
    groups: Group[]
): boolean => {
    const group = groups.find((g) => g.id === dto.groupId);
    // if (!group) throw new NotFoundError('group doesnt exists');
    if (!group) return false;

    const user = group.users.find((u) => u.id === dto.userId);
    // if (!user) throw new NotFoundError('user doesnt exists');
    if (!user) return false;

    return true;
};
