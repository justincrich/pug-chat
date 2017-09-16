import {gql} from 'react-apollo'

export const createMsg = gql`
mutation createMsg(
  $text:String!,
  $userID:ID!,
  $convoID:ID!
  ){
    createMessage(
      text:$text,
      userId:$userID,
      conversationId:$convoID){
      id
      text
      createdAt
      user{
        name
        imageUrl
      }
    }
  }
`


export const deleteConversation= gql`
  mutation deleteConversation($conversation:ID!){
    deleteConversation(id:$conversation){
      id
    }
  }
`;

export const deleteMessage = gql`
  mutation deleteMessage($message:ID!){
    deleteMessage(id:$message){
      id
    }
  }
`;

export const createConvo = gql`
  mutation createConvoMsg(
  $recipients:[ID!]){
  createConversation(usersIds:$recipients){
    id
    users{
      name
      email
      imageUrl
    }
  }
  }
`
