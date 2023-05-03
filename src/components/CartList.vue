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
            async removeCart(data){
                try{
                await UserService.delete(data._id);
                window.location.href='/cart';
                // alert("success");
                }
                catch(error){
                    console.log(error);
                }
            },
              
        }
    };

</script>
<template>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Ảnh sản phẩm</th>
      <th scope="col">Tên sản phẩm</th>
      <th scope="col">Giá</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr class="tablebody" v-for="(product, index) in products"
            :key="product._id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)">
            <th scope="row">{{index + 1}}</th>
            <td class="image"><img v-bind:src="product.image"/></td>
            <td>{{ product.title }}</td>
            <td>{{ product.price }} vnđ</td>
            <td>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeCart(product)"
                >
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </td>
            </tr>
  </tbody>
</table>
    
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
        width: 150px;
    }
    .tablebody{
        border: #000;
    }
</style>