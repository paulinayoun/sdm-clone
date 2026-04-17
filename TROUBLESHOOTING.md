---

## 5. 추가 권장 문서 (선택 사항)

### 5.1. TROUBLESHOOTING.md
프로젝트 진행 중 자주 발생하는 문제와 해결 방법

```markdown
# 문제 해결 가이드

## Phase 1: 환경 구축

**문제**: Vite dev server가 5173 포트 이미 사용 중
**해결**: `vite.config.js`에서 포트 변경
```javascript
export default {
   server: { port: 5174 }
}
```

## Phase 2: 백엔드 API

**문제**: CORS 오류 발생
**해결**: Express에 CORS 미들웨어 추가
```javascript
app.use(cors({
   origin: 'http://localhost:5173'
}));
```

(문제 발생할 때마다 추가)
```

### 5.2. REFERENCES.md
외부 참고 자료 링크 모음

```markdown
# 참고 자료

## 공식 문서
- [Svelte 공식 문서](https://svelte.dev/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Express 공식 문서](https://expressjs.com/)

## 튜토리얼
- [JWT 인증 구현 가이드](https://...)
- [WebSocket 실전 활용](https://...)

## 원본 프로젝트 특이사항
- `persist_storage` 커스텀 Store 래퍼 구현
- MQTT 자동 재연결 로직 (`mqtt_auto_reconn.js`)
```
