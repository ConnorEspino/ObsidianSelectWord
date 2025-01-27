import { Editor, Plugin, EditorPosition, EditorRange, EditorRangeOrCaret } from 'obsidian';

enum RangeLevel {
	Character = 0,
	Word,						// Non-Special Characters from just after [the first lowercase character before the cursor] to just before [the first uppercase character after the cursor].
	CompoundWord, 				// Any combination of more than one word or character surrounded by whitespace. (editor.wordAt)
	LineContent, 				// All of the text on the line, but not the whitespace preceding or exceeding it. 
	Line,						// The entire content of the line.

	InsideBracket = 999,		// The content inside a bracket character (){}[]<>
	OutsideBracket,				// InsideBracket + the bracket characters selected as well.
	BracketBlock,				// Check before WholeFile to be a multi-line InsideBracket? After this check we'd have to continue increasing RangeLevel from InsideBracket. Possible lag if we implement this check?
	WholeFile
}

/* LETODO - Preferences
			Radio Button: 
				Select Word
				Expand Selection
					Checkbox: Start at First Whole Word
*/

// LETODO - Selecting the middle of () should start with the OutsideBracket RangeLevel
// LETODO - Special case for comments?
// LETODO - Need to always check BracketBlock before going to WholeFile.
// LETODO - If all whitespace, we should select all whitespace. (New RangeLevel?)

function isWhitespace(string : string) : boolean {
	if (string.length == 0)
		return true;
	const whitespaceChars = [' ', '\t', '\n', '\r', '\f'];
	const chars = [...string];
	let isWhitespace : boolean = false;
	chars.forEach((char) => {
		if (whitespaceChars.includes(char)) {
			isWhitespace = true;
		}
	});
	//console.log("String: " + string + "\nIsWhitespace: " + isWhitespace);
	return isWhitespace;
}

function getCharacterSelection(line : string, originalPos : EditorPosition) : EditorRangeOrCaret {
	let fromPos : EditorPosition = {...originalPos};
	let toPos : EditorPosition = {...originalPos};
	if (isWhitespace(line.charAt(toPos.ch)))
		fromPos.ch = originalPos.ch - 1;
	else
		toPos.ch = originalPos.ch + 1;

	const range : EditorRangeOrCaret = {from: fromPos, to: toPos};
	return range;
}

function getWordSelection(editor : Editor, line : string, originalPos : EditorPosition) : EditorRangeOrCaret {
	// LETODO
	let fromPos : EditorPosition = originalPos;
	let toPos : EditorPosition = originalPos;
	let range : EditorRangeOrCaret = {from: originalPos};
	return range;
}

function getCompoundWordSelection(editor : Editor, originalPos : EditorPosition) : EditorRangeOrCaret {
	const wordAtRange : EditorRange | null = editor.wordAt(originalPos);
	let finalRange : EditorRangeOrCaret = {from: originalPos};
	if (wordAtRange)
		finalRange = wordAtRange;
	else
		console.error("Invalid editor.wordAt return value.");
	return finalRange;
}

function getRange(editor: Editor) : EditorRangeOrCaret {
    const originalPos : EditorPosition = editor.getCursor();
	const line : string = editor.getLine(originalPos.line);
	let finalRange : EditorRangeOrCaret = {from: originalPos};
	let rangeLevel : RangeLevel = RangeLevel.CompoundWord; // LETODO - Need to store previous range. If it hasn't changed, then the next time the command is run move it to the next RangeLevel (editor.somethingSelected())

	if (line.length == 0) {
		rangeLevel = RangeLevel.WholeFile;
	}

	switch (Number(rangeLevel)) {
		case RangeLevel.Character: {
			finalRange = getCharacterSelection(line, originalPos);
			break;
		}
		case RangeLevel.Word: {
			finalRange = getWordSelection(editor, line, originalPos);
			break;
		}
		case RangeLevel.CompoundWord: {
			finalRange = getCompoundWordSelection(editor, originalPos);
			break;
		}
	}
	// (editor : Editor, originalPos : Editor*Position) select where * is, notice it selects the argument following the ", "
	
	//console.log(finalRange);
	return finalRange;
}

function selectWord(editor: Editor) {
	const range : EditorRangeOrCaret = getRange(editor);
	editor.setSelection(range.from, range.to);
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