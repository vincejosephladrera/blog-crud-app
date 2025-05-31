'use client';

import { PropsWithChildren, createContext } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useAppDispatch } from '@/store/hooks';
import { toast } from 'sonner';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/shadcn/alert-dialog';
import { clearAlert } from '@/store/alertSlice';
import { deleteBlog } from './admin/(protected)/blogs/api';

import { useMutation } from '@tanstack/react-query';

type AlertMethodsContext = {
	setOnCancelHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
	setOnConfirmHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
};

export const AlertMethods = createContext<AlertMethodsContext | undefined>(undefined);

export function WithAlertDialog({ children }: PropsWithChildren) {
	const alertContent = useAppSelector((state) => state.alert.content);

	const dispatch = useAppDispatch();

	//to refactor
	const { mutate: deleteBlogMutate } = useMutation({
		mutationFn: deleteBlog,
		onSuccess: (data) => {
			toast.success(`${data?.title} has been successfully deleted`);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<AlertDialog open={!!alertContent}>
			{children}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{alertContent?.title ?? 'Alert'}</AlertDialogTitle>
					<AlertDialogDescription>{alertContent?.message ?? 'Message'}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => {
							dispatch(clearAlert());
						}}
					>
						{alertContent?.cancelLabel ?? 'Cancel'}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							if (alertContent?.slug) {
								dispatch(clearAlert());
								deleteBlogMutate({ slug: alertContent.slug });
								window.location.reload();
							}
						}}
					>
						{alertContent?.confirmLabel ?? 'Continue'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
