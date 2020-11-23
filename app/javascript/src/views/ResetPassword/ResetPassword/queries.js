import { gql, useMutation } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      reset
    }
  }
`;

export const useResetPassword = () => useMutation(RESET_PASSWORD);
