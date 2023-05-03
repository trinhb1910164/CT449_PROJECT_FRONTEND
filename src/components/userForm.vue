<template>
    <Form
        @submit="submitUser"
        :validation-schema="userFormSchema"
    >
        
        <div class="form-group">
            <label for="firstname">Tên</label>
            <Field name="firstname" type="text" class="form-control" v-model="userlocal.firstname" />
            <ErrorMessage name="firstname" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="userlocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="mobile">Số Điện Thoại</label>
            <Field name="mobile" type="tel" class="form-control" v-model="userlocal.mobile"
            />
            <ErrorMessage name="mobile" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" v-model="userlocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="userlocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Đăng ký</button>
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
    emits: ["submit:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            
            firstname: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .required("Password phải có giá trị.")
                .min(8, "Password phải ít nhất 8 ký tự.")
                .max(50, "Password có nhiều nhất 50 ký tự."),
            mobile: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .min(10, "Số điện thoại phải ít nhất 10 ký tự.")
                .max(11, "Số điện thoại có nhiều nhất 11 ký tự."),
            address: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(100, "Tên có nhiều nhất 100 ký tự."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // userlocal để liên kết với các input trên form
            userlocal: this.user,
            userFormSchema,
        };
        },
        methods: {
            submitUser() {
                this.$emit("submit:user", this.userlocal);
            },
            
        },
    };
    </script>
        
    <style scoped>
        /* @import "@/assets/form.css"; */
    </style>   