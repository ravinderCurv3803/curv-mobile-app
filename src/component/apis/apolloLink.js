import { from, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Config from './APIConfig'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Strings } from '../../utils'

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert(`Graphql error ${message}`)
        })
    }
    if (networkError)
        console.log('network error', networkError)
})

export const link = from([
    errorLink,
    new HttpLink({ uri: Config.BASE_URL })
])

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem(Strings.ASYNC_STORAGE_KEYS.TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

export const newLink = authLink.concat(link)