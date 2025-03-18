export function getErrorMessage(error: any) {
	if (error.response) {
		if (typeof error.response.data.error === "string")
			return error.response.data.error;
		if (typeof error.response?.error === "string") return error.response.error;
		if (typeof error.response.data === "string") return error.response.data;
		if (typeof error.response === "string") return error.response;
	}
	if (typeof error === "string") {
		if (error?.includes("<style>")) return "Erro inesperado*";
		return error;
	}
	if (error.code) {
		return error.message;
	}
	console.log("Erro inesperado", error);
	return "Erro inesperado";
}
