import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. 기본 자바스크립트 권장 설정
  js.configs.recommended,

  // 2. Prettier와 충돌 방지 (항상 마지막에 가까이)
  prettier,

  // 3. 환경 설정 (Node.js 전역 변수 허용)
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs
      },
      ecmaVersion: 'latest',
      sourceType: 'commonjs'
    }
  },

  // 4. 검사 제외 대상 (기존 .eslintignore 역할)
  {
    ignores: ['node_modules/', 'dist/']
  },

  // 7. 사용자 정의 규칙
  {
    rules: {
      'no-unused-vars': 'warn'
    }
  }
];
