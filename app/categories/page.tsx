import RunningMan from '../components/RunningMan';
import Bunny from '../components/Bunny';
import PregnantMother from '../components/PregnantMother'; 
import Dog from '../components/Dog'; // Import the Dog component

export default function Categories() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly', // Evenly space the items
          position: 'absolute',
          top: '0', // Positioned at the top of the screen
          width: '100%',
          zIndex: 10, // Ensure this row is above other content
        }}
      >
        <Dog /> {/* Dog positioned in the row */}
        <PregnantMother /> {/* PregnantMother positioned in the row */}
      </div>

      <Bunny /> {/* Bunny keeps its absolute position */}
      <RunningMan /> {/* RunningMan keeps its absolute position */}
    </main>
  );
}
