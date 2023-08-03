import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.ts";
import { useUpdateSetting } from "./useUpdateSetting.ts";

export const useSetting = () => {
	const { isLoading, error, data: settings } = useQuery({
		queryKey: ["settings"],
		queryFn : getSettings
	});

	return { isLoading, error, settings };
};
