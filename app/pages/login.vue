<template>
  <div class="w-[90%] md:w-[55%] lg:w-[45%] xl:w-[25%] border p-8 font-serif">
    <div class="flex flex-col items-center gap-1">
      <h1 class="font-serif text-2xl">Login into your account</h1>
      <h1 class="text-sm text-gray-500">
        Dont have an account?
        <NuxtLink to="/signup"><span class="text-blue-500 hover:underline">signUp</span></NuxtLink>
      </h1>
    </div>
    <form @submit="handleLogin" class="flex flex-col w-full mt-6 gap-4">
      <div>
        <p class="ml-1">Email</p>
        <Input v-model="loginForm.email" type="text" placeholder="Enter your email" />
      </div>
      <div>
        <p class="ml-1">password</p>
        <!-- <input v-model="loginForm.password" class="w-full py-1.5 px-2 border rounded-md" type="password"
          placeholder="Enter your password" /> -->
        <Input v-model="loginForm.password" type="password" placeholder="Enter your password" />
      </div>
      <div class="flex items-center gap-2">
        <input type="checkbox" name="" id="" />
        <p>Remember me for 30 days</p>
      </div>
      <Button type="submit" text="LogIn" />
      <div class="flex items-center w-full my-4">
        <div class="flex-1 border-t border-gray-400"></div>
        <span class="px-3 text-gray-500">OR</span>
        <div class="flex-1 border-t border-gray-400"></div>
      </div>
    </form>
    <div class="w-full flex flex-col items-center mt-7">
      <button class="w-full flex justify-center items-center gap-2 border-2 py-2 rounded-md">
        <img class="h-5 w-5 rounded-full"
          src="https://icon2.cleanpng.com/20240216/ehh/transparent-google-logo-black-background-with-google-logo-blue-and-red-1710875356941.webp" />SignIn
        in with Google
      </button>
      <NuxtLink class="text-blue-500 mt-5 underline hover:text-black" to="/forgot-password">forget password</NuxtLink>
    </div>
    <div v-if="message?.length" class="w-full text-2xl mt-3">
      <h1 class="text-center text-md text-red-500">{{ message }}</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
const router = useRouter();
import Input from "~/components/ui/Input.vue";
import Button from "~/components/ui/Button.vue";

interface ILoginForm {
  email: string;
  password: string;
}
interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}
const loginForm = reactive<ILoginForm>({
  email: "",
  password: "",
});
const message = ref<string | undefined>("");
const handleLogin = async (event: any) => {
  event.preventDefault();
  try {
    const res = await $fetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: {
        email: loginForm.email,
        password: loginForm.password,
      },
    });
    message.value = res?.message;
    if (res.success && res.token) {
      localStorage.setItem("user_access", res.token);
    }

    if (res?.success) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  } catch (error) {
    message.value = "Something want wrong!";
  }
};
</script>
