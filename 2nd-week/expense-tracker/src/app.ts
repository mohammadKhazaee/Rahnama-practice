import { app } from './api';

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

app.listen(3000);
