import { Admin } from "../entities/Admin.entity";
import { Plan } from "../entities/Plan.entity";
import { Proposal } from "../entities/Proposal.entity";
import { Representative } from "../entities/Representative.entity";
import { SimpleUser } from "../entities/SimpleUser.entity";
import { User } from "../entities/User.entity.base";

export type Seconds = number;

export const userRoles = {
	Admin: { name: "Admin", constructor: Admin },
	Representative: { name: "Representative", constructor: Representative },
	SimpleUser: { name: "SimpleUser", constructor: SimpleUser },
} as const;

export type UserRoles = keyof typeof userRoles;

export type AuthInput = {
	username: string;
	password: string;
	role: User["tag"];
};

export type PlanInput = {
	title: string;
	description: string;
	proposalDeadline: Seconds;
	votingDeadline: Seconds;
};

export type ProposalInput = {
	title: string;
	description: string;
	planId: Plan["id"];
};

export type ProposalUpdateInput = Partial<Omit<ProposalInput, "planId">>;

export type VoteInput = {
	proposalId: Proposal["id"];
};

export type TokenPayload = { username: string; role: UserRoles };
