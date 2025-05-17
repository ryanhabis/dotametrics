import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-dota-dark border-b border-dota-accent/20 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-dota-accent hover:text-dota-accent/80 transition">
          Dotametrics
        </Link>
        <div className="flex gap-6">
          <Link href="/heroes" className="hover:text-dota-accent transition">
            Heroes
          </Link>
          <Link href="/matches" className="hover:text-dota-accent transition">
            Matches
          </Link>
        </div>
      </div>
    </nav>
  );
}