import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. 기본 자바스크립트 권장 설정
  js.configs.recommended,

  // 2. Svelte 권장 설정
  ...svelte.configs['flat/recommended'],

  // 3. Prettier와 충돌 방지 (항상 마지막에 가까이)
  prettier,

  // 4. 전역 변수 및 파서 설정
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  },

  // 5. Svelte 파일 전용 설정
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        extraFileExtensions: ['.svelte']
      }
    }
  },

  // 6. 무시할 폴더 (기존 .eslintignore 역할)
  {
    ignores: ['dist/', 'node_modules/', '.vscode/', '.svelte-kit/']
  },

  // 7. 사용자 정의 규칙
  {
    rules: {
      'no-unused-vars': 'warn'
    }
  }
];
