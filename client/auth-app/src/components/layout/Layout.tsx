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
          minHeight: '100vh',
          backgroundColor: 'background.default',
          py: 4,
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
