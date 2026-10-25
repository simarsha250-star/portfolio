import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

interface NavigatorHints {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

function lowPowerDevice(): boolean {
  const n = navigator as Navigator & NavigatorHints;
  return (
    (n.hardwareConcurrency !== undefined && n.hardwareConcurrency <= 2) ||
    (n.deviceMemory !== undefined && n.deviceMemory <= 2) ||
    n.connection?.saveData === true
  );
}

/**
 * Decides whether heavy WebGL scenes may render. The 3D layer is purely
 * decorative: when this returns false the site shows lightweight SVG fallbacks.
 * It also waits until the browser is idle so 3D never competes with first paint.
 */
export function useScene3D(): boolean {
  const reduced = useReducedMotion();
  const small = useMediaQuery('(max-width: 767px)');
  const [idle, setIdle] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(webglAvailable() && !lowPowerDevice());
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setIdle(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  return supported && idle && !reduced && !small;
}
