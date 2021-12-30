import { Badge, Button, Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Container from './container'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';
import { Link, useNavigate } from 'react-router-dom';

const HeaderWrap = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/basket')
    }

    return (
        <Header style={HeaderStyles}>
            <Container>
                <Row justify="space-between">
                    <Col>
                        <Link to="/">
                            <Logo>Shop</Logo>
                        </Link>
                    </Col>
                    <Col>
                        <Badge count={1} overflowCount={99} offset={[0,35]}>
                            <Button block size="large" icon={<ShoppingCartOutlined />} onClick={handleClick}>
                                Basket
                            </Button>
                        </Badge>
                    </Col>
                </Row>
            </Container>
        </Header>
    )
}

export default HeaderWrap

const Logo = styled.div`
    color: #eee;
    font-size: 35px;
    font-weight: 700;
    user-select: none;
`;

const HeaderStyles: React.CSSProperties = {
    padding: 0,
    position: 'fixed',
    width: '100vw',
    zIndex: 1500,
    paddingRight: '12px'
}





