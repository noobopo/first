<template>
    <div class="w-[90%] md:w-[55%] lg:w-[45%] xl:w-[25%] mx-auto mt-10 font-serif p-4 border rounded-md shadow-sm">
        <div class=" flex flex-col items-center gap-2">
            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" alt="profile iamge" class=" w-[50%]">
            <h1 class="text-xl text-center">{{ name }}</h1>
            <h1 class="text-xl text-center">{{ email }}</h1>
            <button @click="handleLogout" class=" py-2 w-full bg-black text-white rounded-md">LogOut</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const router = useRouter();


const token = ref<string>("");
const name = ref<string>("")
const email = ref<string>("")

interface IUser {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IprofileRes {
    success : boolean,
    user : IUser
}

const handleLogout = ()=>{
    localStorage.removeItem("user_access")
    // update shared state so layout updates immediately
    useState<string | null>("user_access").value = null;
    router.push('/login')
}

onMounted(() => {
    const storedToken = localStorage.getItem("user_access");

    token.value = storedToken || "";
    if (!token.value) {
        router.push("/login");
    }
    const fetchProfile = async () => {
        try {
            const res = await $fetch<IprofileRes>('/api/userForm/profile', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            name.value = res?.user?.name
            email.value = res?.user?.email
        } catch (error) {
            console.log(error);
        }
    }
    fetchProfile()
});
</script>
