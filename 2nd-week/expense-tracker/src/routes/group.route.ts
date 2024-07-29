import { Handler } from 'express';
import { z } from 'zod';
import { IGroupService } from '../modules/Group/group.service';
import { BaseRouter } from '../types/BaseRouter.base';

export type Settlement = {
    debtorId: number;
    creditorId: number;
    amount: number;
};

export class GroupRouter extends BaseRouter {
    constructor(private groupService: IGroupService) {
        super();
        this.app.get('/:groupId/settlements', this.getSettlements);
    }

    private getSettlements: Handler = (req, res) => {
        const groupId = z.coerce.number().parse(req.params.groupId);

        const settlements = this.groupService.calculateSettlement(groupId);

        res.status(200).send(settlements);
    };
}
