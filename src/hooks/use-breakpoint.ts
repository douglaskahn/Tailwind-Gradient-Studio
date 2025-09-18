
"use client";

import { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

const breakpoints = fullConfig.theme.screens as Record<string, string>;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint(breakpointKey: BreakpointKey) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${breakpoints[breakpointKey]})`;
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => {
      setMatch(e.matches);
    };

    mql.addEventListener('change', onChange);
    setMatch(mql.matches);

    return () => {
      mql.removeEventListener('change', onChange);
    };
  }, [breakpointKey]);

  return match;
}
