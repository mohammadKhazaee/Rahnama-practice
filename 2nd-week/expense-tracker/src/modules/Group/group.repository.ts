import { GroupUser } from '../../databases/groups-users/group-user.model';
import { DbRepo } from '../../db-repo';
import { User, UserId } from '../User/model/user.model';
import { Group, GroupId } from './model/group.model';

export class GroupRepository {
    constructor(
        private groupRepo: DbRepo<Group>,
        private groupUserRepo: DbRepo<GroupUser>
    ) {}

    findById(groupId: number): Group | undefined {
        return this.groupRepo.findOne({ id: groupId }, { relations: true });
    }

    doesMemberExist(groupId: GroupId, userId: UserId): boolean {
        const member = this.groupUserRepo.findOne({ userId, groupId });
        return member !== undefined;
    }
}
