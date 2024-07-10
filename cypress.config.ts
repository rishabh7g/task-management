import { defineConfig } from 'cypress';
import getWebpackConfig from './webpack.config';

const webpackConfig = getWebpackConfig({ env: 'dev' });

export default defineConfig({
    component: {
        specPattern: 'src/**/*.cy.{js,ts,jsx,tsx}',
        devServer: {
            framework: 'react',
            bundler: 'webpack',
            webpackConfig,
        },
    },
});
