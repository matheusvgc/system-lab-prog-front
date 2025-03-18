import { useContext } from "react";

import { AlertContext } from "@/context/alert.context";

export const useAlert = () => {
	return useContext(AlertContext);
};
