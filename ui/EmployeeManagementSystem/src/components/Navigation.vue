<template>
    <div>
        <nav class="navbar navbar-expand-sm bg-light navbar-dark">
            <ul class="navbar-nav">
            <li class="nav-item m-1">
                <router-link class="btn btn-light btn-outline-primary"
                to="/home">Home</router-link>
            </li>
            <li class="nav-item m-1">
                <router-link class="btn btn-light btn-outline-primary"
                to="/department">Department</router-link>
            </li>
            <li class="nav-item m-1">
                <router-link class="btn btn-light btn-outline-primary"
                to="/employee">Employee</router-link>
            </li>
            <li class="nav-item m-1">
                <button @click="Logout()" class="btn btn-light btn-outline-primary">Logout</button>
            </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import router from '@/router';
import { useToast } from 'vue-toastification';

const toast = useToast();
export default {
name:"Navigation",
methods:{
    Logout(){
        console.log("Hellow");
        localStorage.removeItem('jwt');
        toast.success("Logged Out");
        router.push('/login');
    }
}
}
</script>
