import { InMemoryDb } from '../../db-repo';
import { User } from '../../modules/User/model/user.model';

export class UserDb extends InMemoryDb<User> {}
