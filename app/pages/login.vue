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
      <div class=" relative">
        <p class="ml-1">Password</p>
        <Input v-model="loginForm.password" :type="showpass ? 'text' : 'password'" placeholder="Enter your password" />
        <svg class="absolute right-2 top-1/2 hover:text-green-500 cursor-pointer" v-if="!showpass" @click="showpass = true"
          xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
            <path
              d="M2.036 12.322a1 1 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178c.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178" />
            <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
          </g>
        </svg>
        <svg class="absolute right-2 top-1/2 hover:text-green-500 cursor-pointer" v-else @click="showpass = false"
          xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M3.98 8.223A10.5 10.5 0 0 0 1.934 12c1.292 4.339 5.31 7.5 10.066 7.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.499a10.52 10.52 0 0 1-4.293 5.773M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
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
    <div v-if="message?.length" class="w-full bg-red-300 border rounded-md border-black py-2 mt-3">
      <h1 class="text-center text-md">{{ message }}</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
const router = useRouter();
import Input from "~/components/ui/Input.vue";
import Button from "~/components/ui/Button.vue";

const showpass = ref<boolean>(false);
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
const message = ref<string>("");
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
      // update shared state so layout reacts immediately
      useState<string | null>("user_access").value = res.token;
    }

    if (res?.success) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  } catch (error) {
    message.value = "Something went wrong!";
  }
};
</script>
