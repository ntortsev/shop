import { makeAutoObservable } from "mobx"
import { ProductType } from "../types/product"

const URL = 'https://fakestoreapi.com'

class Product {
    initialList: ProductType[] = []
    currList: ProductType[] = []
    isLoading: boolean = false
    categories: string[] = []
    searchQuery: string = ''
    activeCategory: string = 'all'
    activeSort: string = 'none'
    activePage: number = 1
    isProductOpened: boolean = false
    openedProductId: number = 0
    

    constructor(){
        makeAutoObservable(this)
    }

    setIsProductOpened = (isProductOpened: boolean) => {
        this.isProductOpened = isProductOpened
    }

    setOpenedProductId = (id: number) => {
        this.openedProductId = id
    }

    setActiveCategory = (category: string) => {
        this.activeCategory = category
    }
    setActiveSort = (sort: string) => {
        this.activeSort = sort
    }
    setActivePage = (page: number) => {
        this.activePage = page
    }

    setSearchQuery = (query: string) => {
        this.searchQuery = query
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading =  isLoading
    }

    setProducts = (products: ProductType[]) => {
        this.initialList = products
        this.currList = products
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

    filterProducts = (category: string, sort: string) => {
        this.setActiveCategory(category)
        this.setActiveSort(sort)

        if(category === 'all'){
            this.currList = [...this.initialList]
        }else{
            this.currList = [...this.initialList].filter((item)=> (
                item.category.replace(/[ ']/gi, '') === category
            ))
        }

        if(sort === 'none') return;
        this.currList = [...this.currList].sort((a, b) => (
            sort === 'asc' ? (a.price - b.price) : (b.price - a.price)
        ))
    }

    searchProducts = (searchValue: string) => {
        this.searchQuery = searchValue
        const regex = new RegExp(`(${searchValue})`, 'gi')
        this.currList = [...this.initialList].filter(item => item.title.match(regex))
    }

    openProduct = (productId: number) => {
        this.setIsProductOpened(true)
        this.setOpenedProductId(productId)
    }
}

export default new Product()