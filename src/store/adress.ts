import { makeAutoObservable } from "mobx"

class Adress {
    list = []
    isLoading = false

    constructor(){
        makeAutoObservable(this)
    }

    setList = (list: []) => {
        this.list = list
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }
    fetchAdressList = (query: string) => {
        const adressesUrl = 'https://fakestoreapi.com' ?? ''
        const token = process.env.REACT_APP_ADRESSES_TOKEN
        this.setIsLoading(true)

        fetch(adressesUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query})
        })
            .then(response => response.json())
            .then(result => this.setList(result.suggestions))
            .catch(error => console.error(error))
            .finally(() => this.setIsLoading(false))
    }
}

export default new Adress()