import App from '@/App'
import { createBrowserRouter, RouteObject } from 'react-router'

export const routes: RouteObject[] = [
	{
		path: '/',
		Component: App,
	},
]

export const router = createBrowserRouter(routes)
