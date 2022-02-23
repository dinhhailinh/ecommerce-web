import  styled  from 'styled-components'
import axios from 'axios'
import { mobile } from './../responsive'
import CategoryItem from './CategoryItem'
import { useState, useEffect } from 'react'

const Container = styled.div`
 display: flex;
 justify-content: space-between;
 padding: 20px;
 ${mobile({padding: '0px', flexDirection: 'column'})};
`

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() =>{
        const getCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/category/')
                setCategories(res.data)
                console.log('data:',res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getCategories();
    },[])
    return (
        <Container>
            {categories && categories.map((cate)=>(
                <CategoryItem item={cate} key={cate.id}/>
            ))}
        </Container>
    )
}

export default Categories
