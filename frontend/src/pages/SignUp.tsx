import SignUpForm from '../components/SignUpForm';
import './styles/signUpPage.css';

function SignUp() {
  return (
    <main className='signup-page'>
      <img src="src/images/ngcash.jpg" alt="NG.CASH"/>
      <SignUpForm/>
    </main>
  )
}

export default SignUp;