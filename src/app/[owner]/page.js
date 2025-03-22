'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToDefaultList() {
  const router = useRouter();
  const { owner } = useParams();

  useEffect(() => {
    if (owner) {
      router.replace(`/${owner}/main`);
    }
  }, [owner]);

  return null;
}