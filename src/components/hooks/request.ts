"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useURLParams() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const updateQueryParams = (params: URLSearchParams) => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            updateQueryParams(params);
        },
        [searchParams, pathname, router],
    );

    const removeQueryString = useCallback(
        (name: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(name);
            updateQueryParams(params);
        },
        [searchParams, pathname, router],
    );

    const createQueryStringMany = useCallback(
        (inputParams: { name: string; value: string }[]) => {
            const params = new URLSearchParams(searchParams.toString());
            inputParams.forEach((param) => params.set(param.name, param.value));
            updateQueryParams(params);
        },
        [searchParams, pathname, router],
    );

    const appendSearchParams = (paramKey: string, paramValue: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(paramKey, paramValue);
        updateQueryParams(params);
    };

    const removeSearchParams = (paramKey: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(paramKey);
        updateQueryParams(params);
    };

    const addMultpleSearchParams = (paramsArray: { name: string; value: string }[]) => {
        const params = new URLSearchParams(searchParams.toString());
        paramsArray.forEach((param) => params.set(param.name, param.value));
        updateQueryParams(params);
    };

    const handleAppendAndRemoveParams = ({
        appendKey,
        removeKey,
    }: {
        appendKey?: { key: string; value: string };
        removeKey?: { key: string };
    }) => {
        const params = new URLSearchParams(searchParams.toString());

        if (appendKey) params.set(appendKey.key, appendKey.value);
        if (removeKey) params.delete(removeKey.key);

        updateQueryParams(params);
    };

    return {
        createQueryString,
        removeQueryString,
        createQueryStringMany,
        appendSearchParams,
        removeSearchParams,
        addMultpleSearchParams,
        handleAppendAndRemoveParams,
    };
}

export function useGetSearchParamValue(paramKey: string, defaultValue = "") {
    const searchParams = useSearchParams();
    return searchParams.get(paramKey) ?? defaultValue;
}