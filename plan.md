# SDM-UI 클론 코딩 풀스택 로드맵

## Context

현재 sdm-ui 프로젝트(Svelte + Vite, 약 16,500줄)를 처음부터 다시 만들면서
**3년차 주니어 풀스택 엔지니어** 수준의 기술 스택을 직접 경험하는 것이 목표.

- 프론트엔드(Svelte) + 백엔드(Node.js/Express) 모두 새로 구현
- 새 레포에서 시작 (기존 코드는 참고용)
- 퇴근 후 재택 작업 기준 → 주 10~15시간 예상
- Svelte는 이미 익숙한 상태

---

## 기술 스택 (목표)

| 영역 | 기술 |
|------|------|
| **프론트엔드** | Svelte 4, Vite, svelte-routing, Sveltestrap, Bootstrap 5 |
| **상태관리** | Svelte Store + localStorage |
| **HTTP** | Axios (인터셉터 패턴) |
| **실시간** | WebSocket (native), MQTT (paho-mqtt) |
| **시각화** | D3.js, SVG 좌표 시스템 |
| **폼 검증** | Yup + svelte-yup |
| **백엔드** | Node.js + Express |
| **인증** | JWT (jsonwebtoken) |
| **DB** | SQLite → PostgreSQL (단계적 전환) |
| **실시간 서버** | ws (WebSocket 서버) |
| **MQTT 브로커** | Mosquitto (Docker) |
| **코드 품질** | ESLint, Prettier |
| **API 문서** | Swagger (swagger-ui-express) |
| **컨테이너** | Docker, docker-compose (마지막 단계) |

---

## 전체 단계 요약

```
Phase 1  → 환경 구축 & Git 전략                   (1~2주)
Phase 2  → 백엔드: REST API + 인증                 (3~4주)
Phase 3  → 프론트엔드: 기반 구조                   (2주)
Phase 4  → 프론트엔드: CRUD 페이지 & 모달          (3주)
Phase 5  → 실시간 통신 (WebSocket + MQTT)          (2~3주)
Phase 6  → 데이터 시각화 (SVG + D3.js)            (2~3주)
Phase 7  → 고급 기능 (i18n, 알림, Excel)          (1~2주)
Phase 8  → 품질 & 배포 (Swagger, Docker)          (1~2주)
─────────────────────────────────────────────────
총 예상   약 15~20주  (퇴근 후 주 10~15시간 기준)
```

---

## Phase 1: 환경 구축 & Git 전략 (1~2주)

