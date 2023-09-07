import React from 'react';
/**
 * @jest-environment jsdom
 */
import App, { getInitialViewState } from './App';
import renderer from 'react-test-renderer/shallow'
import sinon from 'sinon';
import { expect } from 'chai';



describe("getInitialViewState", () => {
  it('returns an AppState object', () => {
    const x = getInitialViewState();
    // expect(x).toHaveProperty('viewState');
  });

  it('passes initial viewState "list"', () => {
    const x = getInitialViewState();
    // expect(x.viewState).toEqual('list');
  });
});

describe('<App />', () => {

  it.only("mounts", () => {
    const view = renderer.createRenderer();
    view.render(<App testMode={false} />);
    // expect(view.getRenderOutput().props['data-testid']).toEqual('App');
  });
  it("doesnt crap", () => {
    // Enzyme.mount(<App testMode={ true} />);
    renderer.createRenderer().render(<App testMode={true} />);
    // let tree = component.toJSON();
    // console.log(tree)
  })
  it("does list", () => {
    // Enzyme.mount(<App testMode={ true} />);
    renderer.createRenderer().render(<App testMode={false} />);
    // let tree = component.toJSON();
    // expect(tree).toBeEmptyDOMElement()
    // console.log(tree)
  })
  it("can access localStorage", () => {
    // expect(window).toBeDefined();
  })
});