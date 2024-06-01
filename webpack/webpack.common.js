const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: path.resolve( __dirname, '..', './src/index.tsx') /* tell webpack where is the entry point */,
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
         src: path.resolve(__dirname, '..', './src'),
      },
   } /* resolve imports, it will first look for .tsx, then .ts, and then .js */,
   module: {
      rules: [
         {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [{ loader: 'babel-loader' }],
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
         },
         {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/,
            type: 'asset/resource',
         },
         {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
         },
      ],
   } /* define module rules */,
   output: {
      path: path.resolve(__dirname, '..', './build'),
      filename: 'bundle.js',
   } /* where to store all the build files */,
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, '..', './src/index.html'),
      }),
   ] /* define plugins */,
};





























// frontend code: 
// -- src [index.js, index.html, index.css] 
//    -> build using webpack 
//    -> dist [bundle.js, index.html, index.css]


// what are module system?
// -- a way to organize code in a way that is reusable and maintainable

// why do we need module system?
// -- to avoid global scope pollution

// commonJs module system
// -- require() and module.exports

// ES6 module system
// -- import and export


// where should we use commonJs module system?
// -- in nodejs environment [local system or server side code]

// where should we use ES6 module system?
// -- in browser environment [src/index.js, src/index.html, src/index.css]

// what is ES?
// -- EcmaScript, a standard for scripting languages like JavaScript

// what is ES5 or ES6?
// -- version of EcmaScript

// When did they launched ES5?
// -- 2009

// When did they launched ES6?
// -- 2015

// when did they launched ES7?
// -- 2016

// when did they launched ES8?
// -- 2017

// when did they launched ES9?
// -- 2018

// when did they launched ES10?
// -- 2019

// when did they launched ES11?
// -- 2020

// when did they launched ES12?
// -- 2021

// when did they launched ES13?
// -- 2022

// when did they launched ES14?
// -- 2023



