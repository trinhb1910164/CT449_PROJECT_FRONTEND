<template>
    <Form
        @submit="submitLogin"
        :validation-schema="loginFormSchema"
    >
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="loginLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" v-model="loginLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        

        <div class="form-group">
            <button class="btn btn-primary">Đăng nhập</button>
            
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
    Form,
    Field,
    ErrorMessage,
    },
    emits: ["submit:login",],
    props: {
        login: { type: Object, required: true }
    },
    data() {
        const loginFormSchema = yup.object().shape({
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(8, "Tên phải ít nhất 8 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // loginLocal để liên kết với các input trên form
            loginLocal: this.login,
            loginFormSchema,
        };
        },
        methods: {
            submitLogin() {
                this.$emit("submit:login", this.loginLocal);
            },
        },
    };
    </script>
        
    <style scoped>
        /* @import "@/assets/form.css"; */
    </style>   