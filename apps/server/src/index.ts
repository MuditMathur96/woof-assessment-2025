import express from 'express';
import { inferAsyncReturnType, TRPCError } from '@trpc/server';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routes/trpc';

import routes from './routes/rest';
import Configs from './configs/configs';
const app = express();

app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(bodyParser.json());
app.use(express.json());

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
