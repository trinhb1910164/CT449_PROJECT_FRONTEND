<template>
    <div v-if="login" class="signup">
        <h4 class="title">Đăng Nhập</h4>
        <LoginForm :login="login" @submit:login="addLogin"/>
    </div>
</template>

<script>
    import LoginForm from "@/components/loginForm.vue";
    import UserService from "@/services/user.service";
    export default {
        components: {
            LoginForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                login: {},
                message: "",
            };
        },
        methods: {
            async addLogin(data) {
                try {
                    await UserService.login(data);
                    localStorage.setItem('email', data.email);
                    window.location.href='/';
                } catch (error) {
                    console.log(error);
                    alert("sai mat khau hoac sai email");
                }
            },
        },
    };
</script>
<style>
    .signup{
        width: 50%;
        height: auto;
        margin-left: 25%;
        border: 1px solid;
        padding: 20px;
        border-radius: 5px;
        background-color: azure;
        box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.4);
    }
    .title{
        font-weight: 600;
        font-size: 25px;
        text-align: center;
    }
</style>