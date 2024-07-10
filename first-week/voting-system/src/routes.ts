import { Router } from "express";
import {
	getIndex,
	patchProposal,
	postLogin,
	postPlan,
	postProposal,
	postSignup,
	postVote,
} from "./controllers";
import { isAuth } from "./middlewares/is-auth";

const router = Router();

router.get("/", getIndex);

router.post("/auth/signup", postSignup);

router.post("/auth/login", postLogin);

router.post("/plan", isAuth, postPlan);

router.post("/Proposal", isAuth, postProposal);

router.patch("/Proposal/:proposalId", isAuth, patchProposal);

router.post("/vote", isAuth, postVote);

export default router;
