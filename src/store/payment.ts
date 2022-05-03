import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import { makeAutoObservable } from "mobx";
import React from "react";
import basket from "./basket";

type notificationOptionsType = {
    style: React.CSSProperties,
    placement: NotificationPlacement,
    duration: number
}

class Payment {
    isLoading: boolean = false
    isVisible: boolean = false

    constructor(){
        makeAutoObservable(this)
    }

    setIsVisible = (isVisible: boolean) => {
        this.isVisible = isVisible
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }

    fetchFakePayment = (values: {[option: string]:string}) => {
        const basketItems = basket.list.map(item => (
            {id: item.id, count: item.count}
        ))
        const notificationOptions: notificationOptionsType = {
            style: {backgroundColor: '#f4ffb8'},
            placement: 'bottomLeft', 
            duration: 3,
        }

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
                ...notificationOptions
            })

            localStorage.setItem('paymentData', JSON.stringify(values))
            basket.clearBasket()
        })
        .catch(error => {
            console.error(error)
            notification.error({
                message: 'There was an error during the order', 
                ...notificationOptions
            })
        })
        .finally(() => {
            this.setIsLoading(false)
        })
    }
}

export default new Payment()