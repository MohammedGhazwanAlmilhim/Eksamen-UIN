import {useState, useEffect} from 'react'

// alt er endretr og ser helt unikt fra lærerens kode, og etter test så vikrer koden som den skal(:
// filen er ferdig og dere trenger ikke å røre den 😁

export const getStorageValue = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.log('Feil under henting av verdi fra lokal lagring:', error.message);
      return defaultValue;
    }
  };
  

 export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    });
  
    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log('Feil under lagring av verdi i lokal lagring:', error.message);
      }
    }, [key, value]);
  
    return [value, setValue];
  };
