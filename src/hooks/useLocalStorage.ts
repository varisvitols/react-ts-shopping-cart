import React, { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  // invoking function in the UseState initial value, cause we wanna lookup the value from local storage only one time,
  // as it's kinda slow, and we dont want to do it every time the component re-renders.
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  // return [value, setValue] as [typeof value, typeof setValue];
  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
