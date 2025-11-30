import { useCallback, useEffect, useRef } from "react";

export function useDebounce<T>(
    callback: (value: T) => void,
    delay: number
) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedFn = useCallback(
        (value: T) => {
            // mỗi lần gọi lại thì clear cái timeout cũ
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // set timeout mới
            timeoutRef.current = setTimeout(() => {
                callback(value);
            }, delay);
        },
        [callback, delay]
    );

    // clear timeout khi unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedFn;
}
