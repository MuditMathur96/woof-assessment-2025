import express from 'express';
//Middlewares
import cors from 'cors';
import bodyParser from 'body-parser';
import {rateLimit} from 'express-rate-limit';
import morgan from "morgan";

//TRPC 
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routes/trpc';

const limiterMiddleware = rateLimit({
  windowMs:1*60*1000, //1minutes
  limit:20,

})

import routes from './routes/rest';
import Configs from './configs/configs';
import { generateErrorResponse } from './utils/responseGenerator';
const app = express();

app.use(cors({
  origin:Configs.FRONTEND_URL
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(limiterMiddleware);
app.use(morgan("dev"))

app.use(routes);
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}), // customize later
  }),
);


app.listen(Configs.PORT, () => {
  console.log('Server running on port:',Configs.PORT);
});

export type AppRouter = typeof appRouter;
