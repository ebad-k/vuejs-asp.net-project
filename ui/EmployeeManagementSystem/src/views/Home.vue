<template>
    <Navigation></Navigation>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h2>Welcome to Employment System</h2>
                <p>This is a simple homepage for the employment system. You can find various features and functionalities related to employment management.</p>
                <p>Please use the navigation bar to explore different sections of the system.</p>
            </div>
            <div class="col-md-5">
                <img src="../assets/icon.png" alt="Employment System" class="img-fluid">
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
    name: 'Home',
    components:{
      Navigation
    },
}
</script>
