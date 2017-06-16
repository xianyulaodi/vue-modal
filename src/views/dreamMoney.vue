<template>
  <div>
    <c-header :head-data="headData"></c-header>
    <div class="content">
        <ul class="tab-ctrl">
          <li>单价最低</li>
          <li>价格</li>
        </ul>
        <price-item :item-list="priceList"></price-item>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import cHeader from '../components/header.vue';
  import priceItem from '../components/priceItem.vue';

  export default {
    data(){
      return {
        headData:{
          title: '梦幻币',
          hasReturn:true        
        },
        priceList:[
          {
            picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492064565&di=5f1ba89cedac5a5798936f1783601b72&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.guopan.cn%2Fupload%2Fpicture%2F2016-08-11%2Ficon.png',
            num:3000,
            totalPrice:233,
            price:0.0780
          },
          {
            picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492064565&di=5f1ba89cedac5a5798936f1783601b72&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.guopan.cn%2Fupload%2Fpicture%2F2016-08-11%2Ficon.png',
            num:3000,
            totalPrice:233,
            price:0.0780
          }      
        ]
      }
    },
    methods: {

    },
    mounted() {

    },
    components:{cHeader,priceItem}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
$view:64;
@function rem($px){
    @return $px / 64  * 1rem; 
}
body{
  background: #f5f5f5;
}
.content{
  position: absolute;
  top: rem(114);
  left: 0;
  right: 0;
  overflow-y: auto;
  background: #ebebeb;
}
.tab-ctrl{
  height: rem(50);
  background: #fff;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: rem(24);
  li{
    text-align: center;
    flex: 1;
    color: #333;
    font-size: rem(24);
    line-height: rem(50);
  }
}
</style>