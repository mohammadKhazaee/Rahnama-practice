import {
    calculate,
    calculateSettlement,
} from '../../../../src/modules/Group/calculate-settlement';
import { Group, Settlement } from '../../../../src/routes/group.route';
import { NotFoundError } from '../../../../src/utility/Application-error';

describe('Calculate settlement test suite', () => {
    it('should fail if group with given id doesnt exists', () => {
        expect(() => calculateSettlement(Infinity)).toThrow(NotFoundError);
    });

    it('should fail if user is not one of the group members', () => {
        const dummyGroup: Group = {
            users: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
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

        expect(calculate(dummyGroup)).toEqual(expexted);
    });
});
