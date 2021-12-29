import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useBlockUrls from '../../hooks/use-block-urls';
import useParams from '../../hooks/use-params';

const ProductsSearch = () => {
    const [value, setValue] = React.useState('')
    const { Search } = Input;
    const navigate = useNavigate()
    const [search] = useParams(['search'])
    const location = useLocation()
    const blockUrls = useBlockUrls()

    const handleChange = (e: any) => {
        const currSearch = e.target.value
        if(/\W/.test(currSearch)) return;

        setValue(currSearch)
    }

    const handleSearch = () => {
        blockUrls(() => {
            navigate(value ? `/products?search=${value}` : '/')
        })
    }

    React.useEffect(() => {
        setValue(search.value ? search.value : '')
    }, [location])

    return (
        <Search 
        style={SearchStyles}
        size='large'
        enterButton
        placeholder='Find product'
        onChange={handleChange}
        value={value}
        onSearch={handleSearch}
        />
    )
}

export default observer(ProductsSearch)

const SearchStyles: React.CSSProperties = {
    marginBottom: '20px',
    marginTop: '50px',
}
