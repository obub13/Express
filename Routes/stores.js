//import libraries + creating router obj
const StoreRouter = require('express').Router();
const stores = require('../db/stores.json')
const storesArr = stores.storesArr

//creating routes
StoreRouter.get('/', async (req, res) => {
    res.status(200).json(stores)
})


//sending specific parameter(id)
StoreRouter.get(`/:id`, async (req, res) => {
    let { id } = req.params  //saving the name from the request parameters
    //let id = req.params.id
    let store = storesArr.find((s) => s.id == id)
    if (store)
        res.status(200).json(store)
    else
        res.status(404).json({ mge: 'No store found' })
})


//sending specific parameter(id) of store + item
StoreRouter.get(`/:id/:item`, async (req, res) => {
    let { id } = req.params  //saving the name from the request parameters
    let { item } = req.params

    let store = storesArr.find((s) => s.id == id)
    if (store) {
        let storeitem = store.products.find((i) => i.id == item)
        console.log(storeitem);
        if (storeitem)
            res.status(200).json(storeitem)
        else
            res.status(404).json({ mge: 'No item found in store' })
    }
    else
        res.status(404).json({ mge: 'No store found' })

})

//adding to arr

StoreRouter.post(`/add`, async (req, res) => {
    //receiving the data from the get
    let { id, name, city, products } = req.body //from the request body

    //creating object store
    let s = { id, name, city, products }

    //adding new store to stores.json-->stores(arr)
    storesArr.push(s)

    //posting the updated stores json
    res.status(201).json(stores)
})


//adding to specific store a new product in products array
StoreRouter.post(`/add/:store`, async (req, res) => {
    let { store } = req.params

    //receiving the data from the get
    let { id, name, price } = req.body //from the request body

    //creating object item to add to specific store
    let item = { id, name, price }

    //adding item to product in store 
    parStore = storesArr.find((s) => s.id == store)  //finds the right store to add product

    parStore.products.push(item) //pushing new item into product arr in store

    //posting the updated store
    res.status(201).json(parStore)
})

module.exports = StoreRouter