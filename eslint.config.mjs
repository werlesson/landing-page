// Requires `nuxt prepare` (or `nuxt dev`) to generate .nuxt/eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Allow single-word component names (AppBrandLogo, etc.)
    'vue/multi-word-component-names': 'off',
    // Warn on explicit any, but don't block CI
    '@typescript-eslint/no-explicit-any': 'warn',
    // Enforce consistent Vue attribute ordering
    'vue/attributes-order': 'error',
    // Require v-bind shorthand
    'vue/v-bind-style': 'error',
    // Require v-on shorthand
    'vue/v-on-style': 'error',
  },
})
