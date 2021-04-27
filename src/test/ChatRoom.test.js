import React from "react";
import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ChatRoom from "../components/chatRoom/ChatRoom";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  roomMatch: {
    isMatched: false,
    partner: {
      socketId: "",
      name: ""
    },
    chats: [],
    webcam: {
      isCalling: false,
      isCallAccepted: false,
      callerSignal: null
    },
    gameBoard: {
      isModerator: false,
    }
  },
  user: {
    email: "",
    name: "",
    socketId: ""
  }
});

describe("<ChatRoom />", () => {
  it("should render div node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ChatRoom />
      </Provider>
    );
  });
});
