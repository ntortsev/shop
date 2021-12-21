import { Drawer, Form, Input, Radio, Select, TimePicker } from 'antd'
import React from 'react'
import DrawerFooter from '../drawer-footer';
import useModal from '../../hooks/use-modal';

const Payment = () => {
    const [isVisible, handleClose] = useModal('/payment');

    const { Option } = Select;

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
                    <Input size='large' placeholder='Your phone'/>
                </Form.Item>

                <Form.Item label="Payment">
                    <Radio.Group buttonStyle='solid' size='large'>
                        <Radio.Button value="site">On the site</Radio.Button>
                        <Radio.Button value="shop">In the shop</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {/* if selected on shop */}
                <Form.Item label="Shop adress">
                    <Select size='large' placeholder='Adress'>
                        <Option value='pushkina'>Moscow, Pushkina street, 25</Option>
                        <Option value='lenina'>Chelyabinsk, Lenina street, 11</Option>
                    </Select>
                </Form.Item>

                {/* if selected on site */}
                <Form.Item label="Your adress">
                    <Input size='large' placeholder='Adress'/>
                </Form.Item>

                <Form.Item label="Time">
                    <TimePicker format="HH:mm" minuteStep={15} size='large'/>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default Payment