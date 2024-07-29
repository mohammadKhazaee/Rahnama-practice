import { dbs } from './databases/instances';

export const seedDb = () => {
    dbs.users.insert([
        { name: 'ali' },
        { name: 'hasan' },
        { name: 'parisa' },
        { name: 'mohammad ali' },
        { name: 'yalda' },
        { name: 'shayan' },
    ]);
    dbs.groups.insert([
        { name: 'grouh1' },
        { name: 'grouh2' },
        { name: 'grouh3' },
    ]);
    dbs.groups_users.insert([
        { groupId: 1, userId: 2 },
        { groupId: 1, userId: 4 },
        { groupId: 1, userId: 5 },
        { groupId: 2, userId: 1 },
        { groupId: 2, userId: 2 },
        { groupId: 2, userId: 3 },
        { groupId: 3, userId: 5 },
        { groupId: 3, userId: 6 },
    ]);
};
