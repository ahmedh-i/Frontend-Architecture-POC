import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useStore, initializeStore } from '../lib/infrastructure/redux'
import { Provider } from 'react-redux'



function MyApp({ Component, pageProps }: AppProps) {
  const reduxStore = initializeStore(pageProps ? pageProps.initialReduxState : {})
  const store = useStore(reduxStore.getState());

  return (<Provider store={store}>
    <Component {...pageProps} />
  </Provider>)
}

export default MyApp
