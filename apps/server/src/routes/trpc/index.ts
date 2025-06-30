import { router, publicProcedure } from '../../../../../packages/trpc/src';
import { z } from 'zod';

export const appRouter = router({
  ping: publicProcedure.query(() => 'pong'),
});