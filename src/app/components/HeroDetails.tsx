// src/components/HeroDetails.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function HeroDetails({ hero, matchups }: { hero: any; matchups: any[] }) {
  const { data: proMatches } = useQuery({
    queryKey: ['hero-pro-matches', hero.id],
    queryFn: () => 
      axios.get(`https://api.opendota.com/api/heroes/${hero.id}/matches`).then(res => res.data),
  });

  return (
    <div>
      <div className="flex items-start gap-8 mb-8">
        <img 
          src={`https://cdn.dota2.com${hero.img}`} 
          alt={hero.localized_name}
          className="w-32 h-32 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold">{hero.localized_name}</h1>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <StatCard 
              title="Win Rate" 
              value={`${((hero.pro_win / hero.pro_pick) * 100).toFixed(1)}%`} 
            />
            <StatCard title="Pick Rate" value={hero.pro_pick.toLocaleString()} />
            <StatCard title="Ban Rate" value={hero.pro_ban.toLocaleString()} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MatchupTable matchups={matchups} />
        <ProMatchesTable matches={proMatches as any[]} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-dota-card p-4 rounded-lg">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

function MatchupTable({ matchups }: { matchups: any[] }) {
  return (
    <div className="bg-dota-card p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Top Matchups</h2>
      <div className="space-y-2">
        {matchups.slice(0, 5).map((matchup) => (
          <div key={matchup.hero_id} className="flex justify-between">
            <span>Hero {matchup.hero_id}</span>
            <span>{matchup.wins}/{matchup.games_played} ({((matchup.wins/matchup.games_played)*100).toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProMatchesTable({ matches }: { matches: any[] }) {
  if (!matches) return <div className="bg-dota-card p-4 rounded-lg animate-pulse h-64" />;
  
  return (
    <div className="bg-dota-card p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recent Pro Matches</h2>
      <div className="space-y-2">
        {matches?.slice(0, 5).map((match) => (
          <div key={match.match_id} className="flex justify-between">
            <span>Match {match.match_id}</span>
            <span>{match.win ? 'Win' : 'Loss'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}