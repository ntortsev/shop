import { Drawer, Form, Input } from 'antd'
import React from 'react'
import DrawerFooter from '../drawer-footer';
import useModal from '../../hooks/use-modal';
import MaskedInput from 'antd-mask-input';
import useWindowSize from '../../hooks/use-window-size';
import PaymentAdress from './adress';

const Payment = () => {
    const [isVisible, handleClose] = useModal('/payment');
    const [isButtonLoading, setIsButtonLoading] = React.useState(false)
    const [windowWidth] = useWindowSize();
    const [form] = Form.useForm();

    const handleSubmit = (values: {[option: string]:string}) => {
        setIsButtonLoading(true)

        fetch('http://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        })
        .then(request => {
            if(!request.ok) return;
            // do something
        })
        .catch(error => console.error(error))
        .finally(() => setIsButtonLoading(false))
    };

    return (
        <Drawer 
        title="Payment" 
        placement="right" 
        visible={isVisible}
        onClose={handleClose}
        footer={<DrawerFooter form={form} isButtonLoading={isButtonLoading}/>}
        size={windowWidth >= 730 ? 'large' : 'default'}
        >
            <Form layout='vertical' id='paymentForm' form={form} onFinish={handleSubmit}>
                <Form.Item label="Name" name={'Name'} rules={[{ required: true}]} required={false}>
                    <Input size='large' placeholder='Your name' />
                </Form.Item>

                <Form.Item label="Phone" name={'Phone'} rules={[{ required: true}]} required={false}>
                    <MaskedInput size='large' addonBefore="+7" mask="(111)111-11-11" />
                </Form.Item>

                <Form.Item label="Email" name={'Email'} rules={[{ required: true}]} required={false}>
                    <Input size='large' placeholder='Your email'/>
                </Form.Item>

                <PaymentAdress />
            </Form>
        </Drawer>
    )
}

export default Payment
