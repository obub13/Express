import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Stores() {
    // const data = useContext(UserContext) //saves data object that contains users, stores arrays
    // const stores = data.stores //saves the stores array

    const [stores, setStores] = useState([])
    const [stores1, setStores1] = useState([])
    // const [newStore, setNewStore] = useState({ key: "", id: "", name: "", city: "" })
    const [newStore, setNewStore] = useState({})
    const params = useParams()

    //store variables
    // const [storeKey, setStoreKey] = useState()
    // const [storeID, setStoreID] = useState()
    const [storeName, setStoreName] = useState()
    const [storeCity, setStoreCity] = useState()

    //item variables
    // const [itemID, setItemID] = useState()
    const [itemName, setItemName] = useState()
    const [itemPrice, setItemPrice] = useState()






    useEffect(() => {
        console.log("first useEffect ran")
        async function LoadStores() {
            try {
                let res = await fetch('http://localhost:5000/api/stores')//fetches stores.json file
                let data = await res.json()//JSON obj that holds the stores array
                let storesArray = data.storesArr  //takes the storesArr directly from stores.json file
                setStores(storesArray)
            } catch (error) {
                console.log(error);
            }
        }
        LoadStores()
    }, [])

    useEffect(() => {
        console.log("second useEffect ran -- renders the stores whenever theres a change")
        console.log(stores, 'effect');
        if (params.id) {
            if (params.item) {
                setStores1(showByProductID())
            } else
                setStores1(showbyID())
        }
        else {
            setStores1(showStores())
        }
    }, [stores])

    // const { stores } = useContext(UserContext)
    const showStores = () => {
        if (params.id) {
            if (params.item) {
                return showByProductID()
            }
            else
                return showbyID()
        }
        else
            return (
                stores?.map((s, index) => {
                    return (
                        <div /*style={{display:"inline-block"}}*/ key={s.key}>
                            <p>{s.name}</p>
                            <p>{s.city}</p>
                            {showProducts(s.products)}<br />
                        </div> 
                    )
                })
            )
    }

    //runs on products in each of store
    const showProducts = (products) => {
        const products1 = products?.map((item) => {
            return (
                <div key={item.id} >
                    <p >{item.id}, {item.name}, {item.price}</p>
                </div>
            )
        })
        return products1
    }

    const showbyID = () => {
        let shop;
        console.log(stores);
        if (stores.length === 0) {
            return (
                <div>
                    Loading
                </div>
            )
        }
        if (stores.length > 0) {
            console.log('full');
            console.log(stores, 'aftefull');
            shop = stores?.find((i) => i.key === parseInt(params.id))
            console.log(shop);
            return (
                <div>
                    <p>{shop.id}</p>
                    <p>{shop.name}</p>
                    <p>{shop.city}</p>
                    {showProducts(shop.products)}
                </div>
            )
        }
    }

    const showByProductID = () => {
        let shop
        let shopItem
        if (stores.legth === 0) {
            return (
                <div>Loading</div>
            )
        }
        if (stores.length > 0) {
            shop = stores?.find((i) => i.id === parseInt(params.id))
            shopItem = shop.products.find((item) => item.id === parseInt(params.item))
            console.log(shopItem);
            return (
                <div>
                    <p>ID: {shopItem.id}</p>
                    <p>NAME: {shopItem.name}</p>
                    <p>PRICE: {shopItem.price}</p>
                </div>
            )
        }
    }

    const addStore = async () => {
        let storeParams = { key: stores.length + 1, id: stores.length + 1, name: storeName, city: storeCity, products: [] }
        // storeParams.key = document.getElementById('storeID')
        // storeParams.id = document.getElementById('storeID')
        // storeParams.name = document.getElementById('storeName')
        // storeParams.city = document.getElementById('storeCity')
        // setNewStore(storeParams)
        console.log('new store is ')
        console.log(storeParams);
        // const newStores = [...stores, storeParams]
        // setStores(newStores)
        setStores([...stores, storeParams])
        console.log(stores);
        // LoadStores()


    }

    const storesOptions = () => {
        return (
            stores.map(store => {
                return (
                    <option value={store.id} key={'k' + store.id} id={store.id}>{store.name}</option>
                )
            })
        )
    }

    const addStoreItem = () => {
        let selectedStoreID = document.querySelector('#storeSelect').value;
        console.log(selectedStoreID);
        let storeArr=stores.find((s)=>s.id==selectedStoreID).products
        console.log(storeArr);
        let itemParams = {key:storeArr.length+1, id: storeArr.length+1, name:itemName, price:itemPrice}
        storeArr.push(itemParams)
        setStores([...stores])

    }


    // async function LoadProducts(storeId, itemId) {
    //     try {
    //         let res = await fetch(`http://localhost:5000/api/stores/${storeId}/${itemId}`)//fetches stores.json file
    //         let data = await res.json()//JSON obj that holds the stores array
    //         let storesArray = data.storesArr  //takes the storesArr directly from stores.json file
    //         //setStores(storesArray)
    //         console.log('data', data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return (
        <div /*style={{textAlign:"center"}}*/>Stores Page : <br />
            {/* {showStores()} */}
            {/* {showProducts()} */}
            {/* {showbyID()} */}
            {stores1}
            <br />
            {/*in order to show specific store/ store item gotta put this whole adding section in a different page or function */}
            Add a store: <br />
           
            Name: <input type="text" id='storeName' onChange={e => setStoreName(e.target.value)} />
            City: <input type="text" id='storeCity' onChange={e => setStoreCity(e.target.value)} />
            <button onClick={() => addStore()}>Add Store</button>
            <br />
            <br />

            Select a store: <select name="stores" id="storeSelect">
                {storesOptions()}
            </select>
            <br />
            Product name: <input type="text" id='itemName' onChange={e => setItemName(e.target.value)} />
            Product price: <input type="text" id='itemPrice' onChange={e => setItemPrice(e.target.value)} />
            <button onClick={()=>addStoreItem()}>Add Item</button>


        </div>
    )
}
