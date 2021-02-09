module.exports = {
    map: true,
    plugins:[
        require("cssnano")(),
        require("postcss-preset-env")(),
    ],
}