<template>
  <div class="w-[90%] md:w-[55%] lg:w-[45%] xl:w-[25%] mx-auto border p-8 font-serif">
    <div class="flex flex-col items-center gap-1">
      <h1 class="font-serif text-2xl">Change your account password</h1>
      <h1 class="text-sm text-gray-500">
        Dont want change?
        <NuxtLink to="/login"><span class="text-blue-500 hover:underline">login</span></NuxtLink>
      </h1>
    </div>
    <div class="flex flex-col w-full mt-6 gap-4">
      <div>
        <p class="ml-1">Old Password</p>
        <input v-model="forgetPassForm.password" class="w-full py-1.5 px-2 border rounded-md" type="text"
          placeholder="Enter your old password" />
      </div>
      <div>
        <p class="ml-1">New password</p>
        <input v-model="forgetPassForm.newPassword" class="w-full py-1.5 px-2 border rounded-md" type="password"
          placeholder="Enter your new password" />
      </div>
      <button @click="handleForgot" class="bg-black text-white py-2.5 rounded-md">submit</button>
    </div>
    <h1 class=" text-red-500" v-if="message?.length">{{ message }}</h1>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
const message = ref<string | undefined>("")
interface IForgot {
  email: string
  password: String;
  newPassword: String;
}
interface IForgotPayload {
  success: boolean,
  message: string
}
const forgetPassForm = reactive<IForgot>({
  email: "",
  password: "",
  newPassword: ""
})
const handleForgot = async () => {
  try {
    const token = localStorage.getItem("user_access")
    const res = await $fetch<IForgotPayload>('/api/userForm/change-password', {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        password: forgetPassForm.password,
        newPassword: forgetPassForm.newPassword
      }
    })
    message.value = res?.message
  } catch (error) {
    message.value = "some internal error!"
  }
}
</script>
