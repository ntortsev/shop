import { Button, Card, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const ProductsList = () => {
    const { Title } = Typography;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    return (
        <ProductsListWrap>
            {new Array(8).fill(0).map((_, index) => (
                <Link to={`/product?id=${index}`} key={index} >
                    <Card>
                        <Img src='https://picsum.photos/1920/1080'/>
                        <Title level={3} >Product name</Title>
                        <Typography>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit... 
                        </Typography>
                        <CardBottom>
                            <Price>100$</Price>
                            <Button onClick={handleClick} type='primary'>
                                Add to basket
                            </Button>
                        </CardBottom>
                    </Card>
                </Link>
            ))}
        </ProductsListWrap>
    )
}

export default ProductsList

const ProductsListWrap = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 1fr;
    gap: 1rem;
    padding-bottom: 50px;
`

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


