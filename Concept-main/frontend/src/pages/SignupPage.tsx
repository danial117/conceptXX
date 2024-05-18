import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSignupMutation } from '../hooks/userHook'
import { Store } from '../Store'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'






export default function SignupPage() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'
 const [disappear,setDisappear]=useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [lead, setLead] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const [action, setAction] = useState('');
 

  useEffect(() => {
    if (userInfo) {
      setTimeout(()=>{navigate(redirect)},5000)
    }
  }, [navigate, redirect, userInfo])

  const { mutateAsync: signup, isLoading } = useSignupMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    
    setDisappear(true)


 
   
  
    // Redirect to another domain with the token in the URL
   
    
      
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const data = await signup({
        name,
        email,
        password,
        leadID
      })
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
     setTimeout(()=>{navigate(redirect)},5000) 
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

 

 


  return (
    <Container className="small-container">
      
      <h1 className="my-3">Sign Up</h1>
      <Form id='signup-form' onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
       
        <label>
  <input type="checkbox" id="leadid_tcpa_disclosure"/>[ENTER DESIRED OR SPECIFIED DISCLOSURE TEXT HERE]
</label>



        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>

        {disappear  && <div style={{display:'flex',flexDirection:"column",background:'black', width:'70%', height:'30vh',margin:'auto auto',position:'absolute',top:'15%',left:'20%'}}>
              <p style={{textAlign:'center',margin:'auto'}}>leadID: {lead}</p>
              <p style={{textAlign:'center',margin:'auto'}}>leadID: {name}</p>
              <p style={{textAlign:'center',margin:'auto'}}>leadID: {email}</p>
             
           
              </div>  }

        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
      <Helmet>
  <script async type="text/javascript" src={`https://create.lidstatic.com/campaign/be9dc152-8c16-6d75-1ad8-d0d274ae68d0.js?snippet_version=2&f=reset&callback=insertToken&_t=${new Date().getTime()}`}></script>
</Helmet>
    </Container>
  )
}














