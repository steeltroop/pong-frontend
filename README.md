# PONG

**Pong**은 과거 2D Pixel 게임을 재현한 웹 게임입니다.

Player가 matcing이 이루어지면 game화면과 채팅 화면이 실행됩니다. 카메라 접근을 허용하면 화상연결이 가능합니다. 3점을 먼저 흭득학 유저가 승리하게 됩니다.

## Lets pong !

<br>

## Table Contents

- [Tech Stack](##Tech-Stack)
- [Project Timeline](##Project-imeline)
- [Issues to overcome](##Challenge-to-overcome)

<br>

## Project Timeline

### `1st week - planning`
- 아이디어 구상 + 기술 스택 검토
- [Moqups를 이용한 Mockup 작업](https://www.notion.so/mockup-412127cf77c2416b8d9d3e44139a5e67)
- GitHub Repository Setting(Client / Server 분리)

### `2nd week - devloping`
- Social Login & Firebase auth & JWT TOKEN 로그인
- User data Mongo DB 저장
- Socket.io를 통한 채팅 구현
- Web RTC를 이용한 화상 채팅 구현
- Ping pong game을 위한 로직 작성
- Socket.io, Web RTC, game 동기적 연결

### `3nd week - testing and deploying`
- Nest/enjyme 프론트, 백엔드 테스트 케이스 작성
- AWS 백엔드 배포
- Netilify 프론트엔드 배포

<br>

## Tech Stack

### Frontend

- React
- Redux
- Socket.io
- Web RTC
- Firebase AUTH

### Backend

- Node.js
- Express
- MongoDB / MongoDB Atlas for data persistence
- Mongoose
- JSON Web Tokne Authentication
- Socket.io

<br>

## Deploy

- **Frontend**
  - Netlify: application 배포

- **Backend**
  - AWS Elastic Beanstalk (EB)
  - AWS Code Pipeline for Deplyment automation

<br>

## Install

Local환경 실행시 아래와 같이 준비가 필요합니다.

client

<br>

## Team work && Work division

### How we worked ?

// 역활 분담은 어떻게 왜 나누고 진행되었는지, 진행해나가면서 마찰은 어떻게 극복해 나갔는지, 깃도 작성하면서 어떻게 계속 발전시켜 나갔는지. 단순히 잘하고 못하고 보다 우리가 이 과정을 통해서 어떻게 생각하고 성장해나갔는지를 서술해야 할것 같음.

### 김원모 팀원

#### Green flags

#### Red flags

### 임윤수 팀원

### Green flags

### Red flags

## Issues to overcome

**canvas**

**webRTC**

P2P절차, 방화벽과 NAT트래버셜, STURN / TURN 서버 등 처음 접하는 여러 개념들을 유기적으로 어떻게 연결하고 작동시켜야 하는지, peer들이 연결되기 위해 주고 받는 정보들의 흐름을 내가 원하는 시점에 어떻게 컨트롤 하는지 파악하는게 어려웠습니다. WebRTC 구현 중 simple-peer라는 라이브러리를 알게 되었고 ICE candidates , negotiation 과정을 설정해주기 때문에 훨씬 더 직관적이고 가독성이 강하다고 판단하여 simple-peer를 통해 P2P 통신을 구현하였습니다.

**socket.io**

게임, 채팅, webRTC를 이용하다보니 양방향 통신이 불가피했습니다. 그래서 socket을 사용하게 되었고 server와의 연동을 통해 이벤트를 주고 받을 수 있게 만들었습니다. on과 emit만 이용하면 socket을 자유자재로 이융하는데 문제가 없다고 생각했지만, 상대방과의 게임이 끝나고 매칭이 다시 일어나게 됬을 때 텍스트 메시지가 2번, 3번 중첩되어 발송되서 원인을 찾지 못했었는데 socket으로 구독한 이벤트를 컴포넌트가 언마운트 될 때 이벤트 구독을 취소 해줘야 한다는 사실을 알게 됬었습니다. 기술을 단순히 구현한다고만 해서 내가 이 기능을 제대로 이해하고 사용한다는 말은 아니구나 라고 생각이 들었었습니다. socket의 공식 문서에 나와있던 내용이고 똑같은 내용의 문서도 내가 겪은 경험에 따라 이해도나 보여지는게 확 달라지는구나, 단순히 한 두번 읽고 이해했다고 끝나는게 아니라 중첩되고 반복되서 이해하고 코드로 작성해보는 담글질의 과정이 필요하겠다고 생각했습니다.

**making sync in both user**

socket, webRTC, game 이 3가지가 한 컴포넌트 내에 동시에 진행하다 보니 정확히 동기적인 흐름을 잡아주고 가지 않으면 모든 로직들이 뒤섞여 엉망이 되었었습니다. 각자 하는 작업은 다르지만 서로가 서로의 로직에 영향을 미치기 때문에 게임 로직을 작성하면서도 채팅, webRTC를 고려하고 채팅, webRTC를 작성하면서도 게임 로직을 고려하면서 작업을 진행하였고 마지막에 세 작업물을 합쳤을 때 유기적으로 세 로직이 작동하게 수정해주는 부분이 가장 어려웠던 것 같습니다.

**Github work flow**

**Error casese**

**useRef**

카운트 다운 로직을 작성하던 중 setInterval을 통해 state의 값을 바꿔줘야하는 로직이 있었습니다. 값은 원하는 대로 줄어들지만 timerId가 컴포넌트가 리렌더링이 진행되면서 새로 생성 되서 clearInterval을 해주지 못하여 계속해서 숫자가 줄어드는 상황이 발생했었습니다. useState를 통해서 값을 저장하고 다시 설정을 해주어도 새로운 클로저가 형성되기 때문에 계속 초기화된 값을 기억하면서 어떻게 최초에 할당한 timerID를 유지시킬수 있을지 고민했었습니다. 리액트 공식 문서를 읽던 중 useRef.current를 통해 리렌더링을 일으키지 않고 할당한 값을 기억하게 할 수 있는 기능이 있다는걸 알게 되었습니다. useRef를 통해 timerID를 할당한 후 원하는 시점에 ref.current에 할당된 timerID로 clearInterval을 실행시켜주니 원하는 대로 작동되었습니다. 이 상황 외에도 리렌더링을 일으키지 않고 원하는 시점의 값을 state처럼 기억해주고 싶을 때 ref를 사용하였고 단순히 태그를 조작할때가 아닌 이런 방식을 위해서 ref가 존재한다는 걸 더 명확하게 이해할 수 있었습니다.
