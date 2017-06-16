<template>
	<div>
		<footer class="g-footer">
			<ul class="g-nav">
	           <li v-for="item in tabs" @click="routerFn(item.routerName)">
           	    	<i class="icon"></i>
           	    	<span>{{item.tabName}}</span>
	           </li>
        	</ul>			
		</footer>
	</div>
</template>

<script>
	export default {
		data () {
	      return {
	        tabs:[
	          {'tabName':'首页',routerName:'index'},
	          {'tabName':'订单',routerName:'search'},
	          {'tabName':'我的',routerName:'my'}
	        ]
	      }
	    },		
	    methods: {
		    routerFn (routerName) {
			    this.$route.router.go({path: routerName})
			}
	   }
	 }
</script>

<style lang="scss" rel="stylesheet/scss">
$view:64;
@function rem($px){
    @return $px / 64  * 1rem; 
}
.g-footer{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: rem(104);
	background: #fff;
	font-size: rem(24);
	color: #333;
	text-align: center;
	padding: rem(15) 0;
	box-sizing: border-box;
	border-top: 1px solid #ccc;
	.g-nav{
		width: 100%;
		display: flex;
	}
}
.g-nav li{
	flex: 1;
	height: 100%;
	box-sizing: border-box;
	.icon{
		width: rem(50);
		height: rem(50);
		display: block;
		margin: 0 auto;
		background:#545454 ;		
	}
}

</style>