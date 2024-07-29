import { userService } from '../../../../src/dependency';
import { Group } from '../../../../src/modules/Group/model/group.model';

describe('Get expense made test suite', () => {
    const dummyGroupId = 1;

    it('should fail if group with given id doesnt exists', () => {
        const dummyGroups: Group[] = [];

        expect(
            userService.isUserMember(
                dummyGroups,
                dummyGroupId,
                expect.any(Number)
            )
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
            userService.isUserMember(
                dummyGroups,
                dummyGroupId,
                expect.any(Number)
            )
        ).toBe(false);
    });

    it('should get array of expenses for valid input', () => {
        const dummyGroups: Group[] = [
            {
                id: 1,
                users: [1, 2],
                expenses: [],
            },
        ];

        expect(userService.isUserMember(dummyGroups, dummyGroupId, 2)).toBe(
            true
        );
    });
});
