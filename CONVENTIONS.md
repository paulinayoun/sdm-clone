---

## 3. CONVENTIONS.md (코딩 컨벤션)

### 목적
- 일관된 코드 스타일 유지
- AI가 코드 생성 시 참고할 규칙
- 코드 리뷰 기준

### 구조

```markdown
# SDM-Clone 코딩 컨벤션

> AI 모델이 코드를 생성할 때 반드시 따라야 할 규칙입니다.

---

## 공통 규칙

### 네이밍

**파일명**:
- 컴포넌트: `PascalCase.svelte` (예: `ModalUser.svelte`)
- 유틸리티/서비스: `kebab-case.js` (예: `user-api.js`)
- 설정 파일: `kebab-case.config.js` (예: `vite.config.js`)

**변수명**:
- 일반 변수: `camelCase` (예: `userData`, `isLogin`)
- 상수: `UPPER_SNAKE_CASE` (예: `API_BASE_URL`)
- 컴포넌트: `PascalCase` (예: `UserModal`)

**함수명**:
- 동사로 시작: `get`, `set`, `fetch`, `handle`, `on` 등
- 예: `getUserList()`, `handleSubmit()`, `onModalOpen()`

**Svelte Store**:
- `snake_case` 사용 (기존 프로젝트 패턴 유지)
- 예: `is_login`, `access_token`, `login_userID`

### 들여쓰기
- **탭 사용** (기존 프로젝트와 동일)
- 탭 크기: 3칸 (에디터 설정)

### 주석
- **한국어** 사용 (팀 내부 프로젝트)
- JSDoc 스타일 권장 (함수 설명 시)

```javascript
/**
 * 사용자 목록 조회
 * @param {Object} filter - 필터 조건
 * @returns {Promise<Array>} 사용자 배열
 */
function getUserList(filter) { ... }
```

---

## 프론트엔드 (Svelte)

### 컴포넌트 구조 순서

```svelte
<script>
   // 1. import 구문
   import { onMount } from 'svelte';
   import UserService from '$api/user-api';

   // 2. props (export let)
   export let userId;
   export let open = false;

   // 3. 상태 변수
   let userData = {};
   let loading = false;

   // 4. 반응형 구문 ($:)
   $: fullName = `${userData.firstName} ${userData.lastName}`;

   // 5. 함수 정의
   function handleSubmit() { ... }

   // 6. 생명주기
   onMount(() => { ... });
</script>

<!-- 7. HTML 템플릿 -->
<div>...</div>

<!-- 8. CSS -->
<style>
   ...
</style>
```

### 이벤트 핸들러 네이밍
- `handle{Event}` 패턴
- 예: `handleClick`, `handleSubmit`, `handleChange`

### Store 사용
```javascript
// 올바른 사용
import { is_login } from '$src/store';

$: if ($is_login) {
   // 자동 구독
}
```

### 조건부 렌더링
```svelte
<!-- if/else 블록 사용 -->
{#if loading}
   <p>로딩 중...</p>
{:else if error}
   <p>오류: {error}</p>
{:else}
   <UserList data={users} />
{/if}
```

---

## 백엔드 (Node.js + Express)

### 폴더별 역할

**routes**: 라우트 정의만
```javascript
// routes/users.js
router.get('/users', authMiddleware, userController.getUsers);
```

**controllers**: 요청/응답 처리
```javascript
// controllers/userController.js
exports.getUsers = async (req, res, next) => {
   try {
      const users = await userService.getUsers(req.query);
      res.json({ code: 200, data: users });
   } catch (error) {
      next(error);
   }
};
```

**services**: 비즈니스 로직
```javascript
// services/userService.js
exports.getUsers = async (filter) => {
   return await userModel.findAll(filter);
};
```

**models**: DB 쿼리
```javascript
// models/userModel.js
exports.findAll = async (filter) => {
   // SQL 쿼리 실행
};
```

### 에러 처리
```javascript
// 비동기 함수는 항상 try-catch
try {
   const result = await someAsyncFunction();
} catch (error) {
   // 에러를 next()로 전달
   next(error);
}
```

### API 응답 형식 (통일)
```javascript
// 성공
res.json({
   code: 200,
   data: { ... }
});

// 실패
res.status(400).json({
   code: 400,
   message: '오류 메시지'
});
```

### 환경 변수 사용
```javascript
// 절대 하드코딩 금지
const PORT = process.env.PORT || 5001;
const DB_PATH = process.env.DB_PATH || './data/sdm.db';
```

---

## Git 커밋 메시지

### 형식
```
<type>(<scope>): <subject>

<body>
```

### Type
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드, 설정 변경

### 예시
```
feat(frontend): 사용자 목록 페이지 추가

- UserMgmt.svelte 컴포넌트 생성
- user-api.js 서비스 추가
- 라우트 /pref/users 등록
```

---

## API 설계 규칙

### 엔드포인트 네이밍
- 복수형 사용: `/api/users`, `/api/buildings`
- RESTful 패턴:
  - GET `/api/users` - 목록 조회
  - GET `/api/users/:id` - 단일 조회
  - POST `/api/users` - 생성
  - PUT `/api/users/:id` - 수정
  - DELETE `/api/users/:id` - 삭제

### 요청 바디 (POST/PUT)
```json
{
  "userID": "admin",
  "userName": "관리자",
  "role": 0
}
```
- camelCase 사용
- 불필요한 중첩 피하기

### 응답 바디
```json
{
  "code": 200,
  "data": {
    "userID": "admin",
    "userName": "관리자"
  }
}
```

---

## 보안 규칙

### 절대 금지
1. 비밀번호 평문 저장
2. SQL 쿼리에 사용자 입력 직접 삽입
3. CORS `*` 허용 (개발 환경만 임시 허용)
4. `.env` 파일 커밋
5. 하드코딩된 API 키/토큰

### 권장
- bcrypt로 비밀번호 해싱 (saltRounds: 10)
- Prepared statement 사용
- JWT 만료 시간 설정 (1시간)
- 입력 값 검증 (Yup 스키마)

---

## 코드 리뷰 체크리스트

코드 생성 후 AI가 자체 점검할 항목:

- [ ] 네이밍 규칙 준수
- [ ] 에러 핸들링 포함
- [ ] 환경 변수 사용 (.env)
- [ ] 주석 작성 (복잡한 로직)
- [ ] 불필요한 console.log 제거
- [ ] import 경로 alias 사용 (`$api`, `$src` 등)
- [ ] ESLint 오류 없음
- [ ] 기존 패턴과 일관성 유지

---

**마지막 업데이트**: 2026-04-16
```
