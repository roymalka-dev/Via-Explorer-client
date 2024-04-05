import React, { useMemo } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { darkPalette, lightPalette } from './palette';
import { typography } from './typography';
import { ThemeProviderProps } from '@/types/theme.types';
import { RootState } from '@/store/store';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const themeDirection = useSelector((state: RootState) => state.theme.direction);

  const theme = useMemo(() => createTheme({
    palette: themeMode === 'light' ? lightPalette : darkPalette, 
    direction: themeDirection,
    typography,
  }), [themeMode, themeDirection]); 

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
