export function toKebabCase(str: string) {
	return str
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, '')
		.replace(/\s+/g, '-');
}
