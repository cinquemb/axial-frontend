import { defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert'
//GENERATE_SOURCEMAP=false
//NODE_ENV=production

/*
export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), mkcert()],
 	server: {
		cors: true,    
        https: true,
        port: 5172,
        proxy: {}
    },
    build: {
        outDir: 'build',
    },
});
*/

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), viteTsconfigPaths(), mkcert()],
        server: {
            cors: true,    
            https: true,
            port: 5172,
            proxy: {}
        },
        build: {
            outDir: 'build',
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
            'process.env.GENERATE_SOURCEMAP': env.GENERATE_SOURCEMAP,
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        }, 
    };
});