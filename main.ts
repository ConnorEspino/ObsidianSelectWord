import { Editor, Plugin } from 'obsidian';

// This is a test comment. (Pay No Attention)
function selectWord(editor: Editor) {
    const pos = editor.getCursor();
    const wordRange = editor.wordAt(pos);
	if (wordRange) {
    	editor.setSelection({ line: pos.line, ch: wordRange.from.ch }, { line: pos.line, ch: wordRange.to.ch });
	}
}

export default class SelectWordPlugin extends Plugin {

	async onload() {
	
		// This adds an editor command on the current editor instance
		this.addCommand({
			id: 'select-current-word-hotkey',
			name: 'select the closest word to the caret in editor',
			hotkeys: [{modifiers: [], key: 'Escape'}],
			editorCallback: (editor: Editor) => {
				selectWord(editor);
			}
		});
	}
	onunload() {
	}
}