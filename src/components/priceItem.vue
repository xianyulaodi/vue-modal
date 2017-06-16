<template>
    <div>
	    <div class="p-list-item" v-for="item in itemList">
	        <div class="p-item-left">
	            <p class="p-img-wrap">
	              <!-- 注意：图片的渲染和普通渲染不一样 -->
	              <img :src="item.picUrl" alt=""> 
	            </p>            
	        </div>
	        <div class="p-item-center">
	          <h3 class="p-item-num">
	            {{item.num}}
	          </h3>    
	          <span class="p-sigle-price">单价:{{item.price}}(元/万两)</span>      
	        </div>
	        <div class="p-item-right">
	          <span class="total-price">￥{{item.totalPrice}}</span>
	          <i class="icon-car"></i>
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
.p-list-item{
  background: #fff;
  border-bottom: 1px solid #ccc;
  padding: rem(30);
  overflow: hidden;
  .p-item-left{
    float: left;
    box-sizing: border-box;
    padding-right:rem(30) ;
  }
  .p-img-wrap{
    width: rem(125);
    height: rem(125);
    overflow: hidden;
    border: 1px solid #ad8f46;
    border-radius: 5px;
    img{
      width:auto;
      height: 100%;
    }
  }
  .p-item-center{
  	float: left;
  	font-size: rem(28);
  	color: #333;
	.p-item-num{
		font-weight: 600;
		padding-bottom: rem(20);
	}
	.p-sigle-price{
		font-size: rem(24);
		color: #6f6f6f;
	}
  }
  .p-item-right{
  	float: right;
  	color: red;
  	font-size: rem(28);
  	font-weight: 600;
  	}
  	.icon-car{
  		width: rem(30);
  		height: rem(30);
  		margin-top: rem(20);
  		background: red;
  		display: block;
  		margin-left: rem(40);
  	}

}
</style>
