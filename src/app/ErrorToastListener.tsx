'use client';
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { clearErrors } from '@/store/errorSlice';
import { useAppDispatch } from '@/store/hooks';

export default function ErrorToastListener() {
	const errors = useAppSelector((state) => state.errors.messages);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (errors.length) {
			errors.forEach((message) => toast.error(message));
			dispatch(clearErrors());
		}
	}, [errors, dispatch]);
	return <Toaster richColors theme="dark" />;
}
