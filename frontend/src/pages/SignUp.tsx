import SignUpForm from '../components/SignUpForm';
import './styles/signUpPage.css';

function SignUp() {
  return (
    <main className='signup-page'>
      <img src="src/images/ngcash.jpg" alt="NG.CASH" className='image'/>
      <h1 className='title'>Faça parte da geração NG!</h1>
      <SignUpForm/>
    </main>
  )
}

export default SignUp;