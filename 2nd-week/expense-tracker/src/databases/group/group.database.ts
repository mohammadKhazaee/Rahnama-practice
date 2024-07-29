import { Entity, GroupOption, InMemoryDb } from '../../db-repo';
import { Group } from '../../modules/Group/model/group.model';
import { ApplicationError } from '../../utility/Application-error';
import { dbs } from '../instances';

export class GroupDb extends InMemoryDb<Group> {
    find(properties: Partial<Group>, options?: GroupOption): Group[] {
        let groups = super.find(properties, options);
        if (!options) return groups;
        if (options.relations) {
            groups = groups.map((g) => {
                g.expenses = dbs.expenses.find({ groupId: g.id });
                return g;
            });

            groups = groups.map((g) => {
                const userIds = dbs.groups_users
                    .find({ groupId: g.id })
                    .map((gu) => gu.userId);
                const users = userIds.map((id) => {
                    const user = dbs.users.findOne({ id });
                    if (!user) throw new ApplicationError(500, 'db error');
                    return user;
                });
                g.users = users;
                return g;
            });
        }
        return groups;
    }

    findOne(
        properties: Partial<Group>,
        options?: GroupOption
    ): Group | undefined {
        const group = super.findOne(properties, options);
        if (!options || !group) return group;
        if (options.relations) {
            group.expenses = dbs.expenses.find({ groupId: group.id });

            const userIds = dbs.groups_users
                .find({ groupId: group.id })
                .map((gu) => gu.userId);
            const users = userIds.map((id) => {
                const user = dbs.users.findOne({ id });
                if (!user) throw new ApplicationError(500, 'db error');
                return user;
            });
            group.users = users;
        }
        return group;
    }
}
