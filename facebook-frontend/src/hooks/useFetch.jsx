import { useMutationWithOnError, useQueryWithOnError } from './apollo';

export const useFetchQuery = (queryName, variables, skip, fetchPolicy = 'no-cache') => {
  const { data, loading, refetch } = useQueryWithOnError(queryName, {
    fetchPolicy,
    variables,
    skip
  });
  return {
    data,
    loading,
    refetch
  };
};

export const useFetchMutation = mutationName => {
  const [mutation, { data, loading }] = useMutationWithOnError(mutationName);
  return {
    mutation,
    data,
    loading
  };
};
