import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [tailwindcss(), react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'@pages': resolve(__dirname, 'src/pages'),
			'@types': resolve(__dirname, 'src/types'),
			'@contexts': resolve(__dirname, 'src/contexts'),
		},
	},
})
