<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand"><img class="logo" src="https://tse3.mm.bing.net/th?id=OIP.M4U9zhX6hl_lTKVdForAgAHaFj&pid=Api&P=0"/></a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    WATCHSTORE.COM
                </router-link>
            </li>
        </div>
        
        <div v-if="getemail!=null" class="dropdown">
            <button class="nut"> {{ getemail }}</button>
            <div class="dropdown-options">
                <a href="/" @click="logout()">Logout</a>
                <router-link :to="{ name: 'cart' }" >Giỏ hàng</router-link>
            </div>
        </div>
        <div v-else class="dropdown">
            <button class="nut"> User</button>
            <div class="dropdown-options">
                <router-link :to="{ name: 'contact.login' }" >Login</router-link>
                <router-link :to="{ name: 'contact.signup' }" >Signup</router-link>
            </div>
        </div>
       
    </nav>
    <div class="banner">
        <img src="../assets/image/banner-dongho-3.jpg" alt="">
    </div>
</template>
<script>
    export default {
        computed:{
            getemail(){
                return localStorage.getItem('email');
            },
        },
        methods:{
          logout(){
            localStorage.removeItem('email');
          },
        },
    
    }
    // console.log(getemail);
</script>
<style>
    .dropdown {
  display: inline-block;
  position: relative;
  margin-right: 50px;
  border-radius: 15px;
}

button{
  border:none;
  border-radius:5px;
  padding:15px 20px;
  font-size:18px;
  cursor:pointer;
}
.nut{
  border-radius: 10px;
}

button:hover{
  background-color:#ddd;
}

.dropdown-options {
  display: none;
  position: absolute;
  overflow: auto;
  background-color:#fff;
  border-radius:5px;
  box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.4);
}

.dropdown:hover .dropdown-options {
  display: block;
}

.dropdown-options a {
  display: block;
  color: #000000;
  padding: 5px;
  text-decoration: none;
  padding:20px 40px;
  text-align: center;
}

.dropdown-options a:hover {
  color: #0a0a23;
  background-color: #ddd;
  border-radius:5px;
  text-decoration: none;
}
.logo{
  height: 70px ;
  border-radius: 10px;
  box-shadow: 0px 10px 10px 0px rgba(0,0,0,0);
}
.banner img{
        width: 100%;
        height: 200px;
    }
</style>
