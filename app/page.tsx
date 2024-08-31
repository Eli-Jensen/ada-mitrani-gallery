// app/page.tsx
import RunningMan from './components/RunningMan';
import Bunny from './components/Bunny';

export default function Home() {
  return (
    <main>
      <Bunny />
      <RunningMan />
      {/* You can add more content here */}
    </main>
  );
}
