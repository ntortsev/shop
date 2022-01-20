import { makeAutoObservable } from "mobx"
import { ProductType } from "../types/product"

class Basket {
    list: ProductType[] = []

    constructor(){
        makeAutoObservable(this)
    }

    addToBasket = (basketItem: ProductType) => {
        this.list = [...this.list, {...basketItem, count: 1}]
    }

    removeFromBasket = (id: number) => {
        this.list = [...this.list].filter(product => product.id !== id)
    }

    clearBasket = () => {
        this.list = []
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
    }
}

export default new Basket()