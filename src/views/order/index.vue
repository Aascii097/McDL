<script setup>
import { ref, onMounted } from 'vue'
import { getorderAPI } from '@/apis/order'
const orderList = ref([])
const getorder = async () => {
  const res = await getorderAPI()
  orderList.value = res.data
  // console.log(res)
  // const newArray = orderList.value.map((obj) => {
  //   const newname = obj.name.replace(/\//g, '\n')
  //   return { newArray: newname }
  // })
  // console.log(newArray)
}
onMounted(() => getorder())
</script>
<template>
  <div class="order">
    <span class="msg">订单列表</span>
    <el-table :data="orderList" border style="width: 100%" height="800">
      <el-table-column label="套餐" show-overflow-tooltip>
        <template #default="scope">
          <div class="table">
            <span class="list">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="180">
        <template #default="scope">
          <div class="table">
            <span class="price">￥{{ scope.row.price }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
.order {
  margin-left: 450px;
  width: 1240px;
  height: 1000px;

  .msg {
    margin: 20px 20px;
    display: flex;
    justify-content: center;
    font-size: large;
  }

  .table {
    display: flex;
    align-items: center;
    justify-content: center;

    .price {
      font-size: 28px;
      color: red;
      font-family: fantasy;
    }

    .list {
      font-family: serif;
      font-size: 18px;
    }
  }
}
</style>
