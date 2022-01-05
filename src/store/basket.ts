import { makeAutoObservable } from "mobx"
import { ProductType } from "../types/product"

class Basket {
    list: ProductType[] = []

    constructor(){
        makeAutoObservable(this)
    }

    addToBasket = (basketItem: ProductType) => {
        this.list.push({...basketItem, count: 1})
    }

    removeFromBasket = (id: number) => {
        this.list = [...this.list].filter(product => product.id !== id)
    }
}

export default new Basket()