'use client';
export const dynamic = 'force-static';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToDefaultList() {
  const router = useRouter();
  const { owner } = useParams();

  useEffect(() => {
    if (owner) {
      router.replace(`/${owner}/main`);
    }
  }, [owner, router]);

  return null;
}