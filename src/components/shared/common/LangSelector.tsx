import React, { useState } from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import i18n from "@/locale/locale";
import { languageOptions } from "@/configs/locale.config";
import { toggleThemeDirection } from "@/store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { isRtl } from "@/utils/locale.utiles";

/**
 * LangSelector is a component for changing the application's language.
 * It renders a dropdown list of languages, allowing the user to select one.
 * Upon selection, it updates the i18n language setting and, if necessary,
 * toggles the application's theme direction between RTL and LTR.
 */
const LangSelector: React.FC = () => {
  // State to keep track of the currently selected language
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );

  const dispatch = useDispatch();
  // Access the current theme direction from the Redux store
  const currentDirection = useSelector(
    (state: RootState) => state.theme.direction
  );

  /**
   * Handles changes to the language selection.
   * It updates the selected language state, i18n language, and checks if the theme direction needs to be toggled.
   * @param {SelectChangeEvent} event The change event object from the Select component.
   */
  const handleChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as string;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).then(() => {
      localStorage.setItem("i18nextLng", newLanguage);

      // Check if the new language's direction differs from the current direction and toggle if necessary
      const newDirectionIsRtl = isRtl(newLanguage);
      const currentDirectionIsRtl = currentDirection === "rtl";
      if (newDirectionIsRtl !== currentDirectionIsRtl) {
        dispatch(toggleThemeDirection());
      }
    });
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl id="language-selector">
        <Select
          id="language-selector"
          value={selectedLanguage}
          onChange={handleChange}
          displayEmpty
          sx={{ maxWidth: 120 }}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img
                  src={option.icon}
                  alt={option.alt}
                  style={{ width: 24, height: "auto" }}
                />
                {option.name}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LangSelector;
