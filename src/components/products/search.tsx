import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
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
    const isBtnClear =  !!value && value === search.value

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSearch = () => {
        if(!value) return;

        blockUrls(() => {
            navigate(isBtnClear ? '/' : `/products?search=${value}`)
        })
    }

    React.useEffect(() => {
        setValue(search.value ?? '')
    }, [location])

    return (
        <Search 
        style={SearchStyles}
        size='large'
        enterButton={
        <Button 
        type="primary" 
        icon={isBtnClear ? <CloseCircleOutlined /> : <SearchOutlined />} 
        size="large" 
        danger={isBtnClear}
        style={SearchBtnStyles}
        >
            {isBtnClear ? 'Clear' : 'Search'}
        </Button>}
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

const SearchBtnStyles: React.CSSProperties = {
    minWidth: '105px'
}
