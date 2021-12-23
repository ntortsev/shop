import { Radio } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import product from '../../store/product'
import { observer } from 'mobx-react-lite';
import useParams from '../../hooks/use-params';
import useFilters from '../../hooks/use-filters';

const ProductsCategories = () => {
    const [activeCategory, setActiveCategory] = React.useState('all')
    const location = useLocation()
    const [category, sort] = useParams(['category', 'sort'])
    const filters = useFilters()

    const handleClick = (e: any) => {
        filters(e.target.value, 'category')
    }

    React.useEffect(() => {
        product.setCategories();
    }, [])

    React.useEffect(() => {
        const urls = ['/basket', '/product', '/payment']
        if(!urls.includes(location.pathname)){
            setActiveCategory(category ? category : 'all')
        }
    }, [location.pathname, category])

    React.useEffect(() => {
        product.filterProducts(category, sort)
    }, [activeCategory, product.isLoaded])

    return (
        <Radio.Group 
        optionType='button' 
        buttonStyle='solid'
        size='large'
        value={activeCategory}
        >
            <Radio.Button value='all' onClick={handleClick}>All</Radio.Button>
            {product.categories.map((category: string, index) => (
                <Radio.Button 
                key={index} 
                value={category.replace(/[ ']/gi, '')} 
                onClick={handleClick}
                >
                    {category}
                </Radio.Button>
            ))}
        </Radio.Group>
    )
}

export default observer(ProductsCategories)