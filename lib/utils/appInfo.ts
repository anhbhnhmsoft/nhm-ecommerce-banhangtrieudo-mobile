import Constants from "expo-constants";
import dayjs from "dayjs";

export const appInfo = {
  version: Constants.expoConfig?.version || "1.0.0",
  year: dayjs().year(),
};
