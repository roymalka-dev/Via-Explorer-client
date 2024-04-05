import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"


const Requests = () => {
  const {t} = useTranslation()
  return (
   <Box>
    <Typography
         gutterBottom
         variant="subtitle1" 
         component="div"
         color="text.primary"
         sx={{
          
           fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem', lg: '1.5rem' }, 
         }}
       >
         {t("site.pages.home.sections.requests")}
       </Typography>
   </Box>
  )
}

export default Requests