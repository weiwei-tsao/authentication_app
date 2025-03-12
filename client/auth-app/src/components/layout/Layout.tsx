import { ReactNode } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../../theme/theme';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
