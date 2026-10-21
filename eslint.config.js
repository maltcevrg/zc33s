// ESLint (flat config). Проверяем React-код и служебные скрипты.
// Стили и контент сюда не входят: SCSS собирает Vite, тексты — данные, а не код.
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      'docs/**',
      'WordTextForFAQ/**',
      'src/styles/**',
      'src/assets/**',
      'src/data/catalog-full.txt',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // React 18 c автоматическим JSX-рантаймом: импорт React не обязателен,
      // но переменные, использованные только в JSX, должны считаться используемыми.
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/no-unknown-property': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/self-closing-comp': 'warn',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',

      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^React$', caughtErrors: 'none' },
      ],
      // Пустой catch — осознанный приём для localStorage/navigator, которые могут
      // быть недоступны (приватный режим, SSR). Молча игнорируем сбой.
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Тексты статей и FAQ — длинные шаблонные строки, в них намеренно стоят
      // неразрывные и тонкие пробелы для типографики.
      'no-irregular-whitespace': ['error', { skipTemplates: true }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'smart'],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // Скрипты и конфиги выполняются в Node, браузерные глобалы там не нужны,
  // но не мешают; отдельно разрешаем console.
  {
    files: ['scripts/**/*.mjs', '*.config.js', 'tests/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },

  prettier,
];
