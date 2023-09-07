import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @jest-environment jsdom
 */
import App, { getInitialViewState } from './App';
import renderer from 'react-test-renderer/shallow';
describe("getInitialViewState", function () {
    it('returns an AppState object', function () {
        var x = getInitialViewState();
        // expect(x).toHaveProperty('viewState');
    });
    it('passes initial viewState "list"', function () {
        var x = getInitialViewState();
        // expect(x.viewState).toEqual('list');
    });
});
describe('<App />', function () {
    it.only("mounts", function () {
        var view = renderer.createRenderer();
        view.render(_jsx(App, { testMode: false }));
        // expect(view.getRenderOutput().props['data-testid']).toEqual('App');
    });
    it("doesnt crap", function () {
        // Enzyme.mount(<App testMode={ true} />);
        renderer.createRenderer().render(_jsx(App, { testMode: true }));
        // let tree = component.toJSON();
        // console.log(tree)
    });
    it("does list", function () {
        // Enzyme.mount(<App testMode={ true} />);
        renderer.createRenderer().render(_jsx(App, { testMode: false }));
        // let tree = component.toJSON();
        // expect(tree).toBeEmptyDOMElement()
        // console.log(tree)
    });
    it("can access localStorage", function () {
        // expect(window).toBeDefined();
    });
});
//# sourceMappingURL=App.test.js.map