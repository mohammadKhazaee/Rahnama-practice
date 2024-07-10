import { RequestHandler } from "express";
import { User, users } from "./entities/User.entity.base";
import {
	AuthInput,
	PlanInput,
	ProposalInput,
	ProposalUpdateInput,
	userRoles,
	VoteInput,
} from "./types/type";
import ApplicationError from "./utils/ApplicationError";
import { Plan, plans } from "./entities/Plan.entity";
import { Proposal, proposals } from "./entities/Proposal.entity";
import { Vote, votes } from "./entities/Vote.entity";

export const getIndex: RequestHandler = (req, res, next) => {
	res.status(200).json({ plans, proposals, votes, users });
};

export const postSignup: RequestHandler = (req, res, next) => {
	const { username, password, role }: AuthInput = req.body;

	if (!Object.keys(userRoles).includes(role))
		return next(new ApplicationError("invalid user role", 422));

	if (User.exists(username))
		return next(new ApplicationError("user already exists", 409));

	const userConstructor = userRoles[role].constructor;
	const createdUser = new userConstructor(username, password);
	createdUser.signup();

	res.status(201).json({ user: createdUser });
};

export const postLogin: RequestHandler = (req, res, next) => {
	const { username, password, role }: AuthInput = req.body;

	if (!Object.keys(userRoles).includes(role))
		return next(new ApplicationError("invalid user role", 422));

	const userConstructor = userRoles[role].constructor;
	const createdUser = new userConstructor(username, password);

	try {
		const token = createdUser.login();
		res.status(200).json({ token });
	} catch (error) {
		next(error);
	}
};

export const postPlan: RequestHandler = (req, res, next) => {
	if ((req as any).userInfo.role !== "Admin")
		return next(new ApplicationError("Not authorized", 403));

	const { title, description, proposalDeadline, votingDeadline }: PlanInput =
		req.body;

	if (!title || !description || !proposalDeadline || !votingDeadline)
		return next(new ApplicationError("input is missing", 422));

	const createdPlan: Plan = new Plan(
		title,
		description,
		proposalDeadline,
		votingDeadline
	);

	createdPlan.submit();

	res.status(200).json({
		messsage: "plan created",
		plan: createdPlan,
	});
};

export const postProposal: RequestHandler = (req, res, next) => {
	if ((req as any).userInfo.role !== "Representative")
		return next(new ApplicationError("Not authorized", 403));

	const { title, description, planId }: ProposalInput = req.body;
	console.log(req.body);

	if (!title || !description || planId === undefined)
		return next(new ApplicationError("input is missing", 422));

	const createdProposal: Proposal = new Proposal(title, description, planId);

	try {
		createdProposal.submit();
	} catch (error) {
		return next(error);
	}

	res.status(201).json({
		messsage: "proposal submited to the plan",
		proposal: createdProposal,
	});
};

export const patchProposal: RequestHandler = (req, res, next) => {
	if ((req as any).userInfo.role !== "Representative")
		return next(new ApplicationError("Not authorized", 403));

	const { title, description }: ProposalUpdateInput = req.body;
	const proposalId = req.params.proposalId;

	if (!proposalId || Number.isNaN(+proposalId)) return next();

	if (!title || !description)
		return next(new ApplicationError("input is missing", 422));

	const targetedProposal = Proposal.find(+proposalId);

	targetedProposal.update(title, description);

	res.status(200).json({ messsage: "hi" });
};

export const postVote: RequestHandler = (req, res, next) => {
	const { proposalId }: VoteInput = req.body;

	if (!proposalId || Number.isNaN(+proposalId)) return next();

	const createdVote: Vote = new Vote(proposalId);

	try {
		createdVote.submit();
	} catch (error) {
		return next(error);
	}

	res.status(201).json({ messsage: "vote submited", vote: createdVote });
};
