import { makeAutoObservable } from "mobx"

const URL = 'https://fakestoreapi.com'
class Product {
    list = []
    isLoaded = false
    categories = []

    constructor(){
        makeAutoObservable(this)
    }

    setProducts = () => {
        fetch(`${URL}/products`)
            .then(res => res.json())
            .then(json => this.list = json)
            .finally(() => this.isLoaded = true)
    }

    setCategories = () => {
        fetch(`${URL}/products/categories`)
            .then(res => res.json())
            .then(json => this.categories = json)
    }
}

export default new Product()