import type { NextPage } from 'next'
import LoginComponent from '../../lib/presentation/views/auth/LoginComponent';
import AuthViewModel from '../../lib/presentation/view-model/auth/AuthViewModel';
import AuthFakeApi from '../../lib/data/auth/AuthFakeApi';
import AuthUseCase from '../../lib/domain/interactors/auth/AuthUseCase';
import AuthHolder from '../../lib/domain/entities/auth/models/AuthHolder';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../../lib/infrastructure/session';

const Login: NextPage = () => {
    const authRepository = new AuthFakeApi();
    const authHolder = new AuthHolder();
    
    const authUseCase = new AuthUseCase(authRepository, authHolder);

    const authViewModel = new AuthViewModel(authUseCase, authHolder);

    return <LoginComponent authViewModel={authViewModel}/>;
}

export default Login;

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
    const user = req.session.user
    if (user) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    }

    return {
      props: {},
    }
  }, sessionOptions);