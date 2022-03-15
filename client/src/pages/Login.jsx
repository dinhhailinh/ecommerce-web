import styled from 'styled-components'
import {mobile} from '../responsive'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from './../actions/userActions';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  flex: 1;
  font-size: 16px;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`

const Links = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`
const Error = styled.span`
  margin: 5px auto;
  font-size: 12px;
  color: red;
`
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => (state.userLogin))
  const { error, userInfo } = userLogin
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])
  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form onSubmit={submitHandler}>
          <Input placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <Input 
            type="password"
            placeholder="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <Button type='submit'>LOGIN</Button>
          {error&&<Error>Email or password incorrect!</Error>}
          <Links>DO NOT YOU REMEMBER THE PASSWORD?</Links>
          <Link to = '/register'
          style={
              { 
                color: 'inherit',
                textDecoration: 'none'
              }
            }>
          <Links>CREATE A NEW ACCOUNT</Links>
        </Link>
          
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
