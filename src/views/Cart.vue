<template>
    <div class="page">
        <div class="mt-3">
            <h4>
                Giỏ Hàng
            </h4>
            
            <CartList
                v-if="filteredProductsCount > 0"
                :products="filteredProducts"
                v-model:activeIndex="activeIndex"
            />
            
            <p v-else>Không có sản phẩm nào trong giỏ hàng.</p>
            <div class="total">Tổng tiền: {{ total }} VNĐ</div>
            <div>
                <button class="orderbutton" @click="addOrder()">Đặt Hàng</button>
            </div>
            <div>
                <a href="/" style="text-decoration: none;"><i class="fas fa-reply" ></i> Tiếp tục mua sắm...</a>
            </div>

        </div>
    </div> 
</template>
<script>
    import InputSearch from "@/components/InputSearch.vue";
    import CartList from "@/components/CartList.vue";
    import ProductService from "@/services/user.service";
    export default {
        components: {
            InputSearch,
            CartList,
        },
        data() {
            return {
                products: [],
                activeIndex: -1,
                searchText: "",
                totalPrice:0,
            };
        },
        watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
            searchText() {
                this.activeIndex = -1;
            },
        },
        computed: {
        // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
            productStrings() {
                return this.products.map((product) => {
                    const { brand } = product;
                    return [brand].join("");
                });
            },
            // Trả về các product có chứa thông tin cần tìm kiếm.
            filteredProducts() {
                if (!this.searchText) return this.products;
                return this.products.filter((_product, index) =>
                    this.productStrings[index].includes(this.searchText)
                );
            },
            activeProduct() {
                if (this.activeIndex < 0) return null;
                return this.filteredProducts[this.activeIndex];
                },
            filteredProductsCount() {
                return this.filteredProducts.length;
            },
            total(){
                for (let i = 0; i < this.filteredProducts.length; i++) {
                        this.totalPrice += this.filteredProducts[i].price;
                    }
                return this.totalPrice;
            }
        },
        methods: {
            async retrieveProducts() {
                try {
                    this.products = await ProductService.getAll(localStorage.getItem('email'));
                } catch (error) {
                    console.log(error);
                }
            },
            async addOrder() {
                try {
                    let totalPrice = 0;
                    let orderItems =[];
                    const carts = await ProductService.getAll(localStorage.getItem('email'));
                    if(carts.length>0){
                    for (let i = 0; i < carts.length; i++) {
                        totalPrice += carts[i].price;
                        orderItems.push({CartId:carts[i]._id})
                    }
                    let order = {
                        orderItems,
                        totalPrice
                    }
                    await ProductService.addOrder(order);
                    alert("Bạn đã đặt hàng thành công");
                    for (let i = 0; i < carts.length; i++) {
                       await ProductService.delete(carts[i]._id)
                    }
                    window.location.href='/';
                }
                } catch (error) {
                    console.log(error);
                    
                }
            },
            
            refreshList() {
                this.retrieveProducts();
                this.activeIndex = -1;
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    .page {
        text-align: center;
        max-width: 100%;
    }
    .orderbutton{
        border-radius: 30px;
        background-color: aqua;
        margin-left: 75%;
    }
    .orderbutton:hover{
        border-radius: 30px;
        background-color: rgb(32, 83, 249);
        color: #fff;
        
    }
    .total{
        margin:0 0 20px 75%;
        font-size: 20px;
        font-weight: 600;
        
    }
</style>