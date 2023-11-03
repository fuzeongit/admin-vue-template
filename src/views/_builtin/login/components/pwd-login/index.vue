<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="username">
      <n-input v-model:value="model.username" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item path="password">
      <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="请输入密码" />
    </n-form-item>
    <!-- <n-form-item>
      <div v-html="captcha?.data"></div>
    </n-form-item> -->
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-end">
        <n-button :text="true" @click="toLoginModule('reset-pwd')">忘记密码？</n-button>
      </div>
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
      >
        确定
      </n-button>
      <div class="flex-y-center justify-between">
        <n-button class="flex-1" :block="true" @click="toLoginModule('register')">
          {{ loginModuleLabels.register }}
        </n-button>
      </div>
      <n-divider>其他登录</n-divider>
      <div class="flex justify-center">
        <n-button text size="large" @click="getGithubOauthUrl">
          <template #icon>
            <icon-mdi-github class="text-24px text-primary" />
          </template>
        </n-button>
      </div>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
// import { JSEncrypt } from 'jsencrypt';
import { loginModuleLabels } from '@/constants';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';
// import { authApis } from '@/service';
// import { formRules } from '@/utils';
// import { useAsyncState } from '@vueuse/core';
import { PasswordLoginDto } from '@/params';
import { githubApis } from '@/service/apis/github';

// const { state: captcha } = useAsyncState(() => authApis.getCaptcha(), undefined, {
//   resetOnExecute: false
// });

const auth = useAuthStore();
const { login } = useAuthStore();
const { toLoginModule } = useRouterPush();

const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive(new PasswordLoginDto());
const rules: FormRules = {
  // password: formRules.pwd
};

function handleSubmit(e: MouseEvent) {
  if (!formRef.value) return;
  e.preventDefault();

  formRef.value.validate(errors => {
    if (!errors) {
      // 对内容进行加密
      const { username, password } = model;
      // const encryptor = new JSEncrypt(); // 创建加密对象实例
      // encryptor.setPublicKey(captcha.value!.publicKey); // 设置公钥
      // const encryptPassword = encryptor.encrypt(password);
      // login({ username, password: encryptPassword as string, code: captcha.value!.text });
      login({ username, password, code: '' });
    }
  });
}

async function getGithubOauthUrl() {
  const url = await githubApis.getOauthUrl();
  location.href = url;
}
</script>
<style scoped></style>
