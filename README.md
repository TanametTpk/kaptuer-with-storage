# What is this?

This package work with kaptuer for create storage file.

# Installation

`npm i --save kaptuer-with-storage`

then import

```
const kaptuer = require('kaptuer-open-api')
const storage = require('kaptuer-with-storage')

kaptuer.use(storage({
    path:"./public",
    static_name:"public" ,
    controller_name:"files",
    max_size: 3
}))

kaptuer.setup({
    port: <your port>
}).start()

```