import { Handler, Router } from 'express';
import { getExpenseDto } from '../modules/User/dto/get-expense.dto';
import { UserService } from '../modules/User/user.service';
import { BaseRouter } from '../types/BaseRouter.base';

export class UserRouter extends BaseRouter {
    constructor(private userService: UserService) {
        super();
        this.app.get(
            '/:userId/groups/:groupId/expenses/made',
            this.getExpenseMade
        );

        this.app.get(
            '/:userId/groups/:groupId/expenses/received',
            this.getExpenseReceived
        );
    }

    private getExpenseMade: Handler = (req, res) => {
        const dto = getExpenseDto.parse(req.params);

        const expenses = this.userService.getExpenseMade(dto);

        res.status(200).send(expenses);
    };

    private getExpenseReceived: Handler = (req, res) => {
        const dto = getExpenseDto.parse(req.params);

        const expenses = this.userService.getExpenseReceived(dto);

        res.status(200).send(expenses);
    };
}
