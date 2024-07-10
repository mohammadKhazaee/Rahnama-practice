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

	acceptProposal = (proposalId: Proposal["id"]): void | never => {
		if (Date.now() > this.proposalDeadline.getTime())
			throw new ApplicationError(
				"proposal submition deadline has passed",
				409
			);

		this.proposals = [...this.proposals, proposalId];
	};

	checkVoteDeadline = (): true | never => {
		if (Date.now() > this.votingDeadline.getTime())
			throw new ApplicationError(
				"vote submition deadline has passed",
				409
			);
		if (Date.now() < this.proposalDeadline.getTime())
			throw new ApplicationError(
				"vote submition time period will hasn't been started",
				409
			);
		return true;
	};

	static find = (planId: Plan["id"]): Plan | never => {
		const foundPlan = plans.find((p) => p.id === planId);

		if (!foundPlan)
			throw new ApplicationError(`couldn't find the plan`, 404);

		return foundPlan;
	};
}
