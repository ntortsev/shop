import { makeAutoObservable } from "mobx"
import { ProductType } from "../types/product"

const URL = 'https://fakestoreapi.com'

class Product {
    initialList: ProductType[] = []
    currList: ProductType[] = []
    isLoading: boolean = false
    categories: string[] = []

    constructor(){
        makeAutoObservable(this)
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading =  isLoading
    }

    setProducts = (products: ProductType[]) => {
        this.initialList = products
    }

    fetchProducts = () => {
        this.setIsLoading(true)

        fetch(`${URL}/products`)
            .then(res => res.json())
            .then(json => this.setProducts(json))
            .finally(() => this.setIsLoading(false))
    }

    setCategories = () => {
        const categories = this.initialList.map((item: ProductType) => (
            item.category
        ))
        const uniqueCategories = Array.from(new Set(categories))
        this.categories = uniqueCategories
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

    searchProducts = (searchValue: string|undefined) => {
        searchValue = searchValue ? searchValue : ''
        const regex = new RegExp(`(${searchValue})`, 'gi')
        this.currList = [...this.initialList].filter(item => item.title.match(regex))
    }
}

export default new Product()