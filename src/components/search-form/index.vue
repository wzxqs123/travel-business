<template>
  <div class="search-main">
    <Form
      :model="query"
      class="search-form"
      label-align="right"
      :label-col-props="{
        span: props.labelSpan,
      }"
      :wrapper-col-props="{
        span: 24 - props.labelSpan,
      }"
      :size="size"
      :layout="layout"
      @submit="onSearch"
    >
      <div
        v-show="rulesArr.length + slotsLength > 3"
        style="width: 100%; display: flex; align-items: center"
      >
        <Row>
          <Col
            :flex="1"
            :class="!collapsed ? 'search-form-col' : ``"
            :style="{ height: !collapsed && collapsedRows ? `${collapsedRows * 44}px` : '100%' }"
          >
            <Row id="search-box">
              <slot name="front"></slot>
              <template
                v-for="rule in rulesArr"
                :key="rule.field"
              >
                <Col
                  id="search-box-item"
                  :span="6"
                  :style="{ minWidth: '360px' }"
                >
                  <FormItem
                    :class="`search-form-item${rule.label ? '' : ' no-label-item'}`"
                    :show-colon="false"
                    content-flex
                    :label="rule.label"
                    :field="rule.field"
                  >
                    <component
                      :is="components[rule.type || 'Input']"
                      v-model="query[rule.field]"
                      :placeholder="rule.placeholder || '请输入对应的值'"
                      :options="rule.options"
                      :data="rule.options"
                      v-bind="rule.props"
                    ></component>
                  </FormItem>
                </Col>
              </template>

              <slot name="back"></slot>
            </Row>
          </Col>
          <Col
            :flex="'109px'"
            style="height: 100%"
          >
            <Space
              v-if="isShowBtn"
              :size="16"
              class="search-right-con"
            >
              <Button
                v-if="isShowResetBtn"
                @click="onReset"
                size="large"
                class="reset-btn"
              >
                <span>重置</span>
              </Button>
              <Button
                html-type="submit"
                size="large"
                class="search-btn"
              >
                <span>查询</span>
              </Button>

              <Button
                v-if="collapsed && showColl"
                type="text"
                size="large"
                class="coll-btn"
                @click="collapsed = !collapsed"
              >
                <Space><icon-up />收起筛选</Space>
              </Button>
              <Button
                v-if="!collapsed && showColl"
                type="text"
                size="large"
                class="coll-btn"
                @click="collapsed = !collapsed"
              >
                <Space><icon-down />展开筛选</Space>
              </Button>
              <slot></slot>
            </Space>
          </Col>
        </Row>
      </div>
      <div
        v-show="rulesArr.length + slotsLength < 4"
        style="width: 100%; display: flex; align-items: center"
      >
        <slot name="front"></slot>
        <template
          v-for="rule in rulesArr"
          :key="rule.field"
        >
          <FormItem
            :style="{ width: '360px' }"
            :class="`search-form-item${rule.label ? '' : ' no-label-item'}`"
            :show-colon="false"
            content-flex
            :label="rule.label"
            :field="rule.field"
          >
            <component
              :is="components[rule.type || 'Input']"
              v-model="query[rule.field]"
              :placeholder="rule.placeholder || '请输入对应的值'"
              :options="rule.options"
              :data="rule.options"
              :optionsAddAll="rule.optionsAddAll"
              v-bind="rule.props"
              @onSearch="onSearch"
            ></component>
          </FormItem>
        </template>

        <slot name="back"></slot>
        <Space
          v-if="isShowBtn"
          :size="16"
          class="search-form-but"
        >
          <!-- <Button
            type="outline"
            html-type="submit"
            size="large"
            class="search-btn"
          >
            <span>查询</span>
          </Button>
          <Button
            v-if="isShowResetBtn"
            @click="onReset"
            type="outline"
            size="large"
            class="reset-btn"
          >
            <span>重置</span>
          </Button> -->
          <Button
            v-if="isShowResetBtn"
            @click="onReset"
            size="large"
            class="reset-btn"
          >
            <span>重置</span>
          </Button>
          <Button
            html-type="submit"
            size="large"
            class="search-btn"
          >
            <span>查询</span>
          </Button>
          <slot></slot>
        </Space>
      </div>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { Button, Form, FormItem, Row, Col, Input, InputNumber, Select, TreeSelect, DatePicker, MonthPicker, WeekPicker, TimePicker, RangePicker, Space, Cascader } from '@arco-design/web-vue'
import { computed, ref, watch, onUnmounted, onMounted, useSlots } from 'vue'
import { SearchRule } from './type'
import { DictSelect } from '@/components/dictionary/index'

const components: any = {
  Input,
  InputNumber,
  Select,
  TreeSelect,
  DatePicker,
  MonthPicker,
  WeekPicker,
  TimePicker,
  RangePicker,
  Cascader,
  DictSelect,
}
let showColl = ref(false)
const props = withDefaults(
  defineProps<{
    rules: SearchRule[]
    labelSpan?: number
    span?: number
    layout?: 'inline' | 'horizontal' | 'vertical'
    grid?: boolean
    size?: 'mini' | 'small' | 'medium' | 'large'
    value?: any
    isShowBtn?: boolean
    isShowResetBtn?: boolean
    collapsedRows?: number
  }>(),
  {
    layout: 'inline',
    size: 'medium',
    labelSpan: 8,
    span: 6,
    grid: true,
    collapsedRows: 2, //折叠行数
    value: () => {
      return {}
    },
    isShowBtn: true,
    isShowResetBtn: true,
  }
)
const emit = defineEmits<{
  (e: 'search', value: any): void
  (e: 'reset'): void
}>()
let collapsed = ref(false)
const searchBoxHeight = ref(0)
const searchBoxItemHeight = ref(0)
const query = ref<any>(props.value)
watch(
  () => props.value,
  (val) => {
    query.value = val
  }
)
const slotsLength = computed(() => {
  let length = 0
  if (!!useSlots()?.front) {
    length += 1
  }
  if (!!useSlots()?.back) {
    length += 1
  }
  return length
})

