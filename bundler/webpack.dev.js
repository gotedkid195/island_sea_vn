const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const portFinderSync = require('portfinder-sync')

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            host: '0.0.0.0',
            port: portFinderSync.getPort(8080),
            static: {
                directory: './dist'
            },
            watchFiles: ['src/**/*'],
            open: true,
            allowedHosts: 'all',
            hot: true,
            onListening: function(devServer) {
                if (!devServer) {
                    throw new Error('webpack-dev-server is not defined');
                }

                const port = devServer.server.address().port;
                const local = `http://localhost:${port}`;
                const network = `http://0.0.0.0:${port}`;
                
                console.log(`Project running at:\n  - ${infoColor(local)}\n  - ${infoColor(network)}`);
            }
        }
    }
)
