
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {Toaster} from '../hooks/useNotification'
export default function ContextProvider({children}){
    let queryClient = new QueryClient();
    return(
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position='top-right'/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}