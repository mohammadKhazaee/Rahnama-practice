import { Handler, Router } from 'express';
import { z } from 'zod';
import { GroupService } from '../modules/Group/group.service';
import { BaseRouter } from '../types/BaseRouter.base';

export type Settlement = {
    debtorId: number;
    creditorId: number;
    amount: number;
};

export const app = Router();

export class GroupRouter extends BaseRouter {
    constructor(private groupService: GroupService) {
        super();
        this.app.get('/:groupId/settlements', this.getSettlements);
    }

    private getSettlements: Handler = (req, res) => {
        const groupId = z.coerce.number().parse(req.params.groupId);

        const settlements = this.groupService.calculateSettlement(groupId);

        res.status(200).send(settlements);
    };
}
