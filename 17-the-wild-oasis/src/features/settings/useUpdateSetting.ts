import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings.ts";

export const useUpdateSetting = () => {
	const queryClient = useQueryClient();
	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess : async () => {
			toast.success("Setting Successfully Updated");
			await queryClient.invalidateQueries({
				queryKey: ["settings"]
			});
		},
		onError   : (error: Error) => toast.error(error.message)
	});
	return { isUpdating, updateSetting };
};
