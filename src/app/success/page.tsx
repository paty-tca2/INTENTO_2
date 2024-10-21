'use client'
import { Suspense } from 'react';
import SuccessContent from '@/components/succesContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
