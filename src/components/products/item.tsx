import { Button, Card, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
    id: number;
    image: string;
    title: string;
    price: number;
}

const ProductsItem = ({id, image, title, price}:Props) => {
    const { Title } = Typography;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    return (
        <Link to={`/product?id=${id}`} key={id}>
            <Card bodyStyle={CardBodyStyles}>
                <Img src={image} loading='lazy'/>
                <Title level={3} style={TitleStyles} >
                    {title.slice(0,30)}
                </Title>
                <CardBottom>
                    <Price>
                        {price}$
                    </Price>
                    <Button onClick={handleClick} type='primary'>
                        Add to basket
                    </Button>
                </CardBottom>
            </Card>
        </Link>
    )
}

export default ProductsItem

const Img = styled.img`
    object-fit: cover;
    height: 200px;
    width: 100%;
`

const CardBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`

const Price = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 500;
`

const CardBodyStyles: React.CSSProperties = {
    height: '400px'
} 

const TitleStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    maxHeight: '100px',
    height: '100%'
}