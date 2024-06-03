import packageJson from '../package.json'
import fs from 'node:fs/promises'

type ObsidianManifest = {
	author: string
	authorUrl: string
	description: string
	helpUrl: string
	id: string
	isDesktopOnly: boolean
	minAppVersion: string
	name: string
	version: string
}

const manifest: ObsidianManifest = {
	author: packageJson.author.name,
	authorUrl: packageJson.author.url,
	description: packageJson.description.replace(/\s+obsidian\s+/i, ' '),
	helpUrl: packageJson.homepage,
	id: packageJson.name,
	version: packageJson.version,
	...packageJson.obsidian,
}

await fs.mkdir('./dist', { recursive: true })
await fs.writeFile('./dist/manifest.json', JSON.stringify(manifest, undefined, 2))

// Obsidian's plugin review process also seems to require the manifest.json to
// be in the root of the repository, even though it's in the release...
await fs.writeFile('./manifest.json', JSON.stringify(manifest, undefined, 2))

console.log(`Generated Obsidian manifest.json file.`)
