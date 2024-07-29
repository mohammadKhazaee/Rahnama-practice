import { NotFoundError } from '../../utility/Application-error';
import { GroupService } from '../Group/group.service';
import { GetExpenseDto } from './dto/get-expense.dto';
import { UserRepository } from './user.repository';

export class UserService {
    constructor(
        private userRepo: UserRepository,
        private groupService: GroupService
    ) {}

    doesUserExist(userId: number): boolean {
        const user = this.userRepo.findById(userId);
        return user !== undefined;
    }

    getExpenseMade({ groupId, userId }: GetExpenseDto) {
        if (this.groupService.isUserMember({ groupId, userId })) {
            const group = this.groupService.findGroupById(groupId);
            const expenseMade = group.expenses.filter(
                (e) => e.userId === userId
            );
            return expenseMade;
        }
    }

    getExpenseReceived({ groupId, userId }: GetExpenseDto) {
        if (this.groupService.isUserMember({ groupId, userId })) {
            const group = this.groupService.findGroupById(groupId);
            const expenseMade = group.expenses.filter(
                (e) => e.userId !== userId
            );
            return expenseMade;
        }
    }

    getUserById(userId: number) {
        const user = this.userRepo.findById(userId);
        if (!user) throw new NotFoundError("couldn't find the user");
        return user;
    }
}
