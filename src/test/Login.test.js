import React from "react";
import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Login from "../components/login/Login";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({});

describe("<Login />", () => {
  it("should render h1 node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(wrapper.find("h1")).toHaveLength(1);
    expect(wrapper.find("h1").text()).toBe("PONG!");
  });

  it("should render img node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(wrapper.find("img")).toHaveLength(1);
    expect(wrapper.find("img").hasClass("icon")).toBe(true);
  });

  it("should render p node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(wrapper.find("p")).toHaveLength(1);
    expect(wrapper.find("p").hasClass("text")).toBe(true);
  });

  it("should render b node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(wrapper.find("b")).toHaveLength(1);
    expect(wrapper.find("b").text()).toBe("Sign in with google");
  });

  it("should have login text", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(wrapper.find("div")).toHaveLength(8);
    expect(wrapper.find("div").at(7).text()).toBe("please google login");
  });
});
