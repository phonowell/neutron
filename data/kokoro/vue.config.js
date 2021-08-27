"use strict";
module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 80,
    },
    transpileDependencies: [
        '@bilibili/*',
        '@bilibili-firebird/*',
    ],
};
