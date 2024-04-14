import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    mode: "development",
    entry: "./index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname)  // add this line
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }

        ]
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Phaser 3 Webpack TypeScript with Bun',
            template: path.resolve(__dirname, "index.html")
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "static"),
                    to: path.resolve(__dirname, "build")
                }
            ]
        })
    ],
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build/static'),
        },
        compress: true,
        port: 3000,
        hot: true
    },
};

export default config;