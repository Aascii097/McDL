<script setup>
import { useUserStore } from '@/stores/user'
import { clearcartAPI } from '@/apis/cart'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const logout = async () => {
  userStore.setToken(null)
  await clearcartAPI()
  router.push('/login')
}
</script>
<template>
  <el-affix :offset="0">
    <header class="app-header">
      <div class="container">
        <h1 class="logo">
          <RouterLink to="/">McDL</RouterLink>
        </h1>
        <h1 class="menu">
          <RouterLink to="/menu/1"> menu </RouterLink>
          <div @click="$router.push('/menu/1')" class="character">菜单</div>
        </h1>
        <h1 class="cart">
          <RouterLink to="/cart">cart</RouterLink>
          <div @click="$router.push('/cart')" class="character">购物车</div>
        </h1>
        <h1 class="order">
          <RouterLink to="/order">order</RouterLink>
          <div @click="$router.push('/order')" class="character">订单</div>
        </h1>
        <el-button v-if="userStore.token" @click="logout">退出登录</el-button>
        <el-button v-else @click="$router.push('/login')">登录</el-button>
      </div>
    </header>
  </el-affix>
</template>

<style scoped lang="scss">
.app-header {
  background: #fff;
  border-bottom: 1px solid #d9d9d9;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 120px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center / contain;
    }
  }

  .menu {
    width: 300px;

    &:hover {
      color: red;
      border-left: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
    }

    a {
      display: flex;
      height: 60px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/menu.png') no-repeat center / contain;
    }

    .character {
      width: 300px;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      font-weight: lighter;
      text-align: center;
    }
  }

  .cart {
    width: 300px;

    &:hover {
      color: red;
      border-left: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
    }

    a {
      display: flex;
      height: 60px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/cart.png') no-repeat center / contain;
    }

    .character {
      width: 300px;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      font-weight: lighter;
      text-align: center;
    }
  }

  .order {
    width: 300px;

    &:hover {
      color: red;
      border-left: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
    }

    a {
      display: flex;
      height: 60px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/order.png') no-repeat center / contain;
    }

    .character {
      width: 300px;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      font-weight: lighter;
      text-align: center;
    }
  }
}
</style>
