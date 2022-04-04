const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {
        filename: "[name].bundle.js", // name used in entry object will be used in place of [name] in each bundle.js file that is created.
        path: __dirname + "/dist", // output bundle files will be written to the dist folder
    },
    module: {
        rules: [ // this object will identify the type of files to pre-process using the test property to find a regex
            {
                test: /\.jpg$/i, // process any image file with the file extension .jpg
                use: [ // property where the actual loader is implemented
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]" // returns the nam eof the file w/ the file extension
                            },
                            publicPath: function(url) {
                                return url.replace("../", "/assets") // changes our assignment URL by replacing the ../ from our require() statement with /assets/
                            }
                        }
                    },
                    {
                        loader: "image-webpack-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder called report.html
        })
    ],
    mode: 'development'
};