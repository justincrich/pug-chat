import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ListItem from '../component.js';
import sinon from 'sinon';

const data = {
  "id": "cj7jmww5d50e701999crt75cv",
  "users": [
    {
      "id": "cj6feat4xhoow0152iyz7wn1x",
      "name": "Auguste Deschamps",
      "imageUrl": "https://randomuser.me/api/portraits/med/men/99.jpg"
    }
  ],
  "messages": [
    {
      "text": "ddd",
      "createdAt": "2017-09-16T17:31:46.000Z",
      "id": "cj7nlb3le5fsq0102m6r3yvrb"
    }
  ]
}

describe('<ListItem/>',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(
      <ListItem
        key={data.id}
        message={data.messages[0]}
        users={data.users}
        convo={data}
        userID={data.userID}
        deleteConvo={()=>{}}
        />
    );
  })
  it('List item loads',()=>{
    // expect(wrapper).toMatchSnapshot();
  });

  test('Can open conversation',()=>{

  })
})
