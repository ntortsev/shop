import { Drawer, Form, Input, notification } from 'antd'
import React from 'react'
import DrawerFooter from '../drawer-footer';
import useModal from '../../hooks/use-modal';
import useWindowSize from '../../hooks/use-window-size';
import PaymentAdress from './adress';
import basket from '../../store/basket';
import PaymentPhone from './phone';

const Payment = () => {
    const [isVisible, handleClose] = useModal('/payment');
    const [isButtonLoading, setIsButtonLoading] = React.useState(false)
    const [windowWidth] = useWindowSize();
    const [form] = Form.useForm();

    const handleSubmit = (values: {[option: string]:string}) => {
        setIsButtonLoading(true)

        fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        })
        .then(request => {
            if(!request.ok) return;

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
            setIsButtonLoading(false)
            handleClose()
        })
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
            <Form 
            layout='vertical' 
            id='paymentForm' 
            form={form} 
            onFinish={handleSubmit}
            >
                <Form.Item label="Name" name={'Name'} rules={[{ required: true}]} required={false}>
                    <Input size='large' placeholder='Your name' />
                </Form.Item>

                <PaymentPhone form={form}/>

                <Form.Item label="Email" name={'Email'} rules={[{ required: true}]} required={false}>
                    <Input size='large' placeholder='Your email'/>
                </Form.Item>

                <PaymentAdress />
            </Form>
        </Drawer>
    )
}

export default Payment
