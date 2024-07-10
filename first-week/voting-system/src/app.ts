import express, { ErrorRequestHandler } from "express";
import ApplicationError from "./utils/ApplicationError";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(router);

// 404 & error routes
app.use((req, res) => {
	res.status(404).json({ message: "Page Not Found." });
});

const handlerController: ErrorRequestHandler = (err, req, res, next) => {
	if (err instanceof ApplicationError)
		res.status(err.statusCode).json({ message: err.message });
	else res.status(500).json({ message: err.message });
};
app.use(handlerController);

app.listen(3000);
