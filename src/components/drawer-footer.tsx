import { Button, Col, FormInstance, Row, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components';
import basket from '../store/basket'
import { observer } from 'mobx-react-lite';
import payment from '../store/payment';

type Props = {
    form?: FormInstance<any>,
    isButtonLoading?: boolean
}

const DrawerFooter = ({form, isButtonLoading}: Props) => {
    const { Title } = Typography;
    const [totalPrice, setTotalPrice] = React.useState(0)

    const handleClick = () => {
        if(basket.isVisible){
            basket.setIsVisible(false)
            payment.setIsVisible(true)
        }else{
            form?.submit()
        }
    }

    React.useEffect(() => {
        setTotalPrice(basket.list.reduce((sum, elem) => {
            return +(sum + elem.price).toFixed(2)
        }, 0))
    }, [basket.list])

    return (
        <DrawerFooterWrap>
            <Row justify='space-between'>
                <Col>
                    <Title level={3}>
                    Итоговая цена: 
                    </Title>
                </Col>
                <Col>
                    <Title level={3}>
                    {totalPrice} ₽
                    </Title>
                </Col>
            </Row>
            <Button type='primary' onClick={handleClick} block size='large' loading={isButtonLoading}>
                {basket.isVisible ? 'Перейти к оплате' : 'Оформить заказ'}
            </Button>
        </DrawerFooterWrap>
    )
}

export default observer(DrawerFooter)

const DrawerFooterWrap = styled.div`
    user-select: none;
`