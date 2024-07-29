import { ExpenseDb } from './expense/expense.database';
import { GroupDb } from './group/group.database';
import { GroupsUsersDb } from './groups-users/groups-users.database';
import { UserDb } from './user/user.database';

export const dbs = {
    expenses: new ExpenseDb(),
    groups: new GroupDb(),
    groups_users: new GroupsUsersDb(),
    users: new UserDb(),
};
