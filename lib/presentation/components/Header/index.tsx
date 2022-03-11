import Link from 'next/link'
import useUser from '../../../infrastructure/hooks/useUser';
import { useRouter } from 'next/router'
import Image from 'next/image'
import AuthHeaderViewModel from '../../view-model/auth/AuthHeaderViewModel';
import AuthUseCase from '../../../domain/interactors/auth/AuthUseCase';
import AuthFakeApi from '../../../data/auth/AuthFakeApi';
import AuthHeader from '../../views/auth/AuthHeader';

export default function Header() {
  const { user, mutateUser } = useUser()
  const router = useRouter()

  return (
    <header>
      <nav>
        <ul>
          <li>
            {user?.isUserAuthorized() === true && <Link href="/">
              <a>Home</a>
            </Link>}
          </li>
          {user?.isUserAuthorized() === true && (
            <AuthHeader authViewModel={new AuthHeaderViewModel(new AuthUseCase(new AuthFakeApi(), user), user)} />
          )}
          <li>
            <a href="#">
              <Image
                src="/GitHub-Mark-Light-32px.png"
                width="32"
                height="32"
                alt=""
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
