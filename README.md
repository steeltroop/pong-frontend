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

## Issues to overcome

**canvas**

**webRTC**

P2P절차, 방화벽과 NAT트래버셜, STURN / TURN 서버 등 처음 접하는 여러 개념들을 유기적으로 어떻게 연결하고 작동시켜야 하는지, peer들이 연결되기 위해 주고 받는 정보들의 흐름을 내가 원하는 시점에 어떻게 컨트롤 하는지 파악하는게 어려웠습니다. WebRTC 구현 중 simple-peer라는 라이브러리를 알게 되었고 ICE candidates , negotiation 과정을 설정해주기 때문에 훨씬 더 직관적이고 가독성이 강하다고 판단하여 simple-peer를 통해 P2P 통신을 구현하였습니다.

**socket.io**

**making sync in both user**

**Github work flow**

**Error casese**
