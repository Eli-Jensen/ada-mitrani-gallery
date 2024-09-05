import RunningMan from '../components/RunningMan';
import Bunny from '../components/Bunny';
import PregnantMother from '../components/PregnantMother';
import Dog from '../components/Dog';

export default function Categories() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <Dog />
      <PregnantMother /> {/* Position the PregnantMother in the top right corner */}
      <Bunny />
      <RunningMan />
      {/* You can add more content here */}
    </main>
  );
}
