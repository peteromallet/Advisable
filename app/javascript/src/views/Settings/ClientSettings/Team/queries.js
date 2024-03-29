import { gql, useQuery, useMutation } from "@apollo/client";

const userFields = gql`
  fragment UserFields on User {
    id
    name
    email
    isTeamManager
  }
`;

export const GET_TEAM_MEMBERS = gql`
  ${userFields}

  query getTeamMembers {
    currentCompany {
      id
      users {
        ...UserFields
      }
    }
  }
`;

export function useTeamMembers(opts = {}) {
  return useQuery(GET_TEAM_MEMBERS, opts);
}

export const CREATE_USER_FOR_COMPANY = gql`
  ${userFields}

  mutation createUserForCompany($input: CreateUserForCompanyInput!) {
    createUserForCompany(input: $input) {
      user {
        ...UserFields
      }
    }
  }
`;

export function useCreateUserForCompany(company) {
  return useMutation(CREATE_USER_FOR_COMPANY, {
    update(cache, { data, errors }) {
      if (!errors) {
        const user = data.createUserForCompany.user;

        cache.modify({
          id: cache.identify(company),
          fields: {
            users(existing = []) {
              const newUserRef = cache.writeFragment({
                data: user,
                fragment: userFields,
              });

              return [...existing, newUserRef];
            },
          },
        });
      }
    },
  });
}

export const TOGGLE_TEAM_MANAGER = gql`
  ${userFields}

  mutation toggleTeamManager($input: ToggleTeamManagerInput!) {
    toggleTeamManager(input: $input) {
      user {
        ...UserFields
      }
    }
  }
`;

export function useToggleTeamManager() {
  return useMutation(TOGGLE_TEAM_MANAGER);
}

export const REMOVE_MEMBER = gql`
  mutation removeUserFromCompany($id: ID!) {
    removeUserFromCompany(input: { userId: $id }) {
      success
    }
  }
`;

export function useRemoveUserFromCompany(id) {
  return useMutation(REMOVE_MEMBER, {
    variables: { id },
    update(cache, { errors }) {
      if (errors) return;

      const teamMemberData = cache.readQuery({
        query: GET_TEAM_MEMBERS,
      });

      cache.writeQuery({
        query: GET_TEAM_MEMBERS,
        data: {
          ...teamMemberData,
          currentCompany: {
            ...teamMemberData.currentCompany,
            users: teamMemberData.currentCompany.users.filter((u) => {
              return u.id !== id;
            }),
          },
        },
      });
    },
  });
}
