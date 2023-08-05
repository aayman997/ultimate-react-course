import { useRef, useEffect, RefObject } from "react";

export const useOutsideClick = (handler?: () => void, listenCapturing = true): RefObject<HTMLDivElement> => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleCLick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				handler?.();
			}
		};
		document.addEventListener("click", handleCLick, listenCapturing);

		return () => document.removeEventListener("click", handleCLick, listenCapturing);
	}, [handler, listenCapturing]);
	return ref;
};
