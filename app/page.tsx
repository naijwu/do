import DB from '@/components/DB/DB';
import Daily from '@/components/Daily/Daily';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <Daily />
      <DB />
    </main>
  );
}
