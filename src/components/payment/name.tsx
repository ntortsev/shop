import { Form, Input } from 'antd'
import React from 'react'

type Props = {

}

const PaymentName: React.FC<Props> = () => {
    return (
        <Form.Item label="Name" name={'Name'} rules={[{ required: true}]}>
            <Input size='large' placeholder='Your name' />
        </Form.Item>
    )
}

export default PaymentName