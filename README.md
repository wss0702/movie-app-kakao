# 넷플릭스 클론코딩

이 프로젝트는 영화 검색 및 관리 애플리케이션입니다. 사용자는 다양한 영화를 검색하고, 찜 목록에 추가하며, 로그인 및 회원가입 기능을 통해 개인화된 경험을 제공합니다.

## 기술 스택

- **프론트엔드**: React, React Router, React Hook Form, Jotai, React Query
- **백엔드**: Node.js, Express (API 호출)
- **데이터베이스**: LocalStorage (사용자 인증 정보 저장)
- **스타일링**: CSS, CSS Modules
- **기타**: Axios (API 요청), React Toastify (알림)

## 커밋 규칙

- 각 커밋은 논리적 단위로 분할합니다.
- 커밋 메시지는 다음과 같은 형식을 따릅니다:
  - `feature: 새로운 기능 추가`
  - `fix: 버그 수정`
  - `docs: 문서 수정`
  - `수정: 코드 스타일 수정 (포맷팅, 세미콜론 누락 등)`
  - `test: 테스트 추가 또는 수정`

## 설치 및 실행 가이드

1. **레포지토리 클론하기**
   ```bash
   git clone https://github.com/wss0702/movie-app.git
   cd movie-app
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```
   
3. **Local실행**
   ```bash
   npm run dev
   ```

## 프로젝트 구조

```
movie-app/
├── src/                    # 소스 코드
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── layout/         # 레이아웃 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   └── styles/         # 스타일 파일
│   ├── App.jsx             # 메인 앱 컴포넌트
│   ├── index.jsx           # 진입점
│   └── client.js           # API 요청 설정
├── public/                 # 정적 파일
├── .env                    # 환경 변수 파일
├── package.json            # 의존성 및 스크립트
└── README.md               # 이 문서
```

## 기여 방법

기여를 원하시는 분은 다음 단계를 따라주세요:

1. 이 레포지토리를 포크합니다.
2. 새로운 브랜치를 생성합니다.
   ```bash
   git checkout -b feature/your-feature
   ```
3. 변경 사항을 커밋합니다.
   ```bash
   git commit -m "feature: 새로운 기능 추가"
   ```
4. 브랜치를 푸시합니다.
   ```bash
   git push origin feature/your-feature
   ```
5. Pull Request를 생성합니다.

## 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE)를 따릅니다.