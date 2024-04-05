import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, useTheme } from "@mui/material";
import { toggleThemeMode } from "@/store/slices/themeSlice";
import { ThemeSwitch } from "../ui/switches/ThemeSwitch";
import { RootState } from "@/store/store";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const currentTheme = useSelector((state: RootState) => state.theme.mode);

  const handleChange = () => {
    dispatch(toggleThemeMode());

    localStorage.setItem("theme", currentTheme);
  };

  return (
    <FormControlLabel
      id="theme-selector"
      control={
        <ThemeSwitch
          sx={{ m: 1 }}
          checked={currentTheme === "dark"}
          onChange={handleChange}
          theme={theme}
        />
      }
      label=""
    />
  );
};

export default ThemeSelector;
