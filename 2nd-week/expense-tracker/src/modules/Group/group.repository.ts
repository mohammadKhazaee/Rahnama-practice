import { GroupUser } from '../../databases/groups-users/group-user.model';
import { DbRepo } from '../../db-repo';
import { UserId } from '../User/model/user.model';
import { Group, GroupId } from './model/group.model';

export interface IGroupRepository {
    findById(groupId: number): Group | undefined;
    doesMemberExist(groupId: GroupId, userId: UserId): boolean;
}

export class GroupRepository implements IGroupRepository {
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
