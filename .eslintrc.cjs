// .eslintrc.js
module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["plugin:vue/vue3-recommended", "plugin:vue/vue3-essential"],
  plugins: ["vue", "unused-imports"],
  rules: {
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",: 'off',
    "unused-imports/no-unused-imports": "error", //自动删除引入但没使用的包
    "unused-imports/no-unused-vars": ["error", { args: "none" }], //函数参数允许不使用
    "vue/multi-word-component-names": "off", // 关闭名称校验
    "vue/valid-v-for": "off", //在vue3中允许v-for不加key
    "vue/attribute-hyphenation": "off", //驼峰命名方式定义事件
    "@typescript-eslint/no-explicit-any": "off", //ts允许any类型
    "vue/no-useless-v-bind": "off",
    "vue/no-useless-mustaches": "off",
    "vue/no-unused-components": "off",
    "vue/html-self-closing": "off",
    "vue/singleline-html-element-content-newline": "off",
    camelcase: [
      "off",
      {
        properties: "always",
      },
    ], //强制驼峰法命名 - 关闭
    "@typescript-eslist/camelcase": "off",
    "no-unused-expressions": [
      "error",
      {
        // 禁止无用的表达式
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "vue/no-useless-template-attributes": "off", //用于检测模板中无用的属性
    "vue/valid-v-slot": "off", //忽略插槽太多报错
    "vue/no-mutating-props": "off", //用于禁止在组件中直接修改 props
    "vue/v-on-event-hyphenation": "off", //检测 v-on 指令中事件名称的连字符使用
  },
}
