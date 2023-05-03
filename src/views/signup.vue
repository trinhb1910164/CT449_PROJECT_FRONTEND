<template>
    <div v-if="user" class="signup">
        <h4 class="title">Đăng Ký</h4>
        <UserForm :user="user" @submit:user="addUser"/>
    </div>
</template>

<script>
    import UserForm from "@/components/userForm.vue";
    import UserService from "@/services/user.service";
    export default {
        components: {
            UserForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                user: {},
                message: "",
            };
        },
        methods: {
            async addUser(data) {
                try {
                    await UserService.register(data);
                    alert("Bạn đã đăng ký thành công.");
                    window.location.href='/login';
                } catch (error) {
                    console.log(error);
                    alert("email da ton tai");
                    

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