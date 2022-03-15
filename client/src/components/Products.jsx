import { useEffect } from 'react'
import styled from 'styled-components'
import Product from './Product'
import { useDispatch ,useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useState } from 'react'
import querystring from 'query-string'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Title = styled.h2`
    margin: 10px 0 10px;
    color: #241742;
    text-align: center;
`
const Products = ({category, filters, min, max}) => {
  const dispatch = useDispatch()

  const [filter, setFilter] = useState({
    title : '',
    gender : '',
    sold : '',
    min : '',
    max : '',
    price : '',
    newest : 'ASC'
  })
  const productList = useSelector((state) => state.productList)
  const {products} = productList
  
  const paramString = querystring.stringify(filter)
  const query = category?`CategoryId=${category.id}&${paramString}`:paramString
  useEffect(() => {
    setFilter(filters, min, max)
  }, [filters, min, max])
  useEffect(() => {
    dispatch(listProducts(query))
  },[dispatch, query])
  console.log(query)
  return (
    <>
    <Title>Danh mục sản phẩm</Title>
    <Container>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </Container>
    </>
  )
}

export default Products
