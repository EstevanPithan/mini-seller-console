import { QueryProvider } from './contexts/QueryProvider'
import { ThemeProvider } from './contexts/ThemeContext'
import { router } from './routes/router'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'

type ProvidersProps = {
	router: typeof router
}

export function Providers(props: ProvidersProps) {
	return (
		<StrictMode>
			<ThemeProvider>
				<QueryProvider>
					<RouterProvider router={props.router} />
				</QueryProvider>
			</ThemeProvider>
		</StrictMode>
	)
}
