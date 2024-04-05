import React, {   useState } from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import i18n from '@/locale/locale';
import { languageOptions } from '@/configs/locale.config';
import { toggleThemeDirection } from '@/store/slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { isRtl } from '@/utils/locale.utiles';



const LangSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

  const dispatch = useDispatch()
  const currentDirection = useSelector((state: RootState) => state.theme.direction); 



  

  const handleChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as string;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).then(() => { 
      localStorage.setItem('i18nextLng', newLanguage); 

      const newDirectionIsRtl = isRtl(newLanguage);
      const currentDirectionIsRtl = currentDirection === 'rtl';
      if (newDirectionIsRtl !== currentDirectionIsRtl) {
        dispatch(toggleThemeDirection()); 
      }
    });
  };
  

  return (
    <Box sx={{ width: 120}}>
      <FormControl id='language-selector'>
        
        <Select
          id="language-selector"
          value={selectedLanguage}
          onChange={handleChange}
          displayEmpty
          sx={{maxWidth: 120}}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src={option.icon} alt={option.alt} style={{ width: 24, height: 'auto' }} />
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
