# POC application using `NextJs`

This example creates an authentication system that uses a **signed and encrypted cookie to store session data**.

It uses best practices of architecture design for frontend applications.

**Features of the POC:**

- Logging in is by a real github username and using [`octokit`] to retrieve basic github account info.
- The logged in status is synchronized between browser windows/tabs using **`useUser`** hook and the [`swr`].
- The session data is signed and encrypted in a cookie.
  
## How to use
```
npm install
# then
npm run dev
```
The default application port is 3000