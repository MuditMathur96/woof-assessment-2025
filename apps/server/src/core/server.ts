import express from 'express';
import { inferAsyncReturnType, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '../routes/trpc';

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}), // customize later
  }),
);


app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});

export type AppRouter = typeof appRouter;
