<script setup>
import { getcartAPI, deletecartAPI, updatecartAPI, clearcartAPI } from '@/apis/cart'
import { addorderAPI } from '@/apis/order'
import { onMounted, ref, computed } from 'vue'
import { debounce } from 'lodash'
const cartList = ref([])
const getcart = async () => {
  const res = await getcartAPI()
  cartList.value = res.data
}
const delCart = async (id) => {
  const idx = cartList.value.findIndex((item) => id === item.id)
  cartList.value.splice(idx, 1)
  await deletecartAPI(id)
}
const handleChange = debounce(async (id, num) => {
  await updatecartAPI({ id, num })
}, 300)
const allCount = computed(() => cartList.value.reduce((a, c) => a + c.num, 0))
const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.num * c.price, 0))
const clear = async () => {
  await clearcartAPI()
  getcart()
}
const addOrder = async () => {
  const idx = new Date().getTime()
  const namestring = cartList.value.map((item) => `${item.name}*${item.num}`).join('/')
  const pricex = allPrice.value
  const res = await addorderAPI({ id: idx, name: namestring, price: pricex })
  console.log(res)
  if (res.status === 0) {
    clear()
  }
}
onMounted(() => getcart())
</script>

<template>
  <div class="McDL-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="i in cartList" :key="i.id">
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="i.imgurl" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.price }}</p>
              </td>
              <td class="tc">
                <el-input-number :min="1" @change="handleChange(i.id, i.num)" v-model="i.num" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (i.price * i.num).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm
                    title="确认删除吗?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="delCart(i.id)"
                  >
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary" @click="$router.push('/menu/1')">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ allCount }}件商品,商品合计：
          <span class="red">¥ {{ allPrice.toFixed(2) }}</span>
        </div>
        <div class="total">
          <el-button size="large" :disabled="!cartList.length" @click="clear" type="primary"
            >清空购物车</el-button
          >
        </div>
        <div class="total">
          <el-button size="large" :disabled="!cartList.length" type="primary" @click="addOrder"
            >下单结算</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.McDL-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: red;
    }

    .McDL-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    > div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .McDL-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }
}
</style>
