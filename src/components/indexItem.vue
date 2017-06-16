<template>
  <div>
  	<div class="list-item" v-for="item in itemList">
        <div class="item-left">
            <p class="img-wrap">
              <!-- 注意：图片的渲染和普通渲染不一样 -->
              <img :src="item.picUrl" alt=""> 
            </p>          
        </div>
        <div class="item-right">
          <h3 class="item-title">
            {{item.name}}
            <span class="item-address">{{item.address}}</span>
          </h3>
          <p class="item-property">
            {{item.property}}
            <span class="item-price">￥{{item.price}}</span>
          </p>
          <div class="item-des-list">
            <span class="item-des" v-for="list in item.des">{{list}}</span>
            <span class="item-savenum">{{item.saveNum}}人收藏</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['itemList'],
  mounted: function () {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@function rem($px){
    @return $px / 64  * 1rem; 
}
.list-item{
  background: #fff;
  border-top: 1px solid #ccc;
  padding: 0 rem(32);
  overflow: hidden;
  padding: rem(30) 0;
  .item-left{
    width: 28%;
    float: left;
    box-sizing: border-box;
    padding-left:rem(30) ;
  }
  .img-wrap{
    width: rem(125);
    height: rem(125);
    overflow: hidden;
    border: 1px solid #ad8f46;
    border-radius: 5px;
    img{
      width:auto;
      height: 100%;
      margin-left: rem(-16);
    }
  }
  .item-right{
    width: 72%;
    padding-right:rem(30) ;
    float: right;
    color: #949494;
    text-align: left;
    box-sizing: border-box;
    .item-title{
      font-size: rem(32);
      color: #333;
      padding-bottom: rem(10);
    }
    .item-address,
    .item-price,
    .item-savenum{
      display: inline-block;
      float: right;
      font-size: rem(24);      
    }
    .item-savenum{
      padding-top: rem(22);
    }
    .item-property{
      font-size: rem(24);
    }
    .item-price{
      color: #ef3334;
      font-weight: 600;
    }
    .item-des{
      font-size: rem(24);
      color: #474747;
      background: #e7e7e7;
      padding: rem(2) rem(4);
      margin-right: rem(10);
      display: inline-block;
      border-radius: 3px;
    }

  }
}
</style>
