'use client';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { getConfig } from '@/services/config';
import { useRouter } from 'next/navigation';
import { ROUTES, CONFIG, QUERIES } from '@/utils/constants';

export default function App() {
  const router = useRouter();
  const { data } = useQuery([QUERIES.API_CONFIG], getConfig);

  useEffect(() => {
    data && renderCurrentPage();
  }, [data]);

  function renderCurrentPage() {
    const { installation } = data;
    const state =
      installation === CONFIG.APPS_SELECTED
        ? `?state=${CONFIG.APPS_SELECTED}`
        : '';
    switch (installation) {
      case CONFIG.NEW:
      case CONFIG.APPS_SELECTED:
        router.push(`${ROUTES.SETUP}${state}`);
        break;
      case CONFIG.FINISHED:
        router.push(ROUTES.OVERVIEW);
    }
  }
}
