import { ThemeProvider } from '@e-burgos/tucu-ui';
import { useMenuItems } from './router/menuItems';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SwitchMode from './components/SwitchMode';

function App() {
  const queryClient = new QueryClient();
  const { menuItems } = useMenuItems();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        showSettings={false}
        rightButton={<SwitchMode />}
        logo={{
          name: 'Tucu',
          secondName: 'Table',
        }}
        customPaletteColor={{
          primary: '#F26522',
        }}
        menuItems={menuItems}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
