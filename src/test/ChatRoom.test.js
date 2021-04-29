import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ChatRoom from "../components/chatRoom/ChatRoom";

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

describe("<Chatroom />", () => {
  test("should render button with text", () => {
    window.HTMLElement.prototype.scrollIntoView = () => {};

    render(
      <Provider store={store}>
        <ChatRoom />
      </Provider>
    );

    expect(screen.getByText("send")).toBeInTheDocument();
  });

  test("should have 1 button, 1 input, 1 ul", () => {
    window.HTMLElement.prototype.scrollIntoView = () => {};

    render(
      <Provider store={store}>
        <ChatRoom />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
