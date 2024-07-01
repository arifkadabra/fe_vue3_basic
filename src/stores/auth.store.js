import { defineStore } from 'pinia';
import { router } from '../router';
import api from '../services/api';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) { 
            await api.post('login', 
            {
                email: username,
                password: password
            }).then(response => {
                if (response.data.data) {
                    this.user = response.data.data;
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    router.push(this.returnUrl || '/');
                }
            })
            .catch((error) => {
                console.log(error)
                errors.value = error.response.data;
            });
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});
