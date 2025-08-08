import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseUrlFilterOptions {
  paramName: string;
  validValues: string[];
  defaultValue?: string | null;
}

export function useUrlFilter({ 
  paramName, 
  validValues, 
  defaultValue = null 
}: UseUrlFilterOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string | null>(defaultValue);

  // Validate if the value is valid
  const isValidValue = (val: string): boolean => {
    return validValues.includes(val);
  };

  // Initialize from URL params with validation
  useEffect(() => {
    const paramValue = searchParams.get(paramName);
    
    if (paramValue) {
      // Check if the value is valid
      if (isValidValue(paramValue)) {
        setValue(paramValue);
      } else {
        // Remove invalid value from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete(paramName);
        router.replace(`?${params.toString()}`);
        setValue(defaultValue);
        console.warn(`Invalid ${paramName} value removed from URL:`, paramValue);
      }
    } else {
      setValue(defaultValue);
    }
  }, [searchParams, router, paramName, validValues, defaultValue, isValidValue]);

  // Handle value change
  const handleValueChange = (newValue: string) => {
    // Validate that the value is valid
    if (!isValidValue(newValue)) {
      console.warn(`Invalid ${paramName} value attempted:`, newValue);
      return;
    }

    setValue(newValue);
    
    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (newValue && newValue !== defaultValue) {
      params.set(paramName, newValue);
    } else {
      params.delete(paramName);
    }
    
    router.push(`?${params.toString()}`);
  };

  // Clear filter
  const clearFilter = () => {
    setValue(defaultValue);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramName);
    router.push(`?${params.toString()}`);
  };

  return {
    value,
    setValue: handleValueChange,
    clearFilter,
    isValidValue
  };
}
