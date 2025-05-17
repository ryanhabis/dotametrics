// src/app/heroes/[heroId]/page.tsx
import { HeroDetails } from '../../components/HeroDetails';

export default async function HeroPage({
  params,
}: {
  params: { heroId: string };
}) {
  // Fetch hero data in parallel
  const [heroData, matchups, itemPopularity] = await Promise.all([
    fetch(`https://api.opendota.com/api/heroStats`).then(res => res.json()),
    fetch(`https://api.opendota.com/api/heroes/${params.heroId}/matchups`).then(res => res.json()),
    fetch(`https://api.opendota.com/api/heroes/${params.heroId}/itemPopularity`).then(res => res.json()),
  ]);

  const hero = heroData.find((h: any) => h.id === Number(params.heroId));

  if (!hero) return <div>Hero not found</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center">{hero.localized_name}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Hero Image */}
        <img
          src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace(
            'npc_dota_hero_',
            ''
          )}.png`}
          alt={hero.localized_name}
          className="w-32 h-32 object-contain mx-auto md:mx-0 rounded-lg shadow-lg bg-gray-800"
        />
        {/* Stats Table */}
        <table className="min-w-[300px] bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <tbody>
            <tr>
              <td className="font-semibold p-2">Primary Attribute</td>
              <td className="p-2 capitalize">{hero.primary_attr}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Attack Type</td>
              <td className="p-2">{hero.attack_type}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Base Health</td>
              <td className="p-2">{hero.base_health}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Base Mana</td>
              <td className="p-2">{hero.base_mana}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Base Attack</td>
              <td className="p-2">{hero.base_attack_min} - {hero.base_attack_max}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Base Armor</td>
              <td className="p-2">{hero.base_armor}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Move Speed</td>
              <td className="p-2">{hero.move_speed}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <HeroDetails hero={hero} matchups={matchups} />

        {/* Recommended Items */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Recommended Items</h2>
          {itemPopularity &&
            ['start_game_items', 'early_game_items', 'mid_game_items', 'late_game_items'].map(category => {
              const items = itemPopularity?.[category];
              return Array.isArray(items) && items.length > 0 ? (
                <div key={category} className="mb-4">
                  <h3 className="font-semibold capitalize mb-1 text-gray-600">{category.replace(/_/g, ' ')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item: string) => (
                      <img
                        key={item}
                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/items/${item}_lg.png`}
                        alt={item}
                        className="w-10 h-10 rounded border bg-gray-800"
                      />
                    ))}
                  </div>
                </div>
              ) : null;
            })}
        </div>

        {/* Example: Popular Builds (static or from API) */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Popular Builds</h2>
          <p className="text-gray-400">Coming soon!</p>
          {/* You can fetch and display skill builds here */}
        </div>
      </div>
    </div>
  );
}