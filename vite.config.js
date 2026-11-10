import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Allow ngrok tunnel hostnames to reach the local dev and preview servers.
const tunnelHosts = ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.io']

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: { allowedHosts: tunnelHosts },
    preview: { allowedHosts: tunnelHosts },
})
