import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'
import product from '../../store/product';

const ProductsSearch = () => {
    const {setActivePage, filterProducts, searchProducts, searchQuery} = product
    const [value, setValue] = React.useState('')
    const { Search } = Input;
    const isBtnClear =  !!value && value === searchQuery

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSearch = () => {
        const newValue = isBtnClear ? '' : value

        setActivePage(1)
        filterProducts('all', 'none')
        searchProducts(newValue)
    }

    React.useEffect(() => {
        if(!searchQuery) setValue('')
    }, [searchQuery])


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
            {isBtnClear ? 'Отчистить' : 'Найти'}
        </Button>}
        placeholder='Найти товар'
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
		background: '#ffcc11',
		borderColor: '#ffcc11'
}

const SearchBtnStyles: React.CSSProperties = {
    minWidth: '105px',
		background: '#ffcc11',
		borderColor: '#ffcc11',
		color: 'black'
}
