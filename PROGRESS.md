---

## 2. PROGRESS.md (진행 현황 추적)

### 목적
- **어디까지 왔는지** 명확히 기록
- AI 세션 시작 시 즉시 파악 가능
- 완료/진행/대기 상태 구분

### 구조

```markdown
# SDM-Clone 프로젝트 진행 현황

**마지막 업데이트**: 2026-04-16 (작업할 때마다 날짜 갱신)

---

## 현재 Phase: Phase 1 - 환경 구축 & Git 전략

**예상 기간**: 1~2주
**실제 소요**: (진행 중)

---

## 완료된 항목 ✅

### Phase 0: 준비
- [x] 기존 sdm-ui 프로젝트 분석 완료
- [x] 전체 로드맵 작성 (sharded-bubbling-mountain.md)
- [x] AI 협업 문서 구조 설계

### Phase 1: 환경 구축 & Git 전략
- [x] 새 레포 생성 (`sdm-clone/`)
- [x] 모노레포 폴더 구조 설정
- [x] frontend: Vite + Svelte 프로젝트 초기화 (Svelte 4 + Tailwind + shadcn-svelte)
- [x] backend: Express 프로젝트 초기화
- [ ] ESLint + Prettier 설정 (frontend)
- [ ] ESLint + Prettier 설정 (backend)
- [x] `.gitignore` 작성
- [ ] `.env.example` 작성
- [ ] README.md 초안 작성
- [x] AI_CONTEXT.md 작성
- [x] PROGRESS.md 작성 (이 파일)
- [x] CONVENTIONS.md 작성

---

## 진행 중 🔄

**현재 작업**: Phase 1 나머지 환경 설정 및 첫 커밋 준비

**작업 세부사항**:
- ESLint + Prettier 설정 (코드 품질 관리)
- .env.example 작성 (환경 변수 가이드)
- Vite path alias 설정 확인 ($lib, $src, $api)
- 첫 커밋 + develop 브랜치 생성

---

## 다음 할 일 📋

### Phase 1 나머지 작업
1. GitHub에 새 레포 생성 및 원격 연결
2. .env.example 작성
3. 첫 커밋 + develop 브랜치 생성

### Phase 2: 백엔드 REST API 기초
- Express 기본 구조 설계 (라우팅 체계 확립)
- MariaDB 연결 테스트 (mysql2)
- JWT 로그인 API 기본 구현

### Phase 2 준비
- Express 기본 구조 설계 검토
- SQLite vs PostgreSQL 초기 선택 결정
- JWT 라이브러리 선택 (jsonwebtoken vs jose)

---

## 학습 체크리스트 (Phase별 완료 기록)

### Phase 1: 환경 구축
- [ ] Vite 설정 파일 이해
- [ ] ESLint + Prettier 통합 설정
- [ ] Git 브랜치 전략 실천

### Phase 2: 백엔드 REST API
- [ ] Express 라우터 설계
- [ ] JWT 인증 구현
- [ ] 미들웨어 체인 패턴
- [ ] SQLite CRUD 구현

(이하 Phase별로 체크리스트 추가)

---

## 미결 결정사항 (AI에게 물어볼 것) ❓

### 현재 결정 필요한 사항
1. **DB 선택**: SQLite로 시작할지 바로 PostgreSQL?
   - 장점(SQLite): 빠른 프로토타이핑, 설정 간단
   - 장점(PostgreSQL): 실무 환경과 동일, 마이그레이션 학습
   - **결정**: (아직 미결정)

2. **모노레포 도구**: 그냥 폴더 분리 vs Turborepo/Nx?
   - 장점(폴더 분리): 간단, 학습 곡선 낮음
   - 장점(Turborepo): 빌드 캐싱, 의존성 관리
   - **결정**: (아직 미결정)

3. **CLAUDE.md 필요 여부**: AI_CONTEXT.md로 충분한가?
   - Claude Code는 프로젝트별 CLAUDE.md를 자동 인식
   - 하지만 AI_CONTEXT.md와 중복될 수 있음
   - **결정**: (검토 필요)

---

## 주간 목표 (이번 주)

**2026년 4월 14일 ~ 4월 20일**

- [ ] AI 협업 문서 3종 완성 (AI_CONTEXT, PROGRESS, CONVENTIONS)
- [ ] 새 레포 생성 + 초기 구조 설정
- [ ] frontend, backend 초기화 완료
- [ ] 첫 커밋 완료

---

## 학습 노트 (막혔던 부분 / 해결 방법)

### 2026-04-16: AI 문서 구조 설계
- **문제**: 여러 AI 모델에서 일관된 컨텍스트 유지 방법?
- **해결**: AI_CONTEXT.md를 단일 진실 공급원으로 설계
- **배운 점**: 문서 간 역할 분리 중요 (컨텍스트 vs 진행상황 vs 규칙)

---

**다음 업데이트 예정**: Phase 1 첫 작업 완료 후
```