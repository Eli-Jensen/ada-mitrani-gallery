import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function BackToCategoriesButton() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Button
      variant="outlined"
      sx={{
        padding: isSmallScreen ? '5px 10px' : '10px 20px', // Smaller padding on small screens
        border: '2px solid #000',
        borderRadius: '20px / 50%', // Oval shape
        backgroundColor: 'transparent',
        fontSize: isSmallScreen ? '0.75rem' : '1rem', // Smaller font size on small screens
        color: '#000', // Set the text color to black
        textTransform: 'none', // Keep the text in its original case
        '&:hover': {
          backgroundColor: '#f0f0f0', // Optional: Add a hover effect
        },
      }}
    >
      Back to Categories
    </Button>
  );
}
