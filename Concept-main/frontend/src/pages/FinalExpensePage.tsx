import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import { useSigninMutation,useDataMutation } from '../hooks/userHook'

export default function FinalExpense() {
  const navigate = useNavigate()
  const { search } = useLocation()
 
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [zip, setZip] = useState('')

  
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signin, isLoading } = useSigninMutation()
  const { mutateAsync: userData } = useDataMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await userData({
        email,
        name,
        phone,
        zip

      })
      dispatch({ type: 'USER_DATA', payload: data })
      localStorage.setItem('userData', JSON.stringify(data))
     
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  };

  useEffect(() => {
    // if (userInfo) {
    //   navigate(redirect)
    // }
  }, [navigate, redirect, userInfo])




 

  return (
   
     





        
       


        
        <Container className="small-container">
      <Helmet>

        <title> Final Expense</title>
      </Helmet>
      <h1 className="my-3"> Final Expense</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="phone"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="zipcode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="zipcode"
            required
            onChange={(e) => setZip(e.target.value)}
          />
          
                 <div>
  <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."/>
</div>
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
          Get Your Medicare Quote
          </Button>
          {isLoading && <LoadingBox />}
        </div>

        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>

       </Container>
      
     
      
     


     


    
      
      

 









   
  )
}