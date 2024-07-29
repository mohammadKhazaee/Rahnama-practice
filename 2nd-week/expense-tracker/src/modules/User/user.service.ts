import {
    ApplicationError,
    NotFoundError,
} from '../../utility/Application-error';
import { Expense } from '../Expense/model/expense.model';
import { IGroupService } from '../Group/group.service';
import { GetExpenseDto } from './dto/get-expense.dto';
import { User } from './model/user.model';
import { IUserRepository } from './user.repository';

export interface IUserService {
    doesUserExist(userId: number): boolean;
    getExpenseMade({ groupId, userId }: GetExpenseDto): Expense[] | never;
    getExpenseReceived({ groupId, userId }: GetExpenseDto): Expense[] | never;
    getUserById(userId: number): User | never;
}

export class UserService implements IUserService {
    constructor(
        private userRepo: IUserRepository,
        private groupService: IGroupService
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
        throw new ApplicationError(500, 'Unexpected error');
    }

    getExpenseReceived({ groupId, userId }: GetExpenseDto) {
        if (this.groupService.isUserMember({ groupId, userId })) {
            const group = this.groupService.findGroupById(groupId);
            const expenseMade = group.expenses.filter(
                (e) => e.userId !== userId
            );
            return expenseMade;
        }
        throw new ApplicationError(500, 'Unexpected error');
    }

    getUserById(userId: number): User | never {
        const user = this.userRepo.findById(userId);
        if (!user) throw new NotFoundError("couldn't find the user");
        return user;
    }
}
