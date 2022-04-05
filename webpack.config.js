const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

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
        }),
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            start_url: "../index.html", // specify homepage for the PWA relative to the location of the manifest file
            background_color: "#01579b",
            theme_color: "#ffffff",
            fingerprints: false, // we don't want to generate a unique fingerprint each time a new manifest is generated
            inject: false, // determines whether the link to manifest.json is added to the html
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })
    ],
    mode: 'development'
};