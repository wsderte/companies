import { Provider } from 'react-redux'
import { store } from './../redux/index'

function MyApp({ Component, pageProps }: any) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
