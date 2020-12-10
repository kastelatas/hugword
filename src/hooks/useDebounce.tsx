import { useRef, useEffect, useCallback } from 'react'
import _ from 'lodash'

 const useDebouncedEffect = (effect, delay , deps) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}

export default useDebouncedEffect