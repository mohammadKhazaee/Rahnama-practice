import { Settlement } from '../../../../src/routes/group.route';
import { NotFoundError } from '../../../../src/utility/Application-error';
import { Group } from '../../../../src/modules/Group/model/group.model';
import { groupService } from '../../../../src/dependency';

describe('Calculate settlement test suite', () => {
    it('should fail if group with given id doesnt exists', () => {
        expect(() => groupService.calculateSettlement(Infinity)).toThrow(
            NotFoundError
        );
    });

    it('should get an array of settlements', () => {
        const dummyGroup: Group = {
            users: [1, 2, 3, 4],
            expenses: [
                { userId: 1, cost: 200 },
                { userId: 2, cost: 800 },
                { userId: 3, cost: 100 },
                { userId: 4, cost: 600 },
            ],
        } as any;

        const expexted: Settlement[] = [
            { debtorId: 3, creditorId: 2, amount: 200 },
            { debtorId: 1, creditorId: 2, amount: 175 },
            { debtorId: 1, creditorId: 4, amount: 50 },
            { debtorId: 3, creditorId: 4, amount: 125 },
        ];

        expect(groupService.calculate(dummyGroup)).toEqual(expexted);
    });
});
