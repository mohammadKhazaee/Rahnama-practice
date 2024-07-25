import { Group } from '../../../../src/routes/group.route';
import { isUserMember } from '../../../../src/modules/User/get-expense-made';

describe('Get expense made test suite', () => {
    const dummyGroupId = 1;

    it('should fail if group with given id doesnt exists', () => {
        const dummyGroups: Group[] = [];

        expect(
            isUserMember(dummyGroups, dummyGroupId, expect.any(Number))
        ).toBe(false);
    });

    it('should fail if user is not one of the group members', () => {
        const dummyGroupId = 1;
        const dummyGroups: Group[] = [
            {
                id: dummyGroupId,
                users: [],
                expenses: [],
            },
        ];

        expect(
            isUserMember(dummyGroups, dummyGroupId, expect.any(Number))
        ).toBe(false);
    });

    it('should get array of expenses for valid input', () => {
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

        expect(isUserMember(dummyGroups, dummyGroupId, 2)).toBe(true);
    });
});
