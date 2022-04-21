import { Form, Input } from 'antd'
import React from 'react'

type Props = {

}

const PaymentEmail: React.FC<Props> = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return (
        <Form.Item 
        label="Email" 
        name={'Email'} 
        rules={[{ required: true, pattern: emailRegex, message: 'Wrong Email!'}]}>
            <Input size='large' placeholder='Your email'/>
        </Form.Item>
    )
}

export default PaymentEmail