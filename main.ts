import { Editor, Plugin } from 'obsidian';

function selectWord(editor: Editor) {
    const pos = editor.getCursor();
    const wordRange = editor.wordAt(pos);
	if (wordRange) {
    	editor.setSelection({ line: pos.line, ch: wordRange.from.ch }, { line: pos.line, ch: wordRange.to.ch });
	}
}

export default class SelectWordPlugin extends Plugin {

	async onload() {
		this.addCommand({
			id: 'select-word',
			name: 'select the closest word to the caret in editor',
			editorCallback: (editor: Editor) => {
				selectWord(editor);
			}
		});
	}
	
	onunload() {
	}
}
