import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'

import './App.css'
import { trpc } from './lib/trpc'

function App() {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:3000/trpc',
					// You can pass any HTTP headers you wish here
					// async headers() {
					// return { 'Content-Type': 'application/json' }
					// },
				}),
			],
		})
	)
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Ui />
			</QueryClientProvider>
		</trpc.Provider>
	)
}

const Ui = () => {
	const userQuery = trpc.getUserById.useQuery('id_bilbo')
	// const userCreator = trpc.createUser.useMutation()

	return (
		<div>
			<span>{userQuery.data?.name}</span>
		</div>
	)
}

export default App
