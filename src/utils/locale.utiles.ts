

const rtlLanguages = ['he', 'ar']; 


export const isRtl = (languageCode: string) => {
    return rtlLanguages.includes(languageCode);
  };