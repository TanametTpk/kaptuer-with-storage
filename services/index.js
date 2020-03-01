module.exports = (options) => {

    let static_name = options.static_name || "public"
    let controller_name = options.controller_name || "files"

    return {
        
        [static_name]: {

            get: (req) => {
                // do nothing
                return {}
            }

        },

        [controller_name]: {

            upload: (req) => {

                return req._payload

            },

            uploads: (req) => {

                return req._payload

            }

        }

    }

}