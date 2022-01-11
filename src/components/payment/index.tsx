import { Drawer, Form, Input } from 'antd'
import React from 'react'
import DrawerFooter from '../drawer-footer';
import useModal from '../../hooks/use-modal';
import MaskedInput from 'antd-mask-input';

const Payment = () => {
    const [isVisible, handleClose] = useModal('/payment');

    return (
        <Drawer 
        title="Payment" 
        placement="right" 
        visible={isVisible}
        onClose={handleClose}
        footer={<DrawerFooter />}
        >
            <Form layout='vertical'>
                <Form.Item label="Name">
                    <Input size='large' placeholder='Your name'/>
                </Form.Item>

                <Form.Item label="Phone">
                    <MaskedInput size='large' addonBefore="+7" mask="(111)111-11-11" />
                </Form.Item>

                <Form.Item label="Email">
                    <Input size='large' placeholder='Your email'/>
                </Form.Item>

                <Form.Item label="Adress">
                    <Input size='large' placeholder='Your adress'/>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default Payment
