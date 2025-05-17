// src/app/matches/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

export default function MatchesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['live-matches'],
    queryFn: () => axios.get('https://api.opendota.com/api/live').then(res => res.data),
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  if (isLoading) return <MatchSkeleton />;
  if (error) return <div>Error loading matches</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Live Matches</h1>
      <div className="grid gap-4">
        {(Array.isArray(data) ? data : []).map((match: any) => (
          <Link 
            key={match.match_id} 
            href={`/matches/${match.match_id}`}
            className="bg-dota-card p-4 rounded-lg hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <span className="text-radiant-500 font-medium">
                {match.radiant_team?.name || 'Radiant'}
              </span>
              <div className="text-center">
                <div className="text-sm text-gray-400">
                  {match.league?.name || 'Public Match'}
                </div>
                <div className="text-xl font-bold">
                  {match.radiant_score} - {match.dire_score}
                </div>
                <div className="text-sm">
                  {Math.floor(match.game_time / 60)}:{String(match.game_time % 60).padStart(2, '0')}
                </div>
              </div>
              <span className="text-dire-500 font-medium">
                {match.dire_team?.name || 'Dire'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MatchSkeleton() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Live Matches</h1>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-dota-card p-4 rounded-lg mb-4 h-20 animate-pulse" />
      ))}
    </div>
  );
}