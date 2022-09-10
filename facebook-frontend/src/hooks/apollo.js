import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { SNACKBAR_TYPE } from 'constants/index';
import { useDispatch } from 'react-redux';
import { addSnackbar } from 'redux/slices/shared';

export const useMutationWithOnError = (mutation, options = {}) => {
  const dispatch = useDispatch();
  return useMutation(mutation, {
    onError(e) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.error,
          message: e.message
        })
      );
    },
    ...options
  });
};

export const useQueryWithOnError = (query, options = {}) => {
  const dispatch = useDispatch();
  return useQuery(query, {
    onError(e) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.error,
          message: e.message
        })
      );
    },
    ...options
  });
};

export const useLazyQueryWithOnError = (query, options = {}) => {
  const dispatch = useDispatch();
  return useLazyQuery(query, {
    onError(e) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.error,
          message: e.message
        })
      );
    },
    ...options
  });
};
