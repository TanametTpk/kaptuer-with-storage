const fs = require('fs-extra')

module.exports = (options) => {

    let path = options.path || "./public"

    // create path
    fs.ensureDirSync(path)

    let loads = [
        {
            module: require('./middlewares'),
            name: "middlewares"
        },
        {
            module: require('./services'),
            name: "services"
        },
        {
            module: require('./routes'),
            name: "routes"
        },
        {
            module: require('./configs/global'),
            name: "globals"
        }
    ]

    return loads.reduce((all_modules, load) => {

        let jsx = load.module(options)
        return {
            ...all_modules,
            [load.name]: jsx
        }

    }, {})

}