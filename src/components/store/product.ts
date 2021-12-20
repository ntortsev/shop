import { makeAutoObservable } from "mobx"

class Product {
    list = []
    isLoaded = false

    constructor(){
        makeAutoObservable(this)
    }

    setProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => this.list = json)
            .finally(() => this.isLoaded = true)
    }
}

export default new Product()