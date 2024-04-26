# Obsidian Select Word Plugin

![](./README%20Assets/ExampleGif.gif)

This is a simple plugin for Obsidian (https://obsidian.md) that selects the word that is closest to the Text Editor's caret.

I'm making this because no one else has and it drive me crazy to not have this as a hotkey.

The default hotkey is `Ctrl` + `W` because I make the rules around here. 
- To change this hotkey, open the Settings dialog, go to the Hotkeys panel and search for "Select Word". 
- Alternatively, you can click the + icon next to the plugin's on/off switch in the Community Plugins panel.

This is a very basic solution - if I want to improve it later, I might. 

## How to use (Development stuff)

- Clone this repo.
- Make sure your NodeJS is at least v16 (`node --version`).
- `npm i` or `yarn` to install dependencies.
- `npm run dev` to start compilation in watch mode.

## TODO: Adding your plugin to the community plugin list

- Check https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md
- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin.