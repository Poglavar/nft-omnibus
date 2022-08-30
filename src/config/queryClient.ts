import { QueryClient } from 'react-query';

export const queryClientSetup = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    });
};