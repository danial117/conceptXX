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

export default function MedicareAdvantagePage() {
  const navigate = useNavigate()
  const { search } = useLocation()
 
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipcode: '',
    leadID:''
  });

  const [token,setToken]=useState(false);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };











  useEffect(() => {
    // This effect will run once when the component mounts
    const insertToken = (token) => {
      // Get the form element
     

     setToken(token)
        // Get the element with id 'leadid_token'
        let tokenElement = document.getElementById('leadid_token');

        fetch(`http://localhost:4000/api/users/leadID/${token}`,{
          method:'GET'
        }).then((response)=>response.json()).then((result)=>{console.log(result)})
        


      



        // If the element does not exist, create it
       
  
        // Set the value of the element to the token
      
        setFormData((prevFormData) => ({
          ...prevFormData,
          leadID: token,
        }));
        console.log('Token set:', token);

        if (!tokenElement) {
          tokenElement = document.createElement('input');
          tokenElement.type = 'hidden';
          tokenElement.id = 'leadid_token';
          tokenElement.name = 'leadid_token';
          signupForm.appendChild(tokenElement);
        }
        tokenElement.value = token;
        
     
    };

    // Expose insertToken globally
    window.insertToken = insertToken;

    // Append the external script
    const script = document.createElement('script');
    script.id = 'LeadiDscript_campaign';
    script.type = 'text/javascript';
    script.async = true;
    const timestamp = new Date().getTime();
    script.src = `https://create.lidstatic.com/campaign/be9dc152-8c16-6d75-1ad8-d0d274ae68d0.js?snippet_version=2&_t=${timestamp}&callback=insertToken&f=reset`;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      const script = document.getElementById('LeadiDscript_campaign');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);








  
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signin, isLoading } = useDataMutation()

  const submitHandler = async (e) => {
    e.preventDefault();
   
    try {
      if(token){
        
      const data = await signin(formData);
      localStorage.setItem('userData', JSON.stringify(data));
      
      

      if(data){
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          zipcode: '',
          leadID:''
        });
      }

     
      const script = document.getElementById('LeadiDscript_campaign');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }

      // localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.href = '/';
    }
    } catch (err) {
      toast.error(getError(err));
    } finally {
      
    }
  };



  // <!-- Growform Snippet-->
  //   <script type="text/javascript" src = "https://embed.growform.co/client/6641bb0ab73036000bcfce2c"></script>
  //   <!-- End Growform Snippet --> 

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect)
  //   }
  // }, [navigate, redirect, userInfo])




 











  return (
  


      

  <Container className="small-container">
  <Helmet>
    <title>Medicare Advantage</title>
  </Helmet>
  <h1 className="my-3">Medicare Advantage</h1>
  <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone No</Form.Label>
        <Form.Control
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="zipcode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="text"
          required
          value={formData.zipcode}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="mb-3">
     
        <Button disabled={isLoading} type="submit">
          Get Your Medicare Quote
        </Button>
        {isLoading && <LoadingBox />}
      </div>
    </Form>
</Container>
     
   
  )
}