import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';


export function useQueryParams() {
  const { pathname } = useLocation();

  return useMemo(() => new URLSearchParams(pathname), [pathname]);
}
