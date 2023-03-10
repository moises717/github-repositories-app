import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { App } from './App';
import './index.css';

const Client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<QueryClientProvider client={Client}>
		<App />
		<ReactQueryDevtools />
	</QueryClientProvider>,
);
