import { Radio } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import product from '../../store/product'
import { observer } from 'mobx-react-lite';
import useParams from '../../hooks/use-params';
import useFilters from '../../hooks/use-filters';
import useBlockUrls from '../../hooks/use-block-urls';
import styled from "styled-components";

const ProductsCategories = () => {
    const [activeCategory, setActiveCategory] = React.useState('all')
    const location = useLocation()
    const [category, sort, search] = useParams(['category', 'sort', 'search'])
    const blockUrls = useBlockUrls()
    const filters = useFilters()
    const radioGroup = React.useRef<HTMLHeadingElement>(null)
    const [radioGroupWidth, setRadioGroupWidth] = React.useState(0)

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const radioBtn = (e.target as HTMLInputElement)
        const category = radioBtn.value === 'all' ? undefined : radioBtn.value 
        filters(category, 'category')
    }

    React.useEffect(() => {
        if(radioGroup.current){
            setRadioGroupWidth(radioGroup.current.clientWidth);
        }
    }, [product.isLoading])

    React.useEffect(() => {
        product.setCategories();
    }, [product.initialList])

    React.useEffect(() => {
        blockUrls(() => {
            setActiveCategory(category.value ? category.value : 'all')
        })
    }, [location])

    React.useEffect(() => {
        if(!search.value) product.filterProducts(category.value, sort.value)
    }, [activeCategory, product.isLoading])

    return (
        <Radio.Group 
        optionType='button' 
        buttonStyle='solid'
        size='large'
        value={activeCategory}
        ref={radioGroup}
        >
            <RadioButton 
            value='all' 
            onClick={handleClick} 
            radioGroupWidth={radioGroupWidth}
            >
                All
            </RadioButton>
            {product.categories.map((category: string, index) => (
                <RadioButton 
                key={index} 
                value={category.replace(/[ ']/gi, '')} 
                onClick={handleClick}
                radioGroupWidth={radioGroupWidth}
                >
                    {category}
                </RadioButton>
            ))}
        </Radio.Group>
    )
}

export default observer(ProductsCategories)

const RadioButton = styled(Radio.Button)`
    ${(props: {radioGroupWidth: number}) => (
        `@media screen and (max-width: ${props.radioGroupWidth + 42}px){
            width: 100%;
            text-align: center;
        }`
    )}
`