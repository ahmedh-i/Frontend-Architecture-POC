import React from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { InferGetServerSidePropsType } from 'next';
import User from '../lib/domain/entities/auth/structures/User';
import { sessionOptions } from '../lib/infrastructure/session';
import Layout from '../lib/presentation/components/Layout';

export default function HomePage({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <h1>Your GitHub profile</h1>

      {user?.isLoggedIn && (
        <>
          <p style={{ fontStyle: 'italic' }}>
            Public data, from{' '}
            <a style={{color: "violet"}} href={`https://github.com/${user.login}`}>
              https://github.com/{user.login}
            </a>
            , reduced to `login` and `avatar_url`.
          </p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user
  if (user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      },
      props: {
        user: { isLoggedIn: false, login: '', avatarUrl: '' } as User,
      }
    }
  }

  return {
    props: { user: req.session.user },
  }
}, sessionOptions);
