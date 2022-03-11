import { useEffect, useState } from 'react'
import useSWR from "swr";
import AuthFakeApi from '../../data/auth/AuthFakeApi';
import AuthHolder from '../../domain/entities/auth/models/AuthHolder';
import User from '../../domain/entities/auth/structures/User';

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data, mutate: mutateUser } = useSWR<User>('/api/auth/user', new AuthFakeApi().loadSession)
  const [user, setUser] = useState(new AuthHolder());

  useEffect(() => {
    if (data) setUser(new AuthHolder().onSessionLoad(data as User));

    if (!redirectTo || !data) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isUserAuthorized()) ||
      (redirectIfFound && user?.isUserAuthorized())
    ) {
        location.assign(redirectTo)
    }
  }, [data, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
