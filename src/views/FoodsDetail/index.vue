<script setup>
import { getfoodsdetailAPI } from '@/apis/foods'
import { addcartAPI } from '@/apis/cart'
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { clearcartAPI } from '@/apis/cart'
const userStore = useUserStore()
const isLogin = computed(() => userStore.token)

const router = useRouter()
const route = useRoute()
const foodsDetailList = ref([])
const getDetail = async () => {
  const res = await getfoodsdetailAPI(route.params.id)
  foodsDetailList.value = res.data
}
const addcart = async () => {
  if (isLogin.value) {
    const res = await addcartAPI({
      id: foodsDetailList.value.id,
      name: foodsDetailList.value.name,
      num: 1,
      price: foodsDetailList.value.price,
      imgurl: foodsDetailList.value.imgurl
    })
    console.log(res)
    ElMessage({
      type: 'success',
      message: res?.message
    })
    if (res.status === 1) {
      userStore.setToken(null)
      const res = await clearcartAPI()
      console.log(res)
      ElMessage({
        type: 'warning',
        message: res?.message
      })
      router.push('/login')
    }
  } else {
    ElMessage({
      type: 'warning',
      message: '请先登录'
    })
    userStore.setToken(null)
    const res = await clearcartAPI()
    console.log(res)
    router.push('/login')
  }
}
onMounted(() => getDetail())
</script>
<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu/1' }">菜单</el-breadcrumb-item>
      <el-breadcrumb-item>{{ foodsDetailList.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="detail">
    <img class="img" :src="foodsDetailList.imgurl" alt="" />
    <div class="spec">
      <div class="g-name">{{ foodsDetailList.name }}</div>
      <div class="g-desc">
        {{ foodsDetailList.desc }}
      </div>
      <div class="g-price">
        <span> ￥{{ foodsDetailList.price }}</span>
      </div>
    </div>
  </div>

  <div class="cart">
    <el-button size="large" @click="addcart"> 加入购物车 </el-button>
  </div>
</template>
<style scoped lang="scss">
.breadcrumb {
  margin-top: 20px;
  margin-left: 20px;
}

.detail {
  display: flex;
  margin-left: 450px;
  margin-top: 50px;
  width: 1000px;
  height: 450px;

  .img {
    width: 400px;
    height: 400px;
    border: 1px solid $BORDERCOLOR;
    /* 添加1像素黑色边框 */
    border-radius: 5px;

    /* 添加圆角边框 */
  }

  .spec {
    //flex: 1;
    display: flex;
    width: 800px;
    height: 400px;
    margin-left: 50px;
    flex-wrap: wrap;

    .g-name {
      width: 800px;
      font-size: 28px;
      line-height: 38px;
      color: red;
    }

    .g-desc {
      font-size: 15px;
      width: 600px;
    }

    .g-price {
      font-size: 30px;
      line-height: 28px;
      color: #dc1515;
      font-family: fantasy;
      margin-left: 75%;
    }
  }
}

.cart {
  margin-left: 1450px;
}
</style>
