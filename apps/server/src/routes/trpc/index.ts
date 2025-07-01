import { router, publicProcedure } from '../../../../../packages/trpc/src';
import {analyzeRouter } from './analyze.trpc';
import { z } from 'zod';

export const appRouter = router({
  analyze:analyzeRouter
});