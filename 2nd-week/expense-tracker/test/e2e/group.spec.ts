import request from 'supertest';
import { app } from '../../src/api';
import { createExpenseTest } from './utility';
import { Settlement } from '../../src/routes/group.route';
import { dbs } from '../../src/databases/instances';

describe('Group module test suite', () => {
    beforeEach(() => {
        dbs.expenses.destroyAll();
    });

    it('should get an array of settlements', async () => {
        const groupId = 2;

        await createExpenseTest({ groupId, userId: 1, cost: 300 }, 201);
        await createExpenseTest({ groupId, userId: 2, cost: 900 }, 201);
        await createExpenseTest({ groupId, userId: 3, cost: 300 }, 201);

        const { body: settlements } = await request(app)
            .get(`/groups/${groupId}/settlements`)
            .expect(200);

        const expexted: Settlement[] = [
            {
                debtorId: 1,
                creditorId: 2,
                amount: 200,
            },
            {
                debtorId: 3,
                creditorId: 2,
                amount: 200,
            },
        ];
        expect(settlements).toEqual(expexted);
    });

    it('should fail groupId is not in database', async () => {
        const groupId = Infinity;
        await request(app).get(`/groups/${groupId}/settlements`).expect(404);
    });
});
