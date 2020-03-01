const express = require('express')
const multer = require('multer');
const mime = require('mime-types')
const uuidv4 = require('uuid').v4

module.exports = (options) => {

    let path = options.path || "./public"
    let max_size = options.max_size || 100
    console.log(max_size);
    

    // rename and save dir
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + "." + mime.extension(file.mimetype))
        }
    })

    // add storage and filter mime
    const upload = multer({
        // storage
        storage:storage ,

        // filter
        // fileFilter: (req, file, cb) => {
    
        //     // define blocked mimes
        //     let blockMime = ["txt"]
        
        //     // check mime types
        //     if ( blockMime.indexOf( mime.extension( file.mimetype ) ) > -1 ){
        //         cb(null , false)
        //     }else{
        //         cb(null, true)
        //     }
    
        // }
    });

    return {

        static: express.static(path),

        upload_mid: (req, res, next) => {

            let uploaded_file = req.file

            let payload = {
                name: uploaded_file.filename,
                mimetype:uploaded_file.mimetype,
                size:uploaded_file.size
            }

            req._payload = payload
            next()

        },

        uploads_mid: (req, res, next) => {

            let uploaded_files = req.files

            let payload = uploaded_files.map((uploaded_file) => {

                return {
                    name: uploaded_file.filename,
                    mimetype:uploaded_file.mimetype,
                    size:uploaded_file.size
                }

            })

            req._payload = payload
            next()

        },

        upload_single: upload.single("file"),
        upload_multiple: upload.array("files" , max_size),

    }

}