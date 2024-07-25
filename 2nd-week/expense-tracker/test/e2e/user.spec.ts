import request from 'supertest';
import { app } from '../../src/api';
import { createExpenseTest } from './utility';
import { groups } from '../../src/routes/group.route';

describe('User module test suite', () => {
    describe('Get expense made route', () => {
        it('should only get expenses made by user', async () => {
            const groupId = 2,
                userId = 2;
            const userExpense = { groupId, userId, cost: 300 };
            const groupExpense = { groupId, userId: 1, cost: 300 };

            groups[groupId - 1].expenses = [];

            await createExpenseTest(groupExpense, 201);
            await createExpenseTest(userExpense, 201);
            await createExpenseTest(userExpense, 201);

            const { body: expenses } = await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(200);

            expect(expenses).toEqual([
                {
                    ...userExpense,
                    id: 2,
                    description: '',
                },
                {
                    ...userExpense,
                    id: 3,
                    description: '',
                },
            ]);
        });

        it('should fail groupId is not in database', async () => {
            const groupId = Infinity,
                userId = 2;
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });

        it('should fail userId is not in database', async () => {
            const userId = Infinity,
                groupId = 1;
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });

        it('should fail if user is not one of group members', async () => {
            const userId = 1,
                groupId = 1;
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });

        it('should fail if userId is not number', async () => {
            const userId = 'dwdsda',
                groupId = 1;
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });

        it('should fail if groupId is not number', async () => {
            const userId = 1,
                groupId = 'dwdsda';
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });
    });

    describe('Get expense received route', () => {
        it('should only get expenses made by group', async () => {
            const groupId = 2,
                userId = 2;
            const userExpense = { groupId, userId, cost: 300 };
            const groupExpense = { groupId, userId: 1, cost: 300 };

            groups[groupId - 1].expenses = [];

            await createExpenseTest(userExpense, 201);
            await createExpenseTest(groupExpense, 201);
            await createExpenseTest(groupExpense, 201);

            const { body: expenses } = await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/received`)
                .expect(200);

            expect(expenses).toEqual([
                {
                    ...groupExpense,
                    id: 2,
                    description: '',
                },
                {
                    ...groupExpense,
                    id: 3,
                    description: '',
                },
            ]);
        });

        it('should fail groupId is not in database', async () => {
            const groupId = Infinity,
                userId = 2;
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });

        it('should fail userId is not in database', async () => {
            const userId = Infinity,
                groupId = 1;
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });

        it('should fail if user is not one of group members', async () => {
            const userId = 1,
                groupId = 1;
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });

        it('should fail if userId is not number', async () => {
            const userId = 'dwdsda',
                groupId = 1;
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });

        it('should fail if groupId is not number', async () => {
            const userId = 1,
                groupId = 'dwdsda';
            await request(app)
                .get(`/users/${userId}/groups/${groupId}/expenses/made`)
                .expect(400);
        });
    });
});
