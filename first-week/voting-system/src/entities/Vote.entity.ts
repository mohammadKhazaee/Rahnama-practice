import { Proposal } from "./Proposal.entity";

export const votes: Vote[] = [];

export class Vote {
	private id: number;

	constructor(private proposalId: number) {
		this.id = votes.length;
	}

	submit = (): void | never => {
		votes.push(this);
		const targetedProposal = Proposal.find(this.proposalId);
		targetedProposal.receiveVote();
	};
}
