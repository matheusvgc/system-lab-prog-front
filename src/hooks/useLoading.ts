import { useState } from "react";

export function useLoading<T = string>() {
	const [state, setState] = useState<T[]>([]);

	const isLoading = (prop: T) => state.includes(prop);

	const setIsLoading = (prop: T, remove?: boolean) => {
		if (remove)
			setState((prevState) => prevState.filter((state) => state !== prop));
		else setState((prevState) => [...prevState, prop]);
	};

	return { isLoading, setIsLoading };
}
