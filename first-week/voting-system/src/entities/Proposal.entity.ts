import ApplicationError from "../utils/ApplicationError";
import { Plan } from "./Plan.entity";

export const proposals: Proposal[] = [];

export class Proposal {
	private id: number;
	private votesCount: number;

	constructor(
		private title: string,
		private description: string,
		private planId: number
	) {
		this.votesCount = 0;
		this.id = proposals.length;
	}

	submit = (): void | never => {
		const targetedPlan = Plan.find(this.planId);
		targetedPlan.acceptProposal(this.id);
		proposals.push(this);
	};

	update = (title: string, description: string): void => {
		this.title = title;
		this.description = description;
	};

	receiveVote = (): void | never => {
		const plan = Plan.find(this.planId);
		if (plan.checkVoteDeadline()) this.votesCount++;
	};

	static find = (proposalId: Proposal["id"]): Proposal | never => {
		const foundProposal = proposals.find((p) => p.id === proposalId);

		if (!foundProposal)
			throw new ApplicationError(`couldn't find the proposal`, 404);

		return foundProposal;
	};
}