const rulesArr = computed(() => {
  const filterList = props.rules.filter((item: SearchRule) => !item.isNoShow)
  return filterList.map((item: SearchRule) => {
    // 创建一个新的对象，复制原始对象的所有属性，并更改name属性
    if (item?.optionsAddAll) {
      item.options = Array.isArray(item.options) ? [{ label: '全部', value: '' }, ...item.options] : undefined
    }
    return {
      ...item,
    }
  })
})

const onSearch = () => {
  const clean = Object.entries(query.value).reduce((result, [key, value]) => {
    if (typeof value === 'string' && !value) {
      result[key] = undefined
      return result
    }

    const rule = rulesArr.value.find((it: SearchRule) => it.field === key)
    if (rule?.raw) {
      try {
        value = JSON.parse(value + '')
      } catch (error) {
        console.warn(`[search from] ${key}:${value} can't to be raw`)
      }
    }
    result[key] = value
    return result
  }, {} as any)
  emit('search', Object.assign({}, clean))
}
const onReset = () => {
  emit('reset')
  reset()
}
const reset = () => {
  query.value = rulesArr.value
    .map((it: any) => it.field)
    .reduce((pre: any, cur: string) => {
      pre[cur] = undefined
      return pre
    }, {} as any)
  onSearch()
}

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.id
    if (id === 'search-box') {
      searchBoxHeight.value = entry.contentRect.height
    } else if (id === 'search-box-item') {
      searchBoxItemHeight.value = entry.contentRect.height
    }
  })
})

onMounted(() => {
  if (rulesArr.value.length > 3) {
    const element = document.getElementById('search-box') as Element
    const searchItemElement = document.getElementById('search-box-item') as Element
    resizeObserver.observe(element)
    resizeObserver.observe(searchItemElement)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  // if (rulesArr.value.length > 3) {
  //   resizeObserver.unobserve(document.getElementById('search-main') as Element)
  // }
})
watch([searchBoxHeight, searchBoxItemHeight], () => {
  if (searchBoxHeight.value - 1 > props.collapsedRows * searchBoxItemHeight.value) {
    showColl.value = true
  } else {
    showColl.value = false
    collapsed.value = false
  }
})

defineExpose({
  reset,
})
</script>

<style lang="less" scoped>
.search-main {
  background-color: #fff;
  padding: 16px 0 16px;
  .search-form {
    :deep(.arco-row) {
      width: 100%;
    }
    .search-box {
      display: flex;
      flex-wrap: wrap;
    }
    .search-form-col {
      // height: 88px;
      overflow: hidden;
      // background-color: red;
    }
    :deep(.arco-form-item) {
      // border-radius: 6px;
      // border: 1px solid #d3d9e0;
      // padding: 6px 12px;
      // &:hover {
      //   border-color: #08f;
      // }
      display: flex;
      align-items: center;
      .arco-form-item-label-col {
        position: relative;
        line-height: 22px;

        // &::after {
        //   background-color: #f0f2f5;
        //   content: '';
        //   display: block;
        //   position: absolute;
        //   right: 8px;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   width: 1px;
        //   height: 16px;
        // }
      }
      .arco-form-item-wrapper-col {
        min-height: 22px;
        border: 1px solid #d3d9e0;
        padding: 6px 12px;
        border-radius: 4px;
        .arco-form-item-content {
          min-height: 22px;
          .arco-input-wrapper {
            padding-left: 0;
            padding-right: 0;
            border: none;
            background-color: #fff;
            .arco-input.arco-input-size-medium {
              padding-top: 0;
              padding-bottom: 0;
            }
          }

          .arco-picker-size-medium {
            height: auto;
          }
          .arco-picker {
            padding: 0;
            border: none;
            background-color: #fff;
          }

          .arco-select-view-single {
            background-color: #fff;
            border: none;
            &:hover {
              background-color: #fff;
            }
            .arco-select-view-input {
              padding-top: 0;
              padding-bottom: 0;
            }
            .arco-select-view-value {
              padding: 0;
              min-height: 22px;
            }
          }

          .arco-select-view-multiple {
            border: none;
            background-color: #fff;
            &:hover {
              background-color: #fff;
            }
            .arco-select-view-inner {
              padding: 0;
              .arco-select-view-tag {
                margin-top: 0px;
                margin-bottom: 0px;
                min-height: 20px;
                line-height: 20px;
                background-color: #f7f9fc;
              }
              .arco-select-view-input {
                padding: 0;
                margin: 0;
                min-height: 22px;
              }
            }
          }
        }
      }
    }
    .no-label-item {
      :deep(.arco-form-item-label-col) {
        display: none !important;
      }
    }
    .search-right-con {
      // border-left: 1px solid rgb(228, 230, 236);
      padding-left: 20px;
      height: 100%;
    }
    .search-form-but {
      height: 36px;
      margin-top: -10px;
    }
    .coll-btn {
      margin-left: -14px;
    }
    .search-btn {
      min-width: 88px;
      color: #fff;
      background-color: #ff5d15;
      // &:hover {
      //   background: #f0fbff;
      //   border-color: #08f;
      //   color: #08f;
      // }
      border-radius: 6px;
    }
    .reset-btn {
      min-width: 88px;
      // background: #fff;
      // border-color: #d3d9e0;
      color: #1d2129;
      border-radius: 6px;
      // &:hover {
      //   background-color: #f0fbff;
      //   border-color: #08f;
      //   color: #08f;
      // }
    }
  }
}
</style>
