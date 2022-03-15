import  styled  from 'styled-components'
import { mobile } from './../responsive'
import CategoryItem from './CategoryItem'
import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCategory } from './../actions/categoryActions'

const Container = styled.div`
 display: flex;
 justify-content: space-between;
 padding: 20px;
 ${mobile({padding: '0px', flexDirection: 'column'})}
`
const Title = styled.h2`
    margin: 10px 0 10px;
    color: #241742;
    text-align: center;
`
const Categories = () => {
    const dispatch = useDispatch()
    const categoryList = useSelector((state) => state.categoryList)
    const {category} = categoryList
    useEffect(() => {
        dispatch(listCategory())
    },[dispatch])
    
    return (
        <>
            <Title>Danh mục loại sản phẩm</Title>
            <Container>
                {category.map((cate)=>(
                    <CategoryItem cate = {cate} key={cate.id}/>
                ))}
            </Container>
        </>
    )
}

export default Categories
