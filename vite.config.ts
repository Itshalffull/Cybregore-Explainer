import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import claudeBridge from './server/claude-bridge'

export default defineConfig({
  plugins: [react(), claudeBridge()],
})
