import styled from 'styled-components'
import Slider from '@mui/material/Slider'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { detailCategory } from '../actions/categoryActions'
import { useLocation } from 'react-router-dom'

const Container = styled.div``

const Title = styled.h1`
  margin: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })};
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })};
`
const Input = styled.input`
  margin-left: 10px;
  margin-right: 10px;
  display: inline-block;
  position: relative;
  font-size: 16px;
  font-weight: 400;
  width: 80px;
  &:focus {
    outline: none;
  }
  ${mobile({ display: "flex", flexDirection: "column" })};
`
const Select = styled.select`
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })};
`
const Option = styled.option`
  font-size: 16px;
  font-weight: 400;
`

const ProductList = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const slug = location.pathname.split("/")[1];
  const [filters, setFilters] = useState({});
  const [value, setValue] = useState([0, 1000]);
  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchange = (e, value) => {
    setValue(value)
  }
  
  const categoryDetail = useSelector((state) => state.categoryDetail)
  const {category} = categoryDetail
  useEffect(() => {
    dispatch(detailCategory(slug))
  }, [dispatch, slug])
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title> {category.cateName} </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="gender" onChange={handleFilters}>
            <Option value="">
              Gender
            </Option>
            <Option value="female">Female</Option>
            <Option value="male">Male</Option>
          </Select>
        </Filter>
        <Filter>
        <FilterText>Price range:
          <Input type={Number} value={value[0]}/>
          -
          <Input type={Number} value={value[1]}/>
        </FilterText>
          <Slider
            name="range"
            getAriaLabel={() => 'Range'}
            value={value}
            max='1000'
            onChange={handleOnchange}
            valueLabelDisplay="auto"
            step={20}
          />
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name="price" onChange={handleFilters}>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} min={value[0]} max={value[1]}/>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
