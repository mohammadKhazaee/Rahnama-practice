import { expenseService } from '../../../../src/dependency';
import { Group } from '../../../../src/modules/Group/model/group.model';

describe('Create expense test suite', () => {
    it('should fail if user is not one of the group members', () => {
        const dummyGroups: Group[] = [
            {
                id: 1,
                users: [],
                expenses: [],
            },
        ];

        expect(
            expenseService.isExpensePossible(
                {
                    userId: 1,
                    groupId: 1,
                    cost: 0,
                },
                dummyGroups
            )
        ).toBe(false);
    });

    it('should fail if group with given id doesnt exists', () => {
        const dummyGroups: Group[] = [];

        expect(
            expenseService.isExpensePossible(
                {
                    userId: 1,
                    groupId: 1,
                    cost: 0,
                },
                dummyGroups
            )
        ).toBe(false);
    });

    it('should be able create a new expense for valid input', () => {
        const dummyGroups: Group[] = [
            {
                id: 1,
                users: [1, 2],
                expenses: [],
            },
        ];

        expect(
            expenseService.isExpensePossible(
                {
                    userId: 1,
                    groupId: 1,
                    cost: 6_000_000,
                },
                dummyGroups
            )
        ).toBe(true);
    });
});
