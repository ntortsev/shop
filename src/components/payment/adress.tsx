import { Form, Select } from 'antd';
import React from 'react'

const adressesUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
const token = "3eb54f13ae1c911ff6c7d0fc8e3c99d8b77d2975"

const PaymentAdress = () => {
    const { Option } = Select;
    const [currAdress, setCurrAdress] = React.useState('')
    const [adressList, setAdressList] = React.useState([])

    const handleChange = (e: string) => {
        setCurrAdress(e);
    }

    React.useEffect(() => {
        fetch(adressesUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({
                query: currAdress,
            })
        })
            .then(response => response.json())
            .then(result => setAdressList(result.suggestions))
            .catch(error => console.error(error));
    }, [currAdress])

    return (
        <Form.Item label="Adress" name={'Adress'} rules={[{ required: true}]} required={false}>
            <Select
                placeholder="Your adress"
                size='large'
                onChange={handleChange}
                onSearch={handleChange}
                showSearch
                filterOption={false}
                notFoundContent={null}
            >
                {adressList.map((adress: {value: string}) => (
                    <Option 
                    key={adress.value} 
                    value={adress.value}
                    >
                        {adress.value}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default PaymentAdress
