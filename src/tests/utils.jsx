import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from '../hooks/useNotification';
import { render } from "@testing-library/react";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            }
        }
    });

    return ({ children }) => 
        (
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster />
            </QueryClientProvider>
        );
};

export const renderWithAppContext = (ui) => {
    render(ui, { wrapper: createWrapper() });
};

export const waitOneTick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
};
