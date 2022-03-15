import styled from 'styled-components'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { mobile } from '../responsive'

import { register } from './../actions/userActions';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`
const Error = styled.span`
  margin: 5px auto;
  font-size: 12px;
  color: red;
`
const Register = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userRegister = useSelector((state) => (state.userRegister))
  const { error, userInfo } = userRegister
  //console.log({firstName, lastName, email, password})
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(firstName, lastName, email, password))
  }
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={submitHandler}>
          <Input placeholder="first name" 
          type="text"
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} />

          <Input placeholder="last name" 
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} />

          <Input placeholder="email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <Input placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />  
          <Input placeholder="confirm password" type="password"/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {error&&<Error>{error}</Error>}
          <Button type='submit'>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
