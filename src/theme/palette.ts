import { PaletteOptions } from "@mui/material/styles";
import { tokens } from "./tokens";

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: tokens.primary[500],
    light: tokens.primary[400],
    dark: tokens.primary[600]
  },
  secondary: {
    main: tokens.secondary[500],
    light: tokens.secondary[400], 
    dark: tokens.secondary[600],
  },

  grey: tokens.grey,
  background: {
    default: tokens.background.light,
    paper: tokens.background.main
  },

};

export const darkPalette: PaletteOptions = {
  mode: 'dark', 
  primary: {
    main: tokens.primary[100], 
    light: tokens.primary[800], 
    dark: tokens.primary[900],
  },
  secondary: {
    main: tokens.secondary[100], 
    light: tokens.secondary[200],
    dark: tokens.secondary[300],
  },

  grey: tokens.grey,
  background: {
    default: tokens.background.darker, 
    paper: tokens.background.dark, 
  },

  
};

