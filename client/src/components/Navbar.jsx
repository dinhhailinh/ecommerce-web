import React from 'react'
import { Badge, Select } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import styled from 'styled-components'

import { mobile } from '../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language = styled.div`
  padding: 5px;
  width: 100px;
  font-size: 11px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`

const SearchContainer = styled.div`
  border: 0.5px solid gray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })};
  &:focus{
      outline: none;
  }
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })};
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`
const Navbar = () => {
  const [language, setLanguage] = React.useState(0)

  const handleChange = (event) => {
    setLanguage(event.target.value)
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language> 
            <Select
              id="demo-simple-select-helper"
              value={language}
              onChange={handleChange}
              defaultValue={0}
            >
            <option 
              value={0}
              align="center"
              >EN</option>
            <option 
              value={1}
              align="center"
              >CN</option>
            <option
              value={2}
              align="center"
            >VI</option>
            </Select> 
          </Language> 
            <SearchContainer>
                <Input placeholder="Search" />
                <Search
                style={{
                    color: "gray",
                    fontSize: 16,
                }}
                /> 
            </SearchContainer> 
        </Left> 
        <Center>
          <Link to='/'
            style={
              { 
                color: 'inherit',
                textDecoration: 'none'
              }
            }
          >
            <Logo> YouTube-Ex. </Logo> 
          </Link>
        </Center> 
        <Right>
        <Link to='/login' 
          style={
              { 
                color: 'inherit',
                textDecoration: 'none'
              }
            }>
          <MenuItem> LOGIN </MenuItem> 

        </Link>
        <Link to = '/register'
          style={
              { 
                color: 'inherit',
                textDecoration: 'none'
              }
            }>
          <MenuItem> REGISTER </MenuItem>
        </Link>
          <Link to='/cart'
            style={
              { 
                color: 'inherit',
                textDecoration: 'none'
              }
            }
          >

            <MenuItem>
              <Badge badgeContent={4} color="primary">
                <ShoppingCartOutlined />
              </Badge> 
            </MenuItem> 
          </Link> 
        </Right> 
      </Wrapper> 
    </Container>
  )
}

export default Navbar
