module.exports = (options) => {
    
    let custom_static_path = options.custom_static_path || "/"
    let static_name = options.static_name || "public"
    let controller_name = options.controller_name || "files"

    return {
        
        [static_name]: {

            get: {
                path: custom_static_path,
                method: "use",
                middlewares:["static"],
                controller: static_name,
                action: "get"
            }

        },

        [controller_name]: {

            upload: {
                path: "/upload",
                method: "post",
                middlewares: ["upload_single", "upload_mid"],
                controller: controller_name,
                action: "upload"
            },

            uploads: {
                path: "/uploads",
                method: "post",
                middlewares: ["upload_multiple", "uploads_mid"],
                controller: controller_name,
                action: "uploads"
            },

        }

    }

}