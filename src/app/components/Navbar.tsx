'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="flex gap-4 p-4 bg-gray-900">
      <Link 
        href="/heroes" 
        className={pathname === '/heroes' ? 'text-orange-500' : 'text-gray-400'}
      >
        Heroes
      </Link>
      <Link
        href="/matches"
        className={pathname === '/matches' ? 'text-orange-500' : 'text-gray-400'}
      >
        Matches
      </Link>
    </nav>
  );
}