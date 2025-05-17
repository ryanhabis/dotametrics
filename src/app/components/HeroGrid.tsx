// components/HeroGrid.tsx
import Link from 'next/link';

export function HeroGrid({ heroes }: { heroes: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {heroes.map((hero) => (
        <Link 
          key={hero.id} 
          href={`/heroes/${hero.id}`}
          className="bg-dota-card p-4 rounded-lg hover:shadow-lg transition"
        >
          <img 
            src={`https://cdn.dota2.com${hero.img}`} 
            alt={hero.localized_name}
            className="w-full h-24 object-contain"
          />
          <h3 className="font-bold mt-2">{hero.localized_name}</h3>
          <p>Win Rate: {((hero.pro_win / hero.pro_pick) * 100).toFixed(1)}%</p>
        </Link>
      ))}
    </div>
  );
}