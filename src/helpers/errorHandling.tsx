export const getApiErrorCode = (error: any) => {
	let errorCode = "Errors_Unknown";

	if (error && error.message === "Network Error") {
		return "Errors_Network";
	}

	if (!error || !error.response) {
		return "Errors_Unknown";
	}

	if (error.response.status === 401) {
		return ""; // no error message
	}

	errorCode = "Errors_ServerUnknown";

	if (error.response.status === 403) {
		errorCode = "Errors_NoPermission";
	}

	return errorCode;
};

export const handleApiError = (error: any) => {
	if (error.response) {
		// Server errors
		if (error.response.status !== 403 || error.response.status !== 401) {
			console.log(error.response.data);
		}
	} else {
		// Local errors
		if (error.message !== "Network Error") {
			console.log("err:", error);
		}
	}
};
