// app/heroes/page.tsx
import { HeroGrid } from '../components/HeroGrid';

export default async function HeroesPage() {
  const heroes = await fetch('https://api.opendota.com/api/heroStats').then(res => res.json());
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Hero Statistics</h1>
      <HeroGrid heroes={heroes} />
    </div>
  );
}