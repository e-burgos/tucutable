import { useState } from 'react';
import { ThemeProvider } from '@e-burgos/tucu-ui';
import { useMenuItems } from './router/menuItems';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RightButton } from './components/right-button';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const { menuItems } = useMenuItems();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        showSettings={false}
        rightButton={<RightButton menuItems={menuItems} />}
        logo={{
          name: 'Tucu',
          secondName: 'Table',
        }}
        customPaletteColor={{
          primary: '#F26522',
          darkPrimary: '#F26522',
        }}
        menuItems={menuItems}
        isAuthenticated
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
