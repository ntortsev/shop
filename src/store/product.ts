import { makeAutoObservable } from "mobx"
import { ProductType } from "../types/product"

const URL = 'https://fakestoreapi.com'

class Product {
    initialList: ProductType[] = []
    currList: ProductType[] = []
    isLoaded = false
    categories = []

    constructor(){
        makeAutoObservable(this)
    }

    setProducts = () => {
        fetch(`${URL}/products`)
            .then(res => res.json())
            .then(json => this.initialList = json)
            .finally(() => this.isLoaded = true)
    }

    setCategories = () => {
        fetch(`${URL}/products/categories`)
            .then(res => res.json())
            .then(json => this.categories = json)
    }

    filterProducts = (category: string|undefined, sort: string|undefined) => {
        const filterByCategory = () => {
            this.currList = [...this.initialList].filter((item)=> (
                item.category.replace(/[ ']/gi, '') === category
            ))
        }
        const filterBySort = (arr: ProductType[]) => {
            this.currList = [...arr].sort((a, b) => (
                sort === 'asc' ? (a.price - b.price) : (b.price - a.price)
            ))
        }

        if(category && sort){
            filterByCategory()
            filterBySort(this.currList)
        }else if(category){
            filterByCategory()
        }else if(sort){
            filterBySort(this.initialList)
        }else{
            this.currList = [...this.initialList]
        }
    }
}

export default new Product()