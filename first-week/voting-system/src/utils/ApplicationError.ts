export default class ApplicationError extends Error {
	constructor(public message: string, public statusCode: number) {
		super(message);
	}
}
