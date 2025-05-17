// Hero stat cards
export default function HeroGrid({ heroes }: { heroes: any[] }) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {heroes.slice(0, 10).map((hero) => (
          <div key={hero.id} className="bg-dota-dark p-4 rounded-lg">
            <img 
              src={`https://cdn.dota2.com${hero.img}`} 
              alt={hero.localized_name}
              className="w-full h-24 object-contain"
            />
            <h3 className="font-bold mt-2">{hero.localized_name}</h3>
            <p>Win Rate: {((hero.pro_win / hero.pro_pick) * 100).toFixed(1)}%</p>
          </div>
        ))}
      </div>
    );
  }