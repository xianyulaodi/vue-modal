<template>
  <div>
    <c-header :head-data="headData"></c-header>
    <div class="content">
      <!-- swiper -->
      <mt-swipe :auto="5000">
        <mt-swipe-item></mt-swipe-item>
        <mt-swipe-item></mt-swipe-item>
        <mt-swipe-item></mt-swipe-item>
      </mt-swipe>
      <!-- swiper end -->
      <button @click="modalFn()" >弹窗按钮</button>
      <c-modal 
          v-model="popupVisible" 
          position="top">
          <button @click="modalFn2()" >弹窗按钮22</button>
          <button @click="closeModal()" >关闭弹窗</button>
      </c-modal>
      <c-modal v-model="popupVisible2" 
          position="left"
          vTitle ="弹窗标题" >
      </c-modal>      
      <!-- 浏览全部角色 -->
      <section class="all-nav">
        <a class="all-nav-btn" href="#">浏览全部角色</a>
      </section>
      <!-- 浏览全部角色 end-->
      <ul class="hot-list">
        <li class="list-item" v-for="item in hotList">
          <h2 class="p-name">{{item.name}}</h2>
          <div class="item-bottom">
            <span class="remark">{{item.remark}}</span>
            <p class="p-img">
              <img :src="item.picUrl"" alt="" />
            </p>
          </div>
        </li>   
      </ul>
      <product-list :item-list="indexData"></product-list>
    </div>
    <c-footer></c-footer>
  </div>
</template>


<script>
  import Vue from 'vue';
  import cHeader from '../components/header.vue';
  import cFooter from '../components/footer.vue';
  import cModal from '../components/modal.vue';
  import productList from '../components/productList.vue';
  import * as types from '../constants/constants';
  import {  Swipe, SwipeItem,Button } from 'mint-ui';
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Button.name, Button);

  export default {
    data () {
      return {
        popupVisible:false,
        popupVisible2:false,
        headData: {
          left:{
            hasReturn:false,
          },
          center: {
            text:'阴阳师藏宝阁'
          },
          right:{
            icon1:'../assets/images/logo.png',
            icon2:'./image/icon2.png'
          },          
          title: '阴阳师藏宝阁',
        },     
        tabs:[
          {'tabName':'梦幻币',router:'money'},
          {'tabName':'角色',router:'all'},
          {'tabName':'召唤币',router:'all'},
          {'tabName':'道具',router:'all'},
          {'tabName':'灵饰',router:'all'},
          {'tabName':'我的收藏',router:'all'},
          {'tabName':'公示期',router:'all'},
          {'tabName':'我的出售',router:'all'}
        ],
        indexData:[
          {
            picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg',
            name:'魏武清虹',
            address:'夏之禅',
            property1:'六星式神：3 五星式神：8',
            property2:'六星式神：4 五星式神：8',
            rank:60,
            price:6000,
            des:['一速256','二速58'],
            saveNum:15,
            id:9090101

          },
          {
            picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg',
            name:'魏武清虹',
            rank:80,
            address:'夏之禅',
            property1:'六星式神：3 五星式神：8',
            property2:'六星式神：4 五星式神：8',
            price:6000,
            des:['一速589','一速789'],
            saveNum:15,
            id:9090102

          }
        ],
        hotList:[
          {
            picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg',
            name:'式神一速250+',
            remark:'快的就是好的'
          },
          {
            picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg',
            name:'60成品号',
            remark:'斗技稳定3300'
          },   
          {
            picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg',
            name:'高爆伤六星茨木',
            remark:'最爱一拳超人'
          },  
          {
            picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491399938046&di=cc8095b2a645f45af9f08621af559750&imgtype=0&src=http%3A%2F%2Fcottage.netease.com%2Fgift%2F256%2F2%2F3916.jpeg',
            name:'颜值即正义',
            remark:'皮肤控福音'
          }                         
        ]
      }
    },
    methods: {

      // 路由跳转，坑点：从上一个路由回来，会重新刷新一次页面
      routerFn(routerName) {
        this.$router.push({ path: routerName })
      },
      modalFn() {
        this.popupVisible = true;
      },
      modalFn2() {
        this.popupVisible2 = true;
      },
      closeModal() {
        this.popupVisible = false;
      }      
    },
    mounted () {

    },

    components: {cHeader,productList,cFooter,cModal}
  }

</script>

<style lang="scss" rel="stylesheet/scss">
$view:64;
@function rem($px){
    @return $px / 64  * 1rem;
}
body{
  background: #f8f8f8;
  width: 100%;
  overflow: hidden;
}
.content{
  position: absolute;
  top: rem(114);
  bottom: rem(104);
  left: 0;
  right: 0;
  overflow-y: auto;
}
body .mint-swipe{
  height: rem(217);
}
.mint-swipe-item{
  background: #51b8e5;
  &:nth-child(2){
    background:orange;
  };
  &:nth-child(3){
    background:#7487ee;
  };
}
.index-navigation{
  padding-bottom: rem(40);
  background: #fff;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  li{
    font-size: rem(24);
    float: left;
    width: 25%;
    text-align: center;
    margin-top: rem(40);
  }
  .icon{
    width: rem(80);
    height: rem(80);
    border-radius: 100%;
    background: #fd8a1d;
    color: #3f3f3f;
    margin-bottom:rem(20) ;
  }
}
.tips{
  height: rem(83);
  line-height: rem(89);
  font-size: rem(28);
  color: #323232;
  text-align: left;
  position: relative;
  padding-left: rem(120);
  &:before{
    content:'动态';
    padding: 0 rem(15);
    position: absolute;
    left:rem(30);
    top: rem(25);
    height:rem(36);
    line-height: rem(36);
    border: 1px solid #dcae80;
    color: #dcae80;
    font-size: rem(24);

  };
}
.ad-list{
  display: flex;
  li{
    flex: 1;
    height: rem(165);
    overflow: hidden;
    &:nth-child(1){
      padding-right:rem(2);
    };
    &:nth-child(2){
      padding-left:rem(2);
    };
    img{
      width: 100%;
      height: auto;
    }
  }
}

.all-nav {
  background: #c0c6d3;
  padding: rem(20);
  .all-nav-btn{
    color: #fff;
    font-size: rem(32);
    position: relative;
    text-align: center;
    background: #949ba9;
    border-radius: 5px;
    display: block;
    padding: rem(15);
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

.hot-list {
  display: flex;
  background: #dcdcdc;
  flex-wrap: wrap; 
  margin-bottom: rem(30);
  .list-item {
    width: 50%;
    box-sizing: border-box;
    padding: rem(20) rem(40) rem(20) rem(20);
    border-top: none;
    &:nth-child(odd) {
      border-right : 1px solid #d1d3d8;
    };
    &:nth-child(1),
    &:nth-child(2) {
      border-bottom : 1px solid #d1d3d8;
    };
  }
  .p-name {
    color: #333;
    font-size: rem(32);
  }
  .remark {
    font-size: rem(24);
    color: #333;
  }
  .p-img {
     width: rem(72);
     height: rem(72);
     margin-top: rem(20);
     overflow: hidden;
     border-radius: 100%;
     float: right;
     border: 1px solid #ccc;
  }
  img {
     width: auto;
     height: 100%;
     margin-left: -5px;
  }  

}


</style>