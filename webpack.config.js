const path = require( 'path' );
// console.log( __dirname ); && node webpack.config.js for folder name
// webpack.js.org
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

module.exports = ( env ) => {

    const isProduction = env === "production";
    const CSSExtract = new ExtractTextPlugin( "styles.css" );

    return {
        entry : './src/app.js',
        output : {
            path : path.join( __dirname, 'public' ), 
            filename : 'bundle.js'
        },
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    fallback: "style-loader",
                    use : [
                        //Order should be accurate
                        {
                            loader:"css-loader",
                            options: {
                                sourceMap : true
                            }
                        },
                        {
                            loader:"sass-loader",
                            options: {
                                sourceMap : true
                            }
                        }
                    ]
                })
            },{
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }]
        },
        plugins:[
            CSSExtract
        ],
        devtool: isProduction ? "source-map" : "inline-source-map", //cheap-module-eval-source-map //inline-source-map(seperate css)
        devServer:{
            contentBase: path.join( __dirname, "public" ),
            compress: true,
            historyApiFallback: true
        }
    };

}
