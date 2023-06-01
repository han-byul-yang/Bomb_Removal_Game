# :pushpin: LandMine_Game

## 1. 배포 사이트
https://landminegame.netlify.app

## 2. 제작 기간 & 참여 인원
- 2023.3.6 - 2023.3.8 (+리팩토링)
- 개인 프로젝트

## 3. 사용 기술 및 라이브러리
- react v18
- typescript
- **라우팅**
  - react-router-dom v6
- **스타일**
   - scss
   - css module
- **상태 관리**
   - react-redux(@reduxjs/toolkit)
- **코딩 컨벤션**
   - eslint
   - prettier
   - stylelint

## 4. `사용성을 고려`한 주요 기능 구현
### 4.1. 첫 클릭 때 지뢰 터지지 않기
![ezgif com-video-to-gif (5)](https://github.com/han-byul-yang/Removal_Game/assets/67466789/a3133dcf-ee6b-4086-9af5-5cf094f6263c)

### 4.2. 타일 클릭 시 주변 8개 타일에 bomb이 있을 때까지 타일 모두 열기
![ezgif com-gif-maker (18)](https://github.com/han-byul-yang/Removal_Game/assets/67466789/8f547644-7a52-48ef-b56a-3ed0b1cfebc8)

### 4.3. 기타 상세 구현 기능 사항
- 타이머
- 난이도 변경 기능
- 게임 도중 레벨 설정으로 재게임 가능
- 오른쪽 클릭 깃발 기능
- bomb 클릭 시 모든 bomb 위치 사용자에게 보여주기
- 게임 우승 시 시간, 클릭 수 등 모달
- Custom 레벨 설정 시 빈 값이 있거나 bomb 개수가 타일 수를 넘는 경우, 숫자 값을 넣지 않은 경우 오류 모달

## 5. 구현하면서 고민했던 점
### 5.1. useReducer 사용 여부에 대한 고민 :round_pushpin:[코드 보기](https://github.com/han-byul-yang/Removal_Game/blob/805f69c13e2a8e2c84febd3b0e83a6f90323a41c/src/components/Modal/LevelCustomModal/index.tsx#L22) [참고 자료](https://www.zigae.com/state-vs-reducer/)
Column과 row, bomb 개수를 설정할 때 useReducer 사용에 대한 고민을 하였다. 하지만 useReducer는 reducer를 따로 작성해줄 때 boilerplate 가 발생하기 때문에 state 로직 자체가 복잡하지 않거나, prevState를 이용해 state를 조작하지 않는 경우 굳이 사용해줄 필요가 없다고 판단하였다. 따라서 state를 useState로 각기 따로 관리해주었다. 

### 5.2. 배열 리터럴([]) vs 생성자 객체(new Array) :round_pushpin:[코드 보기](https://github.com/han-byul-yang/Removal_Game/blob/805f69c13e2a8e2c84febd3b0e83a6f90323a41c/src/utils/makeGameBoard.ts#L6)
새로운 보드를 구현할 때 new Array를 활용할지 []를 활용할지에 대한 고민이 있었다. 요소의 양이 늘어날 수록 리터럴 방식에 비해 new Array의 시간 비용이 더 늘어난다고 알고 있었지만, 내 로직에서는 console.time과 console.timeEnd로 테스트 해봤을 때 큰 차이가 없었다. 이에 새로운 보드를 생성하면서 요소의 length를 간단하게 부여하고 채워주고자 new Array를 사용하였다. 

### 5.3. 속도 vs 코드 직관성
주변 8개의 타일에 bomb을 배치시키지 않기 위한 주변 타일 검사 과정이 있었다. 이를 위해 고차 함수 some을 이용한 방법과 if문을 사용하는 방법을 비교하였다. 결과적으로 some 고차 함수를 이용한 코드 직관성이 훨씬 좋았지만, if 를 이용하여 일일히 비교하는 과정이 더 빨랐다. 게임 환경 사용성을 높이기 위해 코드 직관성 보단 속도를 선택하여 if 문을 사용해주었다.
