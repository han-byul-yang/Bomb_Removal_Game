# :pushpin: LandMine_Game

## 1. 실행 방법
- 다음을 순서대로 진행해주세요
<pre>
 # 1. 압축된 파일을 특정 폴더에 풀기
 
 # 2. 폴더로 이동하여 git bash 실행
 
 # 3. 다음 코드를 입력하여 파일 열기
 $ code .
 
 # 4. 터미널을 열어 dev dependencies를 설치
 $ npm install 또는 npm i
 
 # 5. 프로젝트 실행
 $ npm start

</pre>

## 2. 사용 기술 및 라이브러리
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

## 3. 주요 기능 구현
- [x] 첫 클릭 때 지뢰 터지지 않기
- [x] 타이머
- [x] 난이도 변경 기능
- [x] 오른쪽 클릭 깃발 기능

## 4. 기타 상세 구현 기능 사항
- 지뢰 터짐을 방지하고, 더 나은 게임 환경 제공을 위해 첫 클릭 시 주변 8개 타일에 bomb이 없도록 배치
- 주변 bomb이 없는 타일 클릭 시 주변 8개 타일에 bomb이 있을 때까지 타일 오픈하여 게임 환경 최적화
- bomb 클릭 시 모든 bomb 위치 사용자에게 보여주기
- 게임 우승 시 시간, 클릭 수 등 보여주는 모달 구현
- 게임 도중 레벨 설정으로 재게임 가능
- Custom 레벨 설정 시 빈 값이 있거나 bomb 개수가 타일 수를 넘는 경우, 숫자 값을 넣지 않은 경우 오류 모달
- useClickOutside Hook구현으로 모달 바깥 클릭 시 닫기