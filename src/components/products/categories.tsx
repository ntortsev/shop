import { Radio } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import product from '../../store/product'
import { observer } from 'mobx-react-lite';
import useParams from '../../hooks/use-params';
import useFilters from '../../hooks/use-filters';
import useBlockUrls from '../../hooks/use-block-urls';

const ProductsCategories = () => {
    const [activeCategory, setActiveCategory] = React.useState('all')
    const location = useLocation()
    const [category, sort, search] = useParams(['category', 'sort', 'search'])
    const blockUrls = useBlockUrls()
    const filters = useFilters()

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const radioBtn = (e.target as HTMLInputElement)
        const category = radioBtn.value === 'all' ? undefined : radioBtn.value 
        filters(category, 'category')
    }

    React.useEffect(() => {
        product.setCategories();
    }, [])

    React.useEffect(() => {
        blockUrls(() => {
            setActiveCategory(category.value ? category.value : 'all')
        })
    }, [location])

    React.useEffect(() => {
        if(!search.value) product.filterProducts(category.value, sort.value)
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