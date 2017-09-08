export function convoCleaner(convo,getAllMsgs,deleteMSG,deleteConvo){

  return new Promise((resolveProm, rejProm)=>{
    let msgCount = convo.messages.length;

    //getAllMsgs.variables.conversation = ;
    console.log('CONVOOO',getAllMsgs.variables.conversation);
    getAllMsgs.refetch({ conversation: convo.id }).then(res=>{
      console.log('RESSS',res.data['Conversation'].messages);
      let messages = res.data['Conversation'].messages;
      //let messages = res.data.Conversation.messages == null? [] : res.data.Conversation.messages;
      if(messages.length>0){
        return removeMessage(messages);
      }
    }).then(()=>{
      console.log('deleteConvo')
      return deleteConvo({variables:{conversation:convo.id}})
    }).then(deleteConvoResult=>{
      console.log('resolved',deleteConvoResult);
      resolveProm();
    });
  });


  function removeMessage (messages){
    return new Promise((resolve,rej)=>{
      messages.forEach((message,index,array)=>{
        //delete each message
        deleteMSG({variables:{message:message.id}}).then(res=>{
          //if it's the last message call delete convo
          if(index == (array.length-1)){
            console.log('done messages');
            resolve();
          }
        })

      })
    });
  }

}
