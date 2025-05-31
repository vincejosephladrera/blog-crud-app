export default function ContentRenderer({ content }: { content: string }) {
	return <div className="dynamic-content" dangerouslySetInnerHTML={{ __html: content }} />;
}
