import React from 'react';
import AppHeader from './AppHeader';
import TestRender from 'react-test-renderer';
import Shallow, { ShallowRenderer } from 'react-test-renderer/shallow';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { expect } from "chai";

Enzyme.configure({ adapter: new Adapter() });




describe('<AppHeader />', () => {

  it("mounts", () => {
    const wrapper = shallow(<AppHeader messages={["is first message", "is second message"]} />);
    // expect(toJson(wrapper)).toMatchSnapshot()
    console.log(`view: ${JSON.stringify(toJson(wrapper))}`)
  });
  it.only("renders", () => {
    const view = render(<AppHeader messages={["is first message", "is second message"]} />);
    // expect(toJson(view)).toMatchSnapshot()
    console.log(`view: ${JSON.stringify(view)}`)
  });
  // it("doesnt crap", () => {
  //   // Enzyme.mount(<App testMode={ true} />);
  //   renderer.createRenderer().render(<App testMode={true} />);
  //   // let tree = component.toJSON();
  //   // console.log(tree)
  // })
  // it("does list", () => {
  //   // Enzyme.mount(<App testMode={ true} />);
  //   renderer.createRenderer().render(<App testMode={false} />);
  //   // let tree = component.toJSON();
  //   // expect(tree).toBeEmptyDOMElement()
  //   // console.log(tree)
  // })
  // it("can access localStorage", () => {
  //   // expect(window).toBeDefined();
  // })
});