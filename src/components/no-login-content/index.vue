<template>
  <div class="containers">
    <div class="wrapper">
      <div class="login-wrap">
        <div class="account-wrapper">
          <div class="mb-[30px] text-[24px] leading-[34px] font-bold text-center">密码登录</div>
          <div class="code-form">
            <Form
              ref="formRef"
              :model="form"
              layout="vertical"
              :rules="rules"
              @submit-success="(value)=>onSave(value as LoginQuery)"
            >
              <FormItem
                field="username"
                :validate-trigger="['input']"
                label="账号"
              >
                <Input
                  v-model="form.username"
                  placeholder="请输入账号"
                  @input="handleInput"
                >
                </Input>
              </FormItem>
              <FormItem
                field="password"
                label="密码"
              >
                <InputPassword
                  v-model="form.password"
                  class="password-input"
                  placeholder="输入密码"
                >
                </InputPassword>
              </FormItem>
              <FormItem
                class="btn"
                hide-label
              >
                <Button
                  html-type="submit"
                  long
                  type="primary"
                >
                  立即登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Form, FormItem, Input, Button, InputPassword, Message } from '@arco-design/web-vue'
import { useHotelOrder } from '@/composable/login/index'
import { LoginQuery } from '@/composable/login/type.d'
// import { isMobile } from '@/utils'
import { useUserStore } from '@/store/user'

const { doLogin } = useHotelOrder()
const userStore = useUserStore()
const formRef = ref()
const form = ref<LoginQuery>({
  grant_type: 'password',
  username: '',
  password: '',
  client_id: '1876925458981212233',
  client_secret: '6b70649415be2833ee195809e02c7911a9be16b68fa07d10b4a644efa177798a',
  scope: 'userinfo',
})

// const verifyPhone = (value: string, callback: any) => {
//   if (!isMobile(value)) {
//     callback('请输入正确的手机号')
//   } else {
//     callback()
//   }
// }

const rules = {
  username: [{ required: true, message: '账号不能为空' }],
  code: [{ required: true, message: '验证码不能为空' }],
  password: [{ required: true, message: '密码不能为空' }],
}
const handleInput = (value: string) => {
  // 去除前后空格
  if (/(^\s+.*|.*\s+$)/.test(value)) {
    form.value.username = value.trim()
  }
}
const onSave = (data: LoginQuery) => {
  if (data.username !== 'PTJRKJ' || data.password !== 'JK123456') {
    Message.error('账号或密码错误')
    return
  }
  const subForm = {
    grant_type: 'password',
    username: '13000000002',
    password: '376032',
    client_id: '1876925458981212233',
    client_secret: '6b70649415be2833ee195809e02c7911a9be16b68fa07d10b4a644efa177798a',
    scope: 'userinfo',
  }
  doLogin(subForm).then((res: any) => {
    const jsonString = JSON.stringify(res.data)
    const base64Encoded = btoa(
      encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
      })
    )

    localStorage.setItem(
      'auth',
      JSON.stringify({
        token: base64Encoded,
      })
    )
    localStorage.setItem('appName', 'b2b-platform')
    localStorage.setItem('requestName', 'b2b')
    userStore.setLogonStatus(true)
    window.location.href = `${location.origin}/token.html?access_token=${base64Encoded}`
  })
}
</script>
<style scoped lang="less">
.containers {
  width: 100%;
  height: 100vh;
  position: relative;
  min-width: 1440px;
  // max-width: 1920px;
  background: #fff url('@/assets/background-image-index.png') center 0 no-repeat;
  background-size: cover;

  .wrapper {
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    transform: translateY(-50%);
    display: flex;
    justify-content: end;
    .login-wrap {
      background-color: #fff;
      border-radius: 30px;
      .account-wrapper {
        padding: 46px 50px;
        width: 480px;
        box-sizing: border-box;

        .code-form {
          :deep(.arco-form-item) {
            margin-bottom: 16px;
            &.arco-form-item-status-error {
              .arco-form-item-content-wrapper {
                border: 1px solid #ff4222;
              }
            }

            .password-input {
              .arco-input-suffix {
                color: #767675;
                .arco-icon {
                  width: 24px;
                  height: 24px;
                }
              }
            }
            .arco-input.arco-input-size-medium {
              font-size: 16px;
            }
            .msg {
              font-size: 14px;
              color: #767675;
              position: absolute;
              right: 0;
              bottom: -20px;
            }
            .forget {
              position: absolute;
              bottom: -20px;
              right: 0;
              color: @primary-color;
              cursor: pointer;
            }
            .arco-form-item-label {
              font-size: 16px;
              color: #767675;
              font-weight: 500;
              .arco-form-item-label-required-symbol {
                display: none;
              }
            }
            .arco-form-item-content-wrapper {
              position: relative;
              border: 1px solid #d8d8d8;
              border-radius: 12px;
              .arco-input-wrapper {
                border-radius: 12px;
                padding: 0 24px;
                background-color: #fff;
                border: none;
                height: 56px;
                .arco-input-prefix {
                  color: #2f2f2f;
                  padding-right: 18px;
                }
              }
              .arco-input-append {
                background-color: #fff;
                border-left: none;
                font-size: 16px;
                padding-right: 24px;
                padding-left: 0;
                border-radius: 12px;
              }
            }
          }
          .btn {
            margin-top: 28px;
            :deep(.arco-btn) {
              border-radius: 12px;
              height: 50px;
              font-size: 18px;
              color: #fff;
              background-color: #165dff;
            }
          }
        }
      }
    }
  }
}
</style>
