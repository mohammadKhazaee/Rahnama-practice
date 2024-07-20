import { Group, groups } from '../../routes/group.route';
import { ApplicationError } from '../../utility/Application-error';

export const getExpenseMade = (groupId: number, userId: number) => {
    if (isUserMember(groups, groupId, userId)) {
        const expenseMade = groups
            .find((g) => g.id === groupId)!
            .expenses.filter((e) => e.userId === userId);
        return expenseMade;
    }
    throw new ApplicationError(400, 'Wrong input');
};

export const isUserMember = (
    groups: Group[],
    groupId: number,
    userId: number
): boolean => {
    const group = groups.find((g) => g.id === groupId);
    const user = group?.users.find((u) => u.id === userId);
    return user !== undefined;
};
