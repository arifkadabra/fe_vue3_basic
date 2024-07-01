<script setup>
import { reactive } from "vue";
import { useAuthStore } from "../stores/auth.store";

const state = reactive({
    email: "",
    password: "",
});

const onSubmit = () => {
    const authStore = useAuthStore();
    const { email, password } = state;
    return authStore
        .login(email, password)
        .catch((error) => setErrors({ apiError: error }));
};
</script>
<template>
    <div class="card card-primary">
        <div class="card-header">
            <h3 class="card-title">Login</h3>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input v-model="state.email" type="text" class="form-control" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="state.password" type="password" class="form-control" />
            </div>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary" @click="onSubmit">
                Login
            </button>
        </div>
    </div>
</template>
