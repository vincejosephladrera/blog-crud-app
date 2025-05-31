'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { WithAlertDialog } from './WithAlertDialog';

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<WithAlertDialog>{children}</WithAlertDialog>
			</Provider>
		</QueryClientProvider>
	);
}
