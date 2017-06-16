<!-- 
公共头部有几种形式
1. 左边返回按钮，中间是文字，右边无
2. 左边返回按钮，中间是搜索框，右边是其他图标
3. 左边返回按钮，中间是文字，右边是其他图标
4. 左边图标，中间空 ，右边是图标 

传值的形式：
headData:{
	left:{
		hasRetur:true,
	}
	center: {
		text:'xxx'
	}
	right:{
		text:'xx',
		icon1:'./image/icon1.png',
		icon2:'./image/icon2.png'
	}
}
-->
<template>
	<div class="temp-header">
		<header class="g-header" :class="headData.left.hasReturn ? 'hasReturn' : '' " >
			<div class="g-header-l">
				<span class="return-btn" v-if="headData.left.hasReturn" @click="historyGo()" >返回</span>
			</div>
			<div class="g-header-c">
				<span v-if="headData.center">{{headData.center.text}}</span>
			</div>
			<div class="g-header-r">
				<div  v-if="headData.right">	
					<a href="#" class="right-text" v-if="headData.right.text">{{headData.right.text}}</a>
				    <a href="#" class="icon1" v-if="headData.right.icon1"><img :src="headData.right.icon1" alt=""></a>
				    <a href="#" class="icon2" v-if="headData.right.icon2"><img :src="headData.right.icon2" alt=""></a>						
				</div>
			</div>
		</header>
	</div>
</template>

<script>
	// import $base from 'components/base';
	export default {
	    props:{
	   	  headData:Object  //也可以是空值
	    },
	    methods: {
		    //@设置App头部
		    setAppHeader(){
		       document.title = this.headData.title;
		    },
		    historyGo() {
		       this.$router.go(-1);
		    }
	    },
	    mounted: function () {
	       this.setAppHeader();
	    }
	 }
</script>

<style lang="scss" rel="stylesheet/scss">
$view:64;
@function rem($px){
    @return $px / 64  * 1rem;
}
.temp-header {
	.g-header{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: rem(114);
		display: flex;
		background: red;
		font-size: rem(24);
		color: #fff;
		text-align: center;
		box-sizing: border-box;
		align-items: center;
		.g-header-l,
		.g-header-r{
			flex: 1;
		}
		.g-header-c{
			flex: 2;
		}
	}
	.g-header-l {
		text-align: left;
		padding-left: rem(20);
	}
	.g-header-r {
		text-align: right;
		padding-right: rem(20);
		.right-text{
			color: #fff;
			display: inline-block;
		}
		img {
			width: 100%;
			height: auto;
		}
	}
	.icon1,
	.icon2 {
		width: rem(30);
		height: rem(30);
	    display: inline-block;
	    background: blue;
	    vertical-align: middle;
	    margin-left: 5px;
	    overflow: hidden;
	}
	.return-btn {
		display: block;
	}
}


</style>
