import { useMemo } from 'react'
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import {
    createStore,
    applyMiddleware,
} from 'redux';
import { RootState } from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

let store: any;

function initStore(preloadedState: RootState) {
    return createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunk))
    )
}

export const initializeStore = (preloadedState: RootState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState: RootState) {
    const _store = useMemo(() => initializeStore(initialState), [initialState])
    return _store
}