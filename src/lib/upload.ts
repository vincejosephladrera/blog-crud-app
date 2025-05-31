import { createClient } from './supabase/client';

export async function upload(file: File) {
	const supabase = createClient();
	const fileExt = file.name.split('.').pop();
	const fileName = `${Date.now()}.${fileExt}`;

	const { error } = await supabase.storage.from('images').upload(fileName, file, {
		cacheControl: '3600',
		upsert: true,
	});

	if (error) {
		throw error;
	}

	const { data } = supabase.storage.from('images').getPublicUrl(fileName);

	return data.publicUrl;
}
