//importing libraries
const express = require('express')
const path = require('node:path')  //can also be with 'path'
const cors = require('cors')
//port config
const PORT = process.env.PORT || 5000

//creating the server object
const server = express();
server.use(express.json()) //letting the server use json in body request
server.use(cors()) 
 
server.use('/api/users', require('./Routes/users'))  //creating a routing for api/users from users.js in Routes folder
server.use('/api/stores',require('./Routes/stores'))

//setting all files in dist folder as static files
server.use(express.static(path.join(__dirname, 'dist'))) 

//connecting react to the server
server.get('/*',async(req,res)=>{
    try {
        res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'))
    } catch (error) {
        res.status(500).json({error})
    }
})


//server code (routing)
server.get(`^/$|index(.html)?`, async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'))
})

server.get(`/about(.html)?`, async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'about.html'))
})

server.get(`/stores`, async (req, res) => {
    let arr = require('./db/stores.json')

    // let stores = [
    //     { id: 1, name: "Store1" },
    //     { id: 2, name: "Store2" },
    //     { id: 3, name: "Store3" },
    // ]

    res.status(200).json(arr)
})

//sending specific parameter(id)
server.get(`/stores/:id`, async (req, res) => {
    let { id } = req.params  //saving the name from the request parameters
    // let name = req.params.name
    let stores = require('./db/stores.json')
    // console.log(stores);
    // let stores = [
    //     { id: 1, name: "Computers", products: [{ id: 1, name: "PC" }, { id: 2, name: "Laptop" }, { id: 3, name: "Keyboard" }] },
    //     { id: 2, name: "Food", products: [{ id: 1, name: "Sandwich" }, { id: 2, name: "Pizza" }, { id: 3, name: "Fries" }] },
    //     { id: 3, name: "Items", products: [{ id: 1, name: "Item1" }, { id: 2, name: "Item2" }, { id: 3, name: "Item3" }] }
    // ]

    let store = stores.stores.find((s) => s.id == id)
    if (store)
        res.status(200).json(store)
    else
        res.status(404).json({ mge: 'No store found' })
})


//sending specific parameter(id) of store + item
server.get(`/stores/:id/:item`, async (req, res) => {
    let { id } = req.params  //saving the name from the request parameters
    let { item } = req.params
    // let name = req.params.name
    let stores = require('./db/stores.json')
    // let stores = [
    //     { id: 1, name: "Computers", products: [{ id: 1, name: "PC" }, { id: 2, name: "Laptop" }, { id: 3, name: "Keyboard" }] },
    //     { id: 2, name: "Food", products: [{ id: 1, name: "Sandwich" }, { id: 2, name: "Pizza" }, { id: 3, name: "Fries" }] },
    //     { id: 3, name: "Items", products: [{ id: 1, name: "Item1" }, { id: 2, name: "Item2" }, { id: 3, name: "Item3" }] }
    // ]

    let store = stores.stores.find((s) => s.id == id)
    // console.log(store);
    if (store) {
        let storeitem = store.products.find((i) => i.id == item)
        //    console.log(storeitem)
        if (storeitem)
            res.status(200).json(storeitem)
        else
            res.status(404).json({ mge: 'No item found in store' })
    }
    else
        res.status(404).json({ mge: 'No store found' })

})

server.post(`/stores/add`, async (req, res) => {
    let stores = require("./db/stores.json")
    //receiving the data from the get
    let { id, name, city, products } = req.body //from the request body
    //creating object store
    let s = { id, name, city, products }
    //adding new store to stores.json-->stores(arr)
    stores.stores.push(s)
    //posting the updated stores json
    res.status(201).json(stores)
})

//adding to specific store new product in products array
server.post(`/stores/add/:store`, async (req, res) => {
    let { store } = req.params
    // console.log(store);
    let stores = require("./db/stores.json")
    //receiving the data from the get
    let { id, name, price } = req.body //from the request body
    //creating object item to add to specific store
    let item = { id, name, price }
    //adding item to product in store 
    parStore = stores.stores.find((s) => s.id == store)  //finds the right store to add product
    // console.log(blah);
    // console.log(blah.products);
    parStore.products.push(item) //pushing new item into product arr in store
    //posting the updated store
    res.status(201).json(parStore)
})

//changing status for undefined pages with status 404
server.get(`/*`, async (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

//activating the server with port
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

//starting the port console command pnpm run dev
