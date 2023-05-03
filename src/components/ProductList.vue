<script>
    import UserService from "@/services/user.service";
    export default {
        props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
        },
        emits: ["update:activeIndex"],
        data() {
            return {
                cart:{
                    email:'',
                    title:'',
                    price:'',
                    image:'',
                },
                
                message: "",
            };
        },
        computed:{
            getemail(){
                return localStorage.getItem('email');
            }
        },
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },
            
            async addCart(data) {

                try {
                    
                        if(localStorage.getItem('email')!=null){
                            let newcart = {
                            email:localStorage.getItem('email'),
                            title:data.title,
                            price:data.price,
                            image:data.image,
                            }
                            await UserService.addcart(newcart);
                            alert("Bạn đã thêm "+ data.title + " vào giỏ hàng.");
                        }
                        else{
                            alert("Bạn chưa đăng nhập. Vui Lòng đăng nhập để mua hàng!");
                            window.location.href='/login';
                        }
                    
                    
                    
                    console.log(data._id);
                } catch (error) {
                    console.log(error);
                }
            },   
        }
    };

</script>
<template>
    
    <div class="row">
        <div class="col-lg-3 col-6 "
        v-for="(product, index) in products"
            :key="product._id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            <div class="image">
                <img v-bind:src="product.image"/>
            </div>
            <div class="content">
                {{ product.title }}
            </div>
            <div class="content">
                Giá: {{ product.price }}
            </div>
            <div class="content">
                Xuất xứ: {{ product.origin }}
            </div>
            <div class="content">
                <button class="btn btn-sm btn-primary" @click="addCart(product)">
                    <i class="fas fa-plus"></i> Thêm vào giỏ hàng
                </button>
            </div>
            
            
        </div>

    </div>
</template>

<style>
    .col-6,.col-lg-3{
        border-radius: 5px;
        padding: 10px;
        transform: scale(1, 1);
        transition: transform 0.5s ease;
    }
    .col-6:hover,.col-lg-3:hover{
        transform: scale(1.05, 1.05);
        z-index: 100;
        border: 1px solid #000;
    }
    .image img{
        width: 250px;
    }
    .content{
        margin: 10px;
    }
</style>