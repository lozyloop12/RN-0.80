import { DependencyList, useEffect } from 'react';
import useTimeout from './useTimeout';

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: DependencyList,
) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    reset();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
