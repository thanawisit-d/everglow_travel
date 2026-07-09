import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/th');
}

export const dynamic = 'force-static';
