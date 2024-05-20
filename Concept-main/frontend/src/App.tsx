import { useContext, useEffect,useState } from 'react'
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from './Store'
import { Helmet } from 'react-helmet-async'
function App() {

  const [disappear,setDisappear]=useState(false)
  const storedData = localStorage.getItem('userData') || '{}';
const userData = JSON.parse(storedData);
console.log(userData);

   
  const [id, setId] = useState('');

  useEffect(()=>{

  },[]);



  const handleDoubleClick = () => {
    if (userData && userData.leadID) {
      setDisappear(true)
      navigator.clipboard.writeText(userData.leadID)
        .then(() => {
          setTimeout(()=>{
            setDisappear(false)
          },3000)
         
        })
        .catch(err => {
          console.error('Failed to copy leadID: ', err);
        });
    }
  };


  const button=()=>{
    if(localStorage.getItem('userData'))
   { 
    localStorage.removeItem('userData');
   }
    window.location.href='/'
  }

 

   

  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)

  useEffect(() => {


    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])
  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  
  
  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    // window.location.href = '/signin'


   
  }


  useEffect(()=>{
    const timer = setTimeout(() => {
      
      localStorage.removeItem('userData');
     
    }, 5000); 

    

    return () => clearTimeout(timer);
  },[])

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
      <Navbar
          className="d-flex flex-column align-items-stretch p-2 pb-0 mb-3"
          bg="dark"
          variant="dark"
          expand="lg"
        >
          
          <div className="d-flex justify-content-between align-items-center">
            <LinkContainer to="/" className="header-link">
              <Navbar.Brand>CONCEPT XX</Navbar.Brand>

             
              
            </LinkContainer>
            <Navbar.Collapse>

              <Nav className="w-100 justify-content-end">
                <Link
                  to="#"
                  className="nav-link header-link"
                  onClick={switchModeHandler}
                >
                  

<i
                    className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                  ></i>{' '}
                  {mode === 'light' ? 'Light' : 'Dark'}
                </Link>

                {userData.leadID && <div style={{position:'absolute',width:'50%',height:'auto',background:'black',color:'white',top:'5%',left:'30%',padding:'10px',borderRadius:'10px'}}>
          <p onDoubleClick={handleDoubleClick} style={{cursor:'pointer',userSelect: 'none'}} >leadID: {userData.leadID} </p>
          <p >Name: {userData.firstName + ' '+ userData.lastName}  </p>
          <p >Email: {userData.email} </p>
          <p >Phone: {userData.phone} </p>
          <p >zip: {userData.zipcode} </p>
          <button onClick={button} style={{marginLeft:'auto',display:'flex',borderRadius:'6px',background:'black',color:'white',border: '2px solid pink',padding:'4px 12px'}}>OK</button>
          </div>}

          

                {userInfo ? (
                  <NavDropdown
                    className="header-link"
                    title={`Hello, ${userInfo.name}`}
                  >
                    
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      {' '}
                      Sign Out{' '}
                    </Link>
                  </NavDropdown>
                ) : (
                  <NavDropdown className="header-link" title={`Hello, sign in`}>
                    <LinkContainer to="/signin">
                      <NavDropdown.Item>Sign In</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <Link to="/orderhistory" className="nav-link header-link">
                  History
                </Link>
            
                <Link to="/cart" className="nav-link header-link p-0">
                  {
                    <span className="cart-badge">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  }
                  <svg
                    fill="#ffffff"
                    viewBox="130 150 200 300"
                    width="40px"
                    height="40px"
                  >
                    <path d="M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z M 197.707 348.201 C 203.179 348.201 207.434 352.572 207.434 358.192 C 207.434 363.812 203.179 368.183 197.707 368.183 C 192.236 368.183 187.98 363.812 187.98 358.192 C 187.98 352.572 192.236 348.201 197.707 348.201 Z M 285.25 348.201 C 290.722 348.201 294.977 352.572 294.977 358.192 C 294.977 363.812 290.722 368.183 285.25 368.183 C 279.779 368.183 275.523 363.812 275.523 358.192 C 275.523 352.572 279.779 348.201 285.25 348.201 Z" />
                  </svg>
                  <span>Cart</span>
               
                </Link>

                 </Nav>
            </Navbar.Collapse>
          </div>
          <div className="sub-header">
          <div className="d-flex justify-content-center">
  <div className="d-flex gap-4">

 
      <a href="/finalexpense" className="nav-link header-link">
        Final Expense
      </a>
      <a href="/medicareadvantage" className="nav-link header-link">
        Medicare Advantage
      </a>
      <a href="/affordablecareact" className="nav-link header-link">
        Affordable Care Act
      </a>
   
    
  </div>
</div>

</div>

        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
      {disappear &&
          <div style={{position:'absolute',width:'auto',height:'auto',background:'black',color:'white',bottom:'5%',left:'45%',padding:'2px 8px',borderRadius:'10px'}}>


         <p className='text-center'>Text copied to clipboard</p>

          </div>

          }
        <div className="text-center">All rights reserved</div>
      </footer>
      
    </div>
  )
}
export default App