import { Group } from '../../routes/group.route';
import { isExpensePossible } from './create-expense';

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
            isExpensePossible(
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
            isExpensePossible(
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
                users: [
                    {
                        id: 1,
                        name: 'ali',
                    },
                    {
                        id: 2,
                        name: 'sara',
                    },
                ],
                expenses: [],
            },
        ];

        expect(
            isExpensePossible(
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
