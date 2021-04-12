export const required = (value: string | number) => (value ? undefined : "Required");
export const maxLength = (max: number) => (value: string) => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
export const number = (value: string | number) => (value && isNaN(Number(value)) ? "Must be a number" : undefined);
export const minValue = (min: number) => (value: number) => (value && value < min ? `Must be at least ${min}` : undefined);
export const maxValue = (max: number) => (value: number) => (value && value > max ? `Must be at most ${max}` : undefined);
export const minValue0 = minValue(0);
export const maxValue500 = maxValue(500);
export const maxLength100 = maxLength(100);

export const validateImageWeight = (imageFile: File) => {
	if (imageFile && imageFile.size) {
		const imageFileKb = imageFile.size / 1024;
		const maxWeight = 10240;

		if (imageFileKb > maxWeight) {
			return `Image size must be less or equal to ${maxWeight / 1024} MB. Your file: ${(imageFileKb / 1024).toFixed(2)} MB`;
		}
	}
};
