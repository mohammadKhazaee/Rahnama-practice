import { InMemoryDb } from '../../db-repo';
import { GroupUser } from './group-user.model';

export class GroupsUsersDb extends InMemoryDb<GroupUser> {}
