import { promises as fs } from 'fs'
import path from 'path'

const filePath = 'src/types/icons-type.ts'
const iconsDir = path.resolve('src/icons')

async function genarateIconNameType() {
	try {
		const iconFiles = await fs.readdir(iconsDir)
		const iconNames = iconFiles.filter((file) => file.endsWith('.tsx')).map((file) => file.replace('Icon.tsx', ''))

		const content = await fs.readFile(filePath, 'utf-8')
		console.log('Current content:', content)

		const typeContent = `// Auto-generated file - DO NOT EDIT
export type IconName = ${'\n | ' + iconNames.map((name) => `'${name}'`).join('\n | ')}
`

		await fs.writeFile(filePath, typeContent, 'utf-8')

		console.log(`Updated icon types with ${iconNames.length} icons`)
		console.log('Icons:', iconNames)
	} catch (error) {
		console.error('Error updating file:', error)
	}
}

genarateIconNameType()
