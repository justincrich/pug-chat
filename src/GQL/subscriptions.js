import {gql} from 'react-apollo';

export const newMsgSubscription = gql`
  subscription newMsgSubscription($convoID:ID!){
    Message(filter:{
      mutation_in:[CREATED],
      node:{
        conversation:{
          id:$convoID
        }
      }
    }){
      node{
        id
        text
        user{
          name
          imageUrl
          updatedAt
        }
      }
    }
  }
`

export const newMessageSubscriptions =
gql`
    subscription newMessageSubscriptions($userID:ID!){
              Message(filter:{
                mutation_in:[CREATED]
              }){
                node{
                  conversation{
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

    }
    `;
