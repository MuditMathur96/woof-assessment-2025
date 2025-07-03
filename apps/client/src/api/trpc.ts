import Configs from '@/lib/configs';
import type {AppRouter} from '../../../server/src';
import {createTRPCReact, httpBatchLink} from '@trpc/react-query';


export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links:[
        httpBatchLink({
            url:`${Configs.BACKEND_URL}/trpc`
        })
    ]
}) 