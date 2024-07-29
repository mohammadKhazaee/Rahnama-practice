import { Request, Response } from 'express';
import { createExpenseDto } from '../modules/Expense/dto/create-expense.dto';
import { IExpenseService } from '../modules/Expense/expense.service';
import { BaseRouter } from '../types/BaseRouter.base';

export class ExpenseRouter extends BaseRouter {
    constructor(private expenseService: IExpenseService) {
        super();
        this.app.post('/', this.postCreateExpense);
    }

    private postCreateExpense = (req: Request, res: Response) => {
        const dto = createExpenseDto.parse(req.body);

        const expense = this.expenseService.createExpense(dto);

        res.status(201).send(expense);
    };
}
