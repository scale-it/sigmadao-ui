import { DurationType } from "@/types";
import { DAY_TO_SECONDS, HOUR_TO_SECONDS, MILLI_SECOND } from "@/constants";
const moment = require("moment");

export const convertToSeconds = (value: number | string | Date) => {
	return new Date(value).getTime() / MILLI_SECOND;
};

export const convertDurationTypeToSeconds = (
	type: DurationType,
	value: number
): number => {
	switch (type) {
		case DurationType.DAYS:
			return value * DAY_TO_SECONDS;
		case DurationType.HOURS:
			return value * HOUR_TO_SECONDS;
		default:
			return value;
	}
};

export const secToFormat = (seconds: number, format: string) => {
	return moment.utc(seconds * 1000).format(format);
};
