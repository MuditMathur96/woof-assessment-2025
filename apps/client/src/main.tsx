import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './components/shared/layout.tsx'

import { trpc } from './api/trpc.ts'
import { httpBatchLink } from '@trpc/client';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <trpc.Provider
    client={trpc.createClient({
      links:[
        httpBatchLink({
          url:"http://localhost:4000/trpc"
        })
      ]
    })}

    queryClient={queryClient}
    >
      <QueryClientProvider
      client={queryClient}
      >
        <Layout>
        <App />
        </Layout>

      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
)
