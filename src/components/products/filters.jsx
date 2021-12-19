import { Col, Radio, Row, Select } from 'antd'
import React from 'react'
import styled from 'styled-components'

const ProductsFilters = () => {
    const { Option } = Select;

    return (
        <Wrapper>
            <Row justify='space-between' align='center'>
                <Col>
                    <Radio.Group 
                    optionType='button' 
                    buttonStyle='solid' 
                    size='large'
                    >
                        <Radio.Button value='all'>All</Radio.Button>
                        <Radio.Button value='option1'>option 1</Radio.Button>
                        <Radio.Button value='option2'>option 2</Radio.Button>
                        <Radio.Button value='option3'>option 3</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col>
                    <Select defaultValue={'none'} size='large'>
                        <Option value='none'>None</Option>
                        <Option value='some 1'>some 1</Option>
                        <Option value='some 2'>some 2</Option>
                        <Option value='some 3'>some 3</Option>
                    </Select>
                </Col>
            </Row>
        </Wrapper>
    )
}

export default ProductsFilters

const Wrapper = styled.div`
    padding-bottom: 30px;
`
