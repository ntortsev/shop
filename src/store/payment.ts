import { notification } from "antd";
import { makeAutoObservable } from "mobx";
import basket from "./basket";

class Payment {
    isLoading = false

    constructor(){
        makeAutoObservable(this)
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }

    fetchFakePayment = (values: {[option: string]:string}) => {
        const basketItems = basket.list.map(item => (
            {id: item.id, count: item.count}
        ))
        this.setIsLoading(true)

        fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...values, basketItems})
        })
        .then(() => {
            notification.success({
                message: 'Product ordered successfully', 
                placement: 'bottomLeft', 
                duration: 2.5,
            })

            basket.clearBasket()
        })
        .catch(error => {
            console.error(error)
            notification.error({
                message: 'There was an error during the order', 
                placement: 'bottomLeft', 
                duration: 2.5,
            })
        })
        .finally(() => {
            this.setIsLoading(false)
        })
    }
}

export default new Payment()