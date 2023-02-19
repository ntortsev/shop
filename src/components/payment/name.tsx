import { Form, Input } from 'antd';
import React from 'react';

type Props = {};

const PaymentName: React.FC<Props> = () => {
  return (
    <Form.Item label="Ваше Имя" name={'Name'} rules={[{ required: true }]}>
      <Input size="large" placeholder="Введите ваше" />
    </Form.Item>
  );
};

export default PaymentName;
