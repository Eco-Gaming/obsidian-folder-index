import {TFile} from "obsidian";
import FolderIndexPlugin from "../main";
import * as typescriptPath from "path";

export function isIndexFileWithFile(file: TFile) {
	return isIndexFile(file.path)
}

export function isIndexFile(path: string) {
	if (isExcludedPath(path))
		return false
	const pathParts = path.split(/\//)
	if (pathParts[0] == FolderIndexPlugin.PLUGIN.settings.rootIndexFile)
		return true
	if (pathParts.length < 2)
		return false
	const fileName = pathParts[pathParts.length - 1]
	const folderName = pathParts[pathParts.length - 2] + ".md"
	return fileName == folderName || fileName == FolderIndexPlugin.PLUGIN.settings.rootIndexFile;
}

export function isExcludedPath(path: string) {
	for (const excludedFolder of FolderIndexPlugin.PLUGIN.settings.excludeFolders) {
		if (excludedFolder == "")
			continue
		if (RegExp(`^${excludedFolder}$`).test(path))
			return true;
	}
	return false
}

export function checkDepth(path: string) {

	// TODO: finish function

	// Use path module to determine path depth, by counting the number of directory separators
	const parsedPath = typescriptPath.parse(path);
	const depth = parsedPath.dir.split(typescriptPath.sep).length - 1;

	return depth >= FolderIndexPlugin.PLUGIN.settings.startingDepth
}
