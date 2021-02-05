const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                parser: {
                    harmony: true,
                  },
            }
        ]
    }
};