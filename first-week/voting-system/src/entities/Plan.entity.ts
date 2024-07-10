import { Seconds } from "../types/type";
import ApplicationError from "../utils/ApplicationError";
import { Proposal } from "./Proposal.entity";

export const plans: Plan[] = [];

export class Plan {
	private proposalDeadline: Date;
	private votingDeadline: Date;
	private proposals: Proposal["id"][] = [];
	private id: number;

	constructor(
		private title: string,
		private description: string,
		proposalDeadline: Seconds,
		votingDeadline: Seconds
	) {
		this.id = plans.length;

		this.proposalDeadline = new Date(Date.now() + proposalDeadline * 1000);
		this.votingDeadline = new Date(
			Date.now() + proposalDeadline * 1000 + votingDeadline * 1000
		);
	}

	submit = (): void => {
		plans.push(this);
	};

	static acceptProposal = (
		planId: Plan["id"],
		proposalId: Proposal["id"]
	): void => {
		const planIndex = plans.findIndex((plan) => plan.id === planId);

		if (!plans[planIndex]) throw new ApplicationError("wrong planId", 422);

		plans[planIndex].proposals = [
			...plans[planIndex].proposals,
			proposalId,
		];
	};
}