### 배우는 것
- 모노레포 구조 설계 (frontend / backend 분리)
- Git 브랜치 전략 (main, develop, feature/*)
- ESLint + Prettier 설정 (팀 프로젝트 기준)
- Vite alias, 환경변수(.env) 관리

### 할 일
1. 새 레포 생성 (`sdm-clone/`)
   ```
   sdm-clone/
   ├── frontend/   ← Svelte + Vite
   ├── backend/    ← Node.js + Express
   └── docker-compose.yml (Phase 8에서 완성)
   ```
2. frontend: `npm create vite@latest` → Svelte 선택
3. backend: `npm init` → Express 설치
4. ESLint + Prettier 각 폴더에 설정
5. `.gitignore`, `.env.example` 작성
6. README.md 초안 작성 (프로젝트 소개, 실행 방법)

### 핵심 개념
- `vite.config.js` path alias (`$src`, `$api`, `$lib`)
- `.env` vs `.env.local` 차이
- Git: feature branch → PR → merge 워크플로우

---

## Phase 2: 백엔드 REST API + 인증 (3~4주)

### 배우는 것
- Express 라우터 구조 설계
- JWT 인증 (로그인 → 토큰 발급 → 인터셉터 검증)
- SQLite로 시작해서 구조 잡은 뒤 PostgreSQL 전환
- CRUD API 패턴 (Controller → Service → Repository)
- 에러 핸들링 미들웨어
- CORS 설정

### 구현할 API 도메인
```
POST /api/auth/login
POST /api/auth/logout

GET/POST/PUT/DELETE /api/users
GET/POST/PUT/DELETE /api/centers
GET/POST/PUT/DELETE /api/bldgs
GET/POST/PUT/DELETE /api/floors
GET/POST/PUT/DELETE /api/spaces
GET/POST/PUT/DELETE /api/equips
GET/POST/PUT/DELETE /api/tags
GET                 /api/events
```

### 폴더 구조 (backend)
```
backend/
├── src/
│   ├── routes/       ← Express 라우터
│   ├── controllers/  ← 요청/응답 처리
│   ├── services/     ← 비즈니스 로직
│   ├── models/       ← DB 모델 (Sequelize or Knex)
│   ├── middleware/   ← auth, error, cors
│   └── app.js
├── .env
└── package.json
```

### 핵심 개념
- JWT: `sign()`, `verify()`, 만료시간, refresh token 기초
- 미들웨어 체인: `express.Router()` → auth check → controller
- ORM 없이 Raw SQL 먼저, 그다음 Sequelize 비교
- HTTP 상태 코드 관례 (200, 201, 400, 401, 403, 404, 500)

---

## Phase 3: 프론트엔드 기반 구조 (2주)

### 배우는 것
- Svelte Store 심화 (writable, derived, custom store)
- localStorage 동기화 패턴 (`persist_storage`)
- Axios 인스턴스 + 인터셉터 (토큰 자동 주입, 401 처리)
- svelte-routing: 라우트 정의, 파라미터, 인증 가드
- 레이아웃 컴포넌트 패턴

### 구현 목록
1. `store/index.js` — is_login, access_token, role, locID
2. `api/apiSvr.js` — Axios 인스턴스 + 요청/응답 인터셉터
3. `api/` 각 도메인 서비스 모듈 (12개)
4. `routes/index.js` — 라우트 배열 + `passAuthGuard()`
5. `Layouts/` — Header, Sidebar, Footer, VerticalLayout
6. 다크/라이트 테마 (Bootstrap `data-bs-theme`)
7. Login.svelte — JWT 로그인 플로우

### 참고 파일 (기존 프로젝트)
- `src/store/index.js`
- `src/api/apiSvr.js`
- `src/routes/index.js`
- `src/Layouts/VerticalLayout.svelte`

### 핵심 개념
- Svelte `$:` 반응형 구문 vs `$store` 자동 구독
- Axios 인터셉터에서 토큰 만료 처리 (401 → 로그아웃)
- 컴포넌트 이벤트 디스패치 (`createEventDispatcher`)

---

## Phase 4: 프론트엔드 CRUD 페이지 & 모달 (3주)

### 배우는 것
- 모달 컴포넌트 패턴 (열기/닫기 상태, 이벤트 통신)
- Yup 스키마 기반 폼 검증
- 테이블 + 페이지네이션 패턴
- SweetAlert2 Toast 알림
- 파일 업로드 (이미지)

### 구현 목록 (우선순위 순)
1. 공통 컴포넌트: `Modal.svelte`, `CDeleteModal.svelte`
2. `pref/UserMgmt.svelte` + `ModalUser.svelte`
3. `pref/CenterMgmt.svelte` + `ModalCenter.svelte`
4. `pref/BldgMgmt.svelte` + `ModalBldg.svelte`
5. `pref/FloorMgmt.svelte` + `ModalFloor.svelte`
6. `pref/SpaceMgmt.svelte` + `ModalSpace.svelte`
7. `pref/EquipMgmt.svelte` + `ModalEquip.svelte`
8. `pref/TagMgmt.svelte` + `ModalTag.svelte`

### 핵심 패턴
```svelte
<!-- 모달 통신 패턴 -->
<ModalUser on:refresh={loadUsers} bind:open={modalOpen} />
```
- 부모: `bind:open`으로 열기 제어
- 자식: `dispatch('refresh')`로 목록 갱신 요청

---

## Phase 5: 실시간 통신 WebSocket + MQTT (2~3주)

### 배우는 것
- **WebSocket 서버** (Node.js `ws` 라이브러리)
  - 연결 관리, 토큰 인증, 브로드캐스트
- **WebSocket 클라이언트** (Svelte, 자동 재연결)
  - 메시지 타입별 핸들러 등록 패턴
- **MQTT** 개념 이해
  - 토픽 구조, QoS, 브로커(Mosquitto)
  - 백엔드에서 MQTT 구독 → WebSocket으로 프론트에 전달
- **paho-mqtt** 클라이언트 (프론트엔드)

### 구현 목록
1. 백엔드: `ws` WebSocket 서버 설정
2. 백엔드: JWT 기반 WebSocket 핸드셰이크 인증
3. 백엔드: MQTT 브로커 연결 + 이벤트 처리
4. 프론트엔드: `lib/websocket.js` 재구현
5. 프론트엔드: `lib/mqtt.js` 재구현 (paho-mqtt)
6. 프론트엔드: `lib/mqtt_auto_reconn.js`
7. `routes/EventLog.svelte` — 실시간 이벤트 목록

### 핵심 개념
- WebSocket 생명주기: `onopen`, `onmessage`, `onclose`, `onerror`
- MQTT vs WebSocket 역할 분리
  - MQTT: 센서 데이터 스트림
  - WebSocket: 시스템 이벤트/알림
- 자동 재연결: exponential backoff 패턴

---

## Phase 6: 데이터 시각화 SVG + D3.js (2~3주)

### 배우는 것
- SVG 기초: `polygon`, `rect`, `text`, `image` 태그
- 좌표 계산: `baseWidth/baseHeight` → 실제 이미지 비율 변환
- D3.js: scale, path, shape 기초
- 인터랙티브 SVG: 클릭, 호버 이벤트
- 이미지 로드 후 좌표 재계산 패턴

### 구현 목록
1. `Dashboard.svelte` — 건물 개요 (SVG 오버레이)
2. `Bldg.svelte` — 층별 도면 (SVG 폴리곤)
3. `Floor.svelte` — 공간 배치도
4. `Space.svelte` — 공간 상세 + 센서 데이터
5. `Components/shape/DoctObj.svelte` (D3.js 덕트 도형)
6. `Components/shape/SectionObj.svelte` (D3.js 섹션)

### 핵심 개념
```javascript
// 좌표 변환 패턴
const scaleX = imgElement.clientWidth / baseWidth;
const scaleY = imgElement.clientHeight / baseHeight;
const scaledX = coord.x * scaleX;
const scaledY = coord.y * scaleY;
```
- SVG `viewBox` vs 절대 좌표 차이
- `onload` 이후에만 좌표 계산 (이미지 치수 확정 후)

---

## Phase 7: 고급 기능 (1~2주)

### 구현 목록
1. **국제화 (i18n)**: svelte-i18n 설정, 언어 파일, `$_()` 사용
2. **RightSidebar**: 테마, 언어, 알림 통합 패널
3. **알림 시스템**: WebSocket 알림 수신 → 뱃지 표시
4. **Excel 내보내기**: ExcelJS로 테이블 데이터 다운로드
5. **역할 기반 UI**: role에 따라 메뉴/버튼 숨기기

---

## Phase 8: 품질 & 배포 (1~2주)

### 배우는 것
- Swagger/OpenAPI 3.0 문서 작성
- Docker 기초: `Dockerfile`, `docker-compose.yml`
- 환경 분리: development / production
- Vite 빌드 최적화 (code splitting, lazy loading)
- PM2로 Node.js 프로세스 관리

### 구현 목록
1. 백엔드: Swagger 문서 (`/api-docs` 엔드포인트)
2. 백엔드: `Dockerfile`
3. 프론트엔드: `Dockerfile` + nginx 설정
4. `docker-compose.yml`: frontend + backend + PostgreSQL + Mosquitto
5. `.env.production` 설정

---

## 학습 체크리스트 (3년차 기준)

### 프론트엔드
- [ ] 컴포넌트 설계 (재사용, props, event dispatch)
- [ ] 상태관리 (Store, 반응형, 구독/해제)
- [ ] HTTP 클라이언트 인터셉터 패턴
- [ ] 라우팅 + 인증 가드
- [ ] 폼 검증 (Yup 스키마)
- [ ] 실시간 UI 업데이트 (WebSocket)
- [ ] SVG 기반 인터랙티브 시각화
- [ ] 빌드 도구 설정 (Vite alias, proxy)

### 백엔드
- [ ] REST API 설계 (HTTP 메서드, 상태코드)
- [ ] JWT 인증/인가 구현
- [ ] 미들웨어 체인 설계
- [ ] 데이터베이스 CRUD (Raw SQL + ORM)
- [ ] WebSocket 서버 구현
- [ ] MQTT 브로커 연동
- [ ] 에러 핸들링 통일
- [ ] API 문서화 (Swagger)

### DevOps/공통
- [ ] Git 브랜치 전략 실천
- [ ] 환경 변수 관리 (.env 분리)
- [ ] Docker + docker-compose
- [ ] README 작성 습관

---

## 진행 방식 (멀티 모델 협업)

### 핵심 원칙
> Claude, Gemini, GPT Codex 등 어떤 모델로 세션을 열어도
> 동일한 컨텍스트에서 이어서 작업할 수 있어야 한다.

### 새 레포에 만들 AI 공통 컨텍스트 파일

```
sdm-clone/
├── AI_CONTEXT.md      ← 모든 AI 모델이 읽는 공통 가이드
├── PROGRESS.md        ← 현재 진행 상태 (Phase, 완료 항목)
├── CONVENTIONS.md     ← 코딩 컨벤션 (네이밍, 구조, 패턴)
├── CLAUDE.md          ← Claude Code 전용 설정
└── .cursor/           ← Cursor (GPT) 전용 설정 (선택)
```

**AI_CONTEXT.md 내용 구조**
```markdown
# 프로젝트 목적
# 기술 스택
# 현재 Phase (PROGRESS.md 참조)
# 핵심 아키텍처 결정사항
# 하면 안 되는 것 (금지 패턴)
# 코드 작성 규칙 요약
```

**PROGRESS.md 내용 구조**
```markdown
# 진행 현황
## 현재 Phase: X
## 완료된 항목
- [x] ...
## 진행 중
- [ ] ...
## 다음 할 일
- ...
## 미결 결정사항 (AI에게 물어볼 것)
- ...
```

### 세션 시작 프로토콜 (어떤 모델이든 동일)

새 AI 세션을 열 때마다 이 두 파일을 붙여넣거나 읽게 한다:
1. `AI_CONTEXT.md` — 프로젝트 전체 맥락
2. `PROGRESS.md` — 지금 어디까지 왔는지

예시 프롬프트:
```
[AI_CONTEXT.md 내용]
[PROGRESS.md 내용]

위 내용을 바탕으로 현재 Phase의 다음 작업을 도와줘.
```

### 서브에이전트 활용 전략 (Claude Code 기준)

| 서브에이전트 타입 | 언제 쓰는가 |
|----------------|------------|
| **Explore** | 기존 코드 패턴 파악, 참고할 파일 탐색 |
| **Plan** | Phase 전환 시 상세 구현 설계 |
| **general-purpose** | 복잡한 멀티스텝 구현 작업 |

Claude 외 모델 사용 시:
- **Gemini**: 시각화 코드, SVG/D3 수학 계산 설명
- **GPT Codex/o1**: 복잡한 알고리즘, WebSocket 프로토콜 설계
- **Claude**: 전체 흐름 설계, 코드 리뷰, 교육적 설명

### 모델 전환 시 일관성 체크리스트

```
[ ] PROGRESS.md 최신 상태로 업데이트
[ ] 마지막으로 작성한 파일 목록 기록
[ ] 미결 결정사항 PROGRESS.md에 메모
[ ] 코딩 컨벤션 변경사항 CONVENTIONS.md 반영
```

### 일반 작업 흐름

1. 세션 시작 → AI_CONTEXT.md + PROGRESS.md 제공
2. AI가 현재 Phase 파악 → 다음 작업 제안
3. 코드 직접 작성 (클론 코딩)
4. 막히면 질문 → 설명 + 힌트
5. Phase 완료 → PROGRESS.md 업데이트 → 다음 Phase

---

## 참고 파일 경로 (기존 프로젝트)

| 참고 목적 | 파일 경로 |
|-----------|-----------|
| Store 패턴 | `src/store/index.js` |
| API 인스턴스 | `src/api/apiSvr.js` |
| WebSocket | `src/lib/websocket.js` |
| MQTT | `src/lib/mqtt.js` |
| 라우팅 | `src/routes/index.js` |
| 좌표 시각화 | `src/routes/Dashboard.svelte` |
| D3 도형 | `src/Components/shape/DoctObj.svelte` |
| 유틸 | `src/util/common.js` |
