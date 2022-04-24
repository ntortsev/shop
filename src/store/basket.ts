import { makeAutoObservable } from "mobx"
import { ProductType } from "../types/product"

class Basket {
    list: ProductType[] = []

    constructor(){
        makeAutoObservable(this)
    }

    setStorageList = () => {
        const storageList = this.list.map(product => ({id: product.id, count: product.count}))
        localStorage.setItem('basketList', JSON.stringify(storageList))
    }

    setList = (products: ProductType[]) => {
        this.list = products
    }

    addToBasket = (basketItem: ProductType) => {
        this.list = [...this.list, {...basketItem, count: 1}]
        this.setStorageList()
    }

    removeFromBasket = (id: number) => {
        this.list = [...this.list].filter(product => product.id !== id)
        this.setStorageList()
    }

    clearBasket = () => {
        this.list = []
        this.setStorageList()
    }

    changeCount = (id: number, initialPrice: number, sign: string) => {
        this.list = [...this.list].map(product => {
            const newCount = sign === 'plus'
                ? product.count + 1
                : product.count > 1 ? product.count - 1 : 1

            return product.id === id 
                ? {...product, 
                count: newCount, 
                price: +(initialPrice * newCount).toFixed(2)} 
                : {...product}
        })
        this.setStorageList()
    }
}

export default new Basket()