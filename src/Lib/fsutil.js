const fs = window.require('fs')
const path = window.require('path')

const constants = {
	DIRECTORY: 'directory',
	FILE: 'file'
}

function safeReadDirSync(p) {
	let dirData = {}
	try {
		dirData = fs.readdirSync(p)
	} catch(ex) {
		if (ex.code === "EACCES" || ex.code === "EPERM") {
			return null
		}
		else throw ex
	}
	return dirData
}

function directoryTree(baseDir, p, sortFn) {
	const name = path.basename(p)
  const item = {path: path.relative(baseDir, p), name}

	let stats

	try { stats = fs.statSync(p) }
	catch (e) { return null }

	if (stats.isFile()) {
		item.type = constants.FILE
	}
	else if (stats.isDirectory()) {
		let dirData = safeReadDirSync(p)
		if (dirData === null) return null

		item.children = dirData
			.map(child => directoryTree(baseDir, path.join(p, child), sortFn))
			.filter(e => !!e)
      .sort(sortFn)

		item.type = constants.DIRECTORY
	} else {
		return null
	}
	return item
}

function readFile(p) {
  return fs.readFileSync(p)
}

function writeFile(p, content) {
  return fs.writeFileSync(p, content)
}

function unlinkFile(p) {
  return fs.unlinkSync(p)
}

function isDirectory(p) {
  return fs.lstatSync(p).isDirectory()
}

function mkdir(p) {
  return fs.mkdirSync(p)
}

module.exports = {
  directoryTree,
  readFile,
  writeFile,
  unlinkFile,
  isDirectory,
  mkdir
}
