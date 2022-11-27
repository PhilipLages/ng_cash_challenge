import ReactDOM from 'react-dom/client';
import AuthProvider from './context/AuthProvider';
import Routes from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <Routes />
  </AuthProvider>
)
