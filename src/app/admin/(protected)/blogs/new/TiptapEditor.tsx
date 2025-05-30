'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Editor } from '@tiptap/react';
import { useEffect } from 'react';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type TiptapEditorProps = {
	value: string;
	onChange: (content: string) => void;
};

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit, Underline],
		content: value ?? '<p></p>',
		editorProps: {
			attributes: {
				class: 'prose dark:prose-invert max-w-full min-h-[200px] focus:outline-none',
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	useEffect(() => {
		return () => editor?.destroy();
	}, [editor]);

	if (!editor) return null;

	return (
		<>
			{/* Toolbar */}
			<div className="flex flex-wrap gap-2 mb-2">
				{[1, 2, 3, 4].map((level) => (
					<ToolbarButton
						key={level}
						editor={editor}
						action="heading"
						level={level as Level}
						label={`H${level}`}
					/>
				))}

				<ToolbarButton editor={editor} action="bold" label="Bold" />
				<ToolbarButton editor={editor} action="italic" label="Italic" />
				<ToolbarButton editor={editor} action="underline" label="Underline" />
				<ToolbarButton editor={editor} action="bulletList" label="• List" />
				<ToolbarButton editor={editor} action="orderedList" label="1. List" />
				<ToolbarButton editor={editor} action="blockquote" label="❝ Quote" />
				{/* <ToolbarButton editor={editor} action="codeBlock" label="</> Code" /> */}
			</div>

			{/* Editor Content */}
			<EditorContent
				editor={editor}
				className=" max-w-full w-100% h-[400px] overflow-y-auto focus:outline-none p-6 bg-background break-all rounded-xl border"
			/>
		</>
	);
}

type ToolbarButtonProps = {
	editor: Editor | null;
	action: string;
	label: string;
	level?: Level;
};

function ToolbarButton({ editor, action, label, level }: ToolbarButtonProps) {
	if (!editor) return null;

	const isActive =
		action === 'heading' ? editor.isActive('heading', { level }) : editor.isActive(action);

	const onClick = () => {
		const chain = editor.chain().focus();

		if (action === 'heading') {
			if (!level) return; // level is required for headings
			chain.toggleHeading({ level }).run();
		} else if (['bold', 'italic', 'underline'].includes(action)) {
			chain.toggleMark(action).run();
		} else if (action === 'bulletList') {
			chain.toggleBulletList().run();
		} else if (action === 'orderedList') {
			chain.toggleOrderedList().run();
		} else if (action === 'blockquote') {
			chain.toggleBlockquote().run();
		} else if (action === 'codeBlock') {
			chain.toggleCodeBlock().run();
		}
	};

	return (
		<button
			onClick={onClick}
			type="button"
			className={`px-2 py-1 text-sm rounded border ${
				isActive ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'
			}`}
		>
			{label}
		</button>
	);
}
