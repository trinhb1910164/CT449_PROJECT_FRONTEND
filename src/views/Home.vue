<template>
    
    <div class="page">
        <div class="row">
            <div class="col-2"></div>
            <InputSearch v-model="searchText" class="col-8"/>
        </div>
        <div class="mt-3">
            <h4 class="titlehome">
                WELLCOME
                <i class="fas fa-clock"></i>
            </h4>
            <ProductList
                v-if="filteredProductsCount > 0"
                :products="filteredProducts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có sản phẩm nào.</p>
            
        </div>
        
        
    </div>
</template>
<script>
    import InputSearch from "@/components/InputSearch.vue";
    import ProductList from "@/components/ProductList.vue";
    import ProductService from "@/services/product.service";
    export default {
        components: {
            InputSearch,
            ProductList,
        },
        data() {
            return {
                products: [],
                activeIndex: -1,
                searchText: "",
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
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
            productStrings() {
                return this.products.map((product) => {
                    const { brand } = product;
                    return [brand].join("");
                });
            },
            // Trả về các contact có chứa thông tin cần tìm kiếm.
            filteredProducts() {
                if (!this.searchText) return this.products;
                return this.products.filter((_product, index) =>
                    this.productStrings[index].includes(this.searchText)
                );
            },
            filteredProductsCount() {
                return this.filteredProducts.length;
            },
        },
        methods: {
            async retrieveProducts() {
                try {
                    this.products = await ProductService.getAll();
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
    .titlehome{
        margin: 20px;
        font-size: 30px;
        font-weight: 600;

    }
    
    
</style>