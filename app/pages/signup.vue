<template>
  <div class="w-[90%] md:w-[55%] lg:w-[45%] xl:w-[25%] border p-8 font-serif">
    <div class="flex flex-col items-center gap-1">
      <h1 class="font-serif text-2xl">Login into your account</h1>
      <h1 class="text-sm text-gray-500">
        Already have an account?
        <NuxtLink to="/login"><span class="text-blue-500 hover:underline">signIn</span></NuxtLink>
      </h1>
    </div>
    <form @submit="handleSignUp" class="flex flex-col w-full mt-6 gap-4">
      <div>
        <p class="ml-1">Name</p>
        <Input v-model="signUpForm.name" type="text" placeholder="Enter your Name" required />
      </div>
      <div>
        <p class="ml-1">Email</p>
        <Input v-model="signUpForm.email" type="text" placeholder="Enter your email" required />
      </div>
      <div>
        <p class="ml-1">password</p>
        <Input v-model="signUpForm.password" type="password" placeholder="Enter your password" required />
      </div>
      <Button type="submit" text="signUp" />
      <div class="flex items-center w-full my-4">
        <div class="flex-1 border-t border-gray-400"></div>
        <span class="px-3 text-gray-500">OR</span>
        <div class="flex-1 border-t border-gray-400"></div>
      </div>
    </form>
    <div class="w-full flex flex-col items-center mt-5">
      <button class="w-full flex justify-center items-center gap-2 border-2 py-2 rounded-md">
        <img class="h-5 w-5 rounded-full"
          src="https://icon2.cleanpng.com/20240216/ehh/transparent-google-logo-black-background-with-google-logo-blue-and-red-1710875356941.webp" />SignIn
        in with Google
      </button>
    </div>
    <div v-if="message?.length" class="w-full text-2xl mt-3">
      <h1 class="text-center text-md text-red-500">{{ message }}</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
import Input from "~/components/ui/Input.vue";
import { reactive } from "vue";
import { ref } from "vue";
import Button from "~/components/ui/Button.vue";
const router = useRouter();

interface ISignUp {
  name: string;
  email: string;
  password: string;
}
interface ISignUpPayload {
  success: boolean;
  message: string;
}
const signUpForm = reactive<ISignUp>({
  name: "",
  email: "",
  password: "",
});

let message = ref<string>("");

const handleSignUp = async (event: any) => {
  event.preventDefault();
  try {
    const res = await $fetch<ISignUpPayload>("/api/auth/register", {
      method: "POST",
      body: {
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password,
      },
    });
    message.value = res?.message;
    if (res?.success) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  } catch (error) {
    message.value = "Something want wrong!";
  }
};
</script>
