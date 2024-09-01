export default function BackToCategoriesButton() {
  return (
    <button
        style={{
        cursor: 'pointer',
        padding: '10px 20px',
        border: '2px solid #000',  // Black border for the oval
        borderRadius: '20px / 50%', // Oval shape with flat sides and curved ends
        backgroundColor: 'transparent', // Transparent background
        fontSize: '1rem',
        }}
    >
        Back to Categories
  </button>
  );
}