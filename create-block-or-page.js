'use strict';

const fs = require('fs');

const isValidName = process.argv.length === 3 ? true : false;
const methodToCall = process.argv[1];
const newName = process.argv[2];
const DIR_PATH = `./src/${methodToCall}s/`;

function isNewNameAvailable(fileName) {
	fileName += methodToCall === 'block' ? '' : '.pug';
	return new Promise(resolve => {
		fs.stat(`${DIR_PATH}${fileName}`, available => {
			if (available) {
				resolve();
			}else {
				notify(`The name "${fileName}" is already in use.`);
			}
		});
	});
}

function createBlockFolder(blockName) {
	return new Promise(resolve => {
		fs.mkdir(`${DIR_PATH}${blockName}`, () => {
			resolve();
		});
	});
}

function createBlockFiles(blockName) {
	const blockContent = {
		pug: `include ../mixins/mixins\n\nmixin ${blockName}()\n\t+b.${blockName}&attributes(attributes)\n\t\tblock\n`,
		styl: `.${blockName}\n\tdisplay block`,
		js: ''
	};
	return new Promise(resolve => {
		for (const key in blockContent) {
			fs.writeFile(`${DIR_PATH}${newName}/${newName}.${key}`, blockContent[key], 'utf8', error => {
				if (error) { notify(`The block wasn't created. Something went wrong.`); }
			});
		}
	});
}

function notify(message) {
	console.log(`\n!!! ${message} !!!\n`);
}

function createBlock() {
	if (isValidName) {
	isNewNameAvailable(newName)
		.then(() => { createBlockFolder(newName); })
		.then(() => { createBlockFiles(newName); })
		.then(() => { notify(`The block ${newName} was successfully created.`); });
	}else {
		notify('The block must have a name and the name can\'t contain "space" symbol.');
	}
}

function createPage() {
	if (isValidName) {
		isNewNameAvailable(newName)
			.then(() => { 
				const pageContent = `extends /blocks/layout-default/layout-default\n\nblock head\n\t- var pageTitle = 'Page ${newName}';\n\nblock content`;
				fs.writeFile(`${DIR_PATH}${newName}.pug`, pageContent, 'utf8', error => {
					if (error) { notify(`The page wasn't created. Something went wrong.`); }
				});
			})
			.then(() => { notify(`The page "${newName}" was successfully created.`); });
	}else {
		notify('The page must have a name and the name can\'t contain "space" symbol.');
	}
}

const API = {
	block: createBlock,
	page: createPage
};

module.exports = API;
