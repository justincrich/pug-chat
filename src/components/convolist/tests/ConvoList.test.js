import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {ConvoList} from '../component.js';
import {ListItem} from '../listitem/component.js';
import {convoData} from './data.js';

describe('<ConvoList/>', () => {
  const userID = "cj6i6kecf23990168efbkxvgo";
  const wrapperConvoList = shallow(
    <ConvoList conversations={convoData.data.user.conversations} userID={convoData.data.user.id} deleteConvo={()=>{}}/>
  );
  it('ConvoList component loads',()=>{
    // expect(wrapperConvoList).toMatchSnapshot();
  })
});
