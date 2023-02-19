import { Drawer, Form } from 'antd'
import React from 'react'
import DrawerFooter from '../drawer-footer';
import useWindowSize from '../../hooks/use-window-size';
import PaymentAdress from './adress';
import PaymentPhone from './phone';
import PaymentEmail from './email';
import PaymentName from './name';
import { observer } from 'mobx-react-lite';
import payment from '../../store/payment';

const Payment = () => {
    const [windowWidth] = useWindowSize();
    const [form] = Form.useForm();
    const paymentData = JSON.parse(localStorage.getItem('paymentData') ?? '{}')

    const handleClose = () => {
        payment.setIsVisible(false)
    }

    const handleSubmit = (values: {[option: string]:string}) => {
        payment.fetchFakePayment(values)
        handleClose()
    };

    return (
        <Drawer 
        title="Payment" 
        placement="right" 
        visible={payment.isVisible}
        onClose={handleClose}
        footer={<DrawerFooter form={form} isButtonLoading={payment.isLoading}/>}
        size={windowWidth >= 730 ? 'large' : 'default'}
        >
            <Form 
            layout='vertical' 
            id='paymentForm' 
            form={form} 
            onFinish={handleSubmit}
            requiredMark={false}
            initialValues={paymentData}
            >
                <PaymentName />
                <PaymentPhone form={form}/>
                <PaymentEmail />
                {/* <PaymentAdress form={form}/> */}
            </Form>
        </Drawer>
    )
}

export default observer(Payment) 
