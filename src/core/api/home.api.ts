import { useLoadingStore } from '@src/app/stores';
import { ApiService } from '@src/core/services';
import { QueryKeysEnum, UserInfo, UserRequestProps } from '@src/core/model';
import {
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useUpdateMe = () => {
  const { showLoading, hideLoading } = useLoadingStore();

  return useMutation({
    mutationFn: async (body: UserRequestProps) => {
      showLoading();
      try {
        const result = await ApiService.put('users/me', body);
        return result;
      } finally {
        hideLoading();
      }
    },
  });
};

export const useGetProfile = (
  options?: Partial<
    UseQueryOptions<UserInfo, unknown, UserInfo, [QueryKeysEnum.GET_ME]>
  >,
) => {
  const { showLoading, hideLoading } = useLoadingStore();

  const data = useQuery({
    queryKey: [QueryKeysEnum.GET_ME],
    queryFn: async () => {
      showLoading();
      try {
        const res = await ApiService.get('');
        return res;
      } finally {
        hideLoading();
      }
    },
    ...options,
  });

  return data;
};
