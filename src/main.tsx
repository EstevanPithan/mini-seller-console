import { Providers } from './Providers.tsx'
import { router } from './routes/router.tsx'
import './styles/index.css'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(<Providers router={router} />)
