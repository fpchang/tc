<template>
  <view class="content">
    <scroll-view overflow-x="false" overflow-y="true">
      <xt-panal-list :count="menuList.length">
        <!-- #ifdef MP -->
        <view v-for="item of menuList" slot="card{{index}}">
          <text>{{ item.title }}</text>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 || APP-PLUS -->
        <template v-for="(item, index) of menuList" v-slot:[`card${index}`]>
          <view class="h">{{ item.title }}</view>
          <view class="li">
            <view class="menu-list">
              <view v-for="it of item.list">
                <navigator :url="it.href" hover-class="navigator-hover">
                  <view class="menu-item">
                    <text class="tx"
                      ><l-icon :name="it.icon" size="30px" color="#a1a1a1"
                    /></text>
                    <text class="tx">{{ it.title }}</text>
                  </view>
                </navigator>
              </view>
            </view>
          </view>
        </template>
        <!-- #endif -->
      </xt-panal-list>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const menuList: Object = [
      {
        title: "计算",
        list: [
          {
            title: "显示器PPI计算",
            icon: "bi:display-fill",
            href: "/pages/ppi/ppi",
          },
          {
            title: "投影投射比",
            icon: "solar:projector-bold-duotone",
            href: "/pages/projectiveRatio/projectiveRatio",
          },
		  {
		    title: "双色球计算",
		    icon: "solar:projector-bold-duotone",
		    href: "/pages/doubleColorBall/doubleColorBall",
		  }
        ],
      },
      {
        title: "记账",
        list: [
          {
            title: "旅游消费统计",
            icon: "material-symbols:account-balance-wallet",
            href: "/pages/travelExpense/travelExpense",
          },
        ],
      },
    ];

    return { menuList };
  },
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {
    console.log(11111, getApp().globalData);
  },
  methods: {},
};
</script>

<style lang="scss">
.h {
  font-size: 35px;
  padding: 10px 20px;
}

.menu-list {
  display: flex;
  gap: 10px;

  .menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 10px;

    .tx {
      text-align: center;
      font-size: 14px;
      color: #a1a1a1;
    }
  }
}
</style>
