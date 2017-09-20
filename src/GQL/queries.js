import {gql} from 'react-apollo'

export const userQuery = gql`
  query {
    user {
      id
      name
      email
      imageUrl
    }
  }
`

export const getConvos = gql`
  query ($userID:ID!){
    user{
      id
      name
      conversations(orderBy:updatedAt_DESC){
        id
        users(filter:{
          id_not:$userID
        }){
          id
          name
          imageUrl
        }
        messages(last:1){
          text
          createdAt
          id
        }
      }
    }
  }
`

export const getSingleConversation = gql`
  query getSingleConversation($convoID:ID!){
    Conversation(id:$convoID){
      id
      users{
        name
        id
        imageUrl
      }
      messages{
        id
        createdAt
        text
        user{
          id
          name
          imageUrl
        }
      }
    }
    user{
      id
    }
  }
`

export const getAllConvoMsgs = gql`
  query ($conversation:ID!){
    Conversation(id:$conversation){
      id
      messages{
        id
      }
    }
  }
`

export const getUserByEml = gql`
  query getUser($email:String){
    User(email:$email){
      id
      email
      name
    }
  }
`
export const searchUsers = gql`
  query searchUsers($term:String){
  allUsers(filter:{OR:[{email_contains:$term},{name_contains:$term}]}){
    id
    name
    email
  }
  }
`
