'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { WithAlertDialog } from './WithAlertDialog';
import WithTheme from './WithTheme';

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<WithAlertDialog>
					<WithTheme>{children}</WithTheme>
				</WithAlertDialog>
			</Provider>
		</QueryClientProvider>
	);
}
