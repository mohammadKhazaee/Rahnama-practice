import { Expense } from '../../Expense/model/expense.model';
import { User } from '../../User/model/user.model';

export interface Group {
    id: number;
    name: string;
    users: User[];
    expenses: Expense[];
}

export interface GroupEntity {
    id: number;
    name: string;
}

export type GroupId = Group['id'];
