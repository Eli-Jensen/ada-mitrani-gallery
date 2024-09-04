import RunningMan from '../components/RunningMan';
import Bunny from '../components/Bunny';
import PregnantMother from '../components/PregnantMother'; // Import the PregnantMother component

export default function Categories() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <PregnantMother /> {/* Position the PregnantMother in the top right corner */}
      <Bunny />
      <RunningMan />
      {/* You can add more content here */}
    </main>
  );
}
