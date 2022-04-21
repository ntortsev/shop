import { Form, FormInstance, Input } from 'antd'
import React from 'react'
import useMobileMask from '../../hooks/use-mobile-mask'

type Props = {
    form: FormInstance
}

const PaymentPhone: React.FC<Props> = ({form}) => {
    const [phoneValue, setPhoneValue] = React.useState('')
    const mobileMask = useMobileMask()

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const newPhoneValue = mobileMask(e.target.value, phoneValue)

        setPhoneValue(newPhoneValue)
        form.setFieldsValue({['Phone']: newPhoneValue})
    }

    return (
        <Form.Item label="Phone" name={'Phone'} rules={[{ required: true}]}>
            <Input size='large' addonBefore="+7" onChange={handleChange} placeholder="(___)___-__-__"/>
        </Form.Item>
    )
}

export default PaymentPhone