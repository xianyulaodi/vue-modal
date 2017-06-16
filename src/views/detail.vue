<template>
  <div class="view-detail">
      <c-header :head-data="headData"></c-header>
      <div class="content">
        <div class="head">
          <p>
            <span>夏之蝉</span>
            <span>2人收藏</span>               
          </p>
        </div>
        <div class="product-info">
            <div class="product-top">
                <span class="rank">60级</span>
                <ul class="img-list">
                  <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg" alt=""></li>
                  <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg" alt=""></li>
                  <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg" alt=""></li>
                  <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg" alt=""></li>
                </ul>
                <span class="price">￥ 998.00</span>
            </div>
            <div class="product-property">
              <p>六神式神：3  五星式神：8</p>
              <p>六神式神：3  五星式神：8</p>
            </div>
            <div class="product-desc">
              <span class="item-desc">一速256</span>
            </div>
        </div>
        <ul class="product-status">
          <li>卖家ID: 95654</li>
          <li>状态： 上架中</li>
          <li>剩余： 12天23小时35分钟</li>
        </ul>
        <div class="product-info-more">
          <a class="more-btn" href="#">角色属性</a>
          <a class="more-btn" href="#">阴阳术</a>
          <a class="more-btn" href="#">式神</a>
          <a class="more-btn" href="#">式神碎片</a>
        </div>
      </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import cHeader from '../components/header.vue';
  export default {
    data () {
      return {
        headData: {
          left:{
            hasReturn:true,
          },
          center: {
            text:'商品详情'
          },
          // right:{
          //   text:'编辑',
          //   icon1:'./image/icon1.png',
          //   icon2:'./image/icon2.png'
          // },          
          title: '梦幻藏宝阁',
        }
      }
    },
    methods: {

    },
    mounted() {
      var id = this.$route.params.id;
      console.log(id);
    },
    components:{cHeader}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
@function rem($px) {
  @return $px / 64 * 1rem;
}
.view-detail {
  .head {
    padding: rem(20) rem(20) 0 rem(20);
    font-size: rem(24);
    background: #dcdcdc;
    p {
      border-bottom: 1px solid #ccc;
      padding-bottom: rem(20);
    }
  }
  .product-info {
    padding: rem(20);
    background: #dcdcdc;
  }
  .product-top {
    overflow: hidden;
    margin-bottom: rem(10);
  }
  .rank {
    font-size: rem(24);
    color: #333;
    float: left;
    line-height: rem(44);
  } 
  .img-list {
    overflow: hidden;
    float: left;
    li{
      width: rem(44);
      height: rem(44);
      float: left;
      overflow: hidden;
      border: 1px solid #ad8f46;    
      border-radius: 100%;  
      margin-left: rem(10);          
    } 
    img{
      width:auto;
      height: 100%;
      margin-left: rem(-5);
    }           
  } 
  .price {
    float: right;
    font-size: rem(32);
    color: #333;
    line-height: rem(44);
  }
  .product-property {
    font-size: rem(24);
    color: #333;
    padding-bottom: rem(10);
    border-bottom: 1px solid #ccc;
  }
  .item-desc{
    font-size: rem(24);
    color: #333;
    background: #fff;
    padding: rem(2) rem(8);
    margin-right: rem(10);
    display: inline-block;
    border-radius: 8px;
  } 
  .product-status {
    padding: rem(20);
    font-size: rem(24);
    color: #333;
    text-align: left;
    margin-top: rem(20);
    background: #dcdcdc;
  } 

  .more-btn {
    background: #c0c6d3;
    padding: rem(20);
    color: #fff;
    margin: rem(10) rem(20) 0;
    font-size: rem(32);
    position: relative;
    text-align: left;
    background: #949ba9;
    border-radius: 5px;
    display: block;
    padding: rem(15) rem(15) rem(15) rem(60);
    &:before {
      content:'';
      display: block;
      position: absolute;
      width: rem(34);
      height: rem(34);
      left: rem(10);
      top: rem(20);
      background: #c0c6d3;
    };
    &:after {
      content:'';
      display: block;
      position: absolute;
      width: rem(34);
      height: rem(34);
      right: rem(10);
      top: rem(20);
      background: red;
    };

  }

}

</style>