import { gql } from "@apollo/client";

export const SAVE_DATA = gql`
  mutation SaveData($id: String!) {
    saveData(id: $id) {
      id
    }
  }
`;
