<template>
	<div class="temp-product-list">
	  	<div class="list-item" v-for="item in itemList" @click="routerFn(item.id)" >
	        <div class="item-left">
	            <ul class="img-list">
	              <!-- 注意：图片的渲染和普通渲染不一样 -->
	              <li>
	              	<img :src="item.picUrl" alt=""> 
	              </li>
				  <li>
	              	<img :src="item.picUrl" alt=""> 
	              </li>   
				  <li>
	              	<img :src="item.picUrl" alt=""> 
	              </li>
				  <li>
	              	<img :src="item.picUrl" alt=""> 
	              </li>                          
	            </ul>          
	        </div>
	        <div class="item-right">
	          <h3 class="item-title">
	            {{item.rank}}级
	            <span class="item-address">{{item.address}}</span>
	          </h3>
	          <p class="item-property">
	            <span class="item-price">￥{{item.price}}</span>
	            {{item.property1}} <br>
	            {{item.property2}}
	          </p>
	          <div class="item-des-list">
	            <span class="item-des" v-for="list in item.des">{{list}}</span>
	            <!-- <span class="item-savenum">{{item.saveNum}}人收藏</span> -->
	          </div>
	        </div>
	    </div>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	props: ['itemList'],
	data () {
		return {
			headData:{
	          title: '梦幻藏宝阁',
	          hasReturn:false
	        }		
		}
	},
	methods: {
	     //从上一个路由回来，会重新刷新一次页面
	     routerFn(id) {
	        this.$router.push({ path: '/detail/'+id+'' });
	    }
	},  
	mounted: function () {

	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@function rem($px){
    @return $px / 64  * 1rem; 
}
.temp-product-list {
	.list-item{
	  background: #dcdcdc;
	  border-top: 1px solid #ccc;
	  padding: 0 rem(12);
	  overflow: hidden;
	  padding: rem(30) 0;
	  .item-left{
	    box-sizing: border-box;
	    padding-left:rem(10) ;
	  }
	  .img-list{
	  	width: rem(140);
	  	float: left;
	  	flex-wrap: wrap;
	  	display: flex;
	  	li{
 			width: rem(44);
	    	height: rem(44);
	    	margin: 0 rem(10) rem(20) 0;
			overflow: hidden;
	    	border: 1px solid #ad8f46;	  
	    	border-radius: 100%;  		  		
	  	}
		img{
	      width:auto;
	      height: 100%;
	      margin-left: rem(-5);
	    }	  	
	  }
	  .item-right{
	    flex: 1;
	    padding-right:rem(30) ;
	    color: #949494;
	    text-align: left;
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
	      color: #333;
	    }
	    .item-price{
	      color: #ef3334;
	      font-weight: 600;
	    }
	    .item-des{
	      font-size: rem(24);
	      color: #333;
	      background: #fff;
	      padding: rem(2) rem(4);
	      margin-right: rem(10);
	      display: inline-block;
	      border-radius: 8px;
	    }

	  }
	}
}
</style>
