/**  readme.md Start 
# 使用说明

1. 引入modal组件，例如
`  import vModal from '../components/modal.vue'`

2. 在组件中的使用方法

### 基本使用

```javascript
<v-modal 
  v-model="popupVisible" 
  position="top" >
</v-modal>  
<button @click="modalFn()" >弹窗按钮</button>
```    
如果`v-modal`里面加入其它内容，则新内容覆盖掉默认的内容，从而可以自定义弹窗组件，例如
```javascript
<v-modal 
  v-model="popupVisible" 
  position="top" >
  这里是新增加的内容，会覆盖掉默认样式， 可自定义样式
</v-modal> 
```

负责弹窗的开关在v-model的参数里，data要给个默认值
```javascript
export default {
	data() {

		return {
			popupVisible:false
		}
	},
	methods: {
		modalFn() {
			this.popupVisible = true;
		}
	}
}
```


### 有两个或以上的弹窗，方法和基本使用方法一样
```javascript
<button @click="modalFn1()" >弹窗按钮1</button>
//第一个弹窗
<c-modal 
  v-model="popupVisible" 
  position="top">
  <button @click="modalFn2()" >弹窗按钮2</button>
</c-modal>
// 第二个弹窗
<c-modal v-model="popupVisible2" 
  position="top"
  vTitle ="弹窗2的标题" >
</c-modal>      

export default {
	data() {

		return {
			popupVisible:false
			popupVisible2:false
		}
	},
	methods: {
		modalFn1() {
			this.popupVisible = true;
		}
		modalFn2() {
			this.popupVisible2 = true;
		}		
	}
}
```

3. 参数说明
`position`  		可选  top,right,center,top
`vTitle`    		可选  {String}  弹窗标题  
`vContent`  		可选  {String}  弹窗内容  
`vTitle`    		可选  {String}  弹窗标题  
`closeOnClickModal` 可选 {Boolean}  true为点击遮罩层可关闭弹窗，false为不可，默然为true


4. todoList
 (1). 假如对动画的支持，可自定义弹窗的动画
 (2). 可自定义弹窗的class
 
readme.md  End **/



<template>
  <transition :name="currentTransition">
    <div v-show="currentValue" class="mint-popup" :class="[position ? 'mint-popup-' + position : '']">
      <slot>
           <h1 class="modal-title">{{vTitle}}</h1>
           <div class="modal-content">{{vContent}}</div>
           <div class="modal-bottom">
           		<a href="javascript:void(0);" ref="closeprop" @click="close();">关闭</a>
           		<a href="javascript:void(0);"  @click="BtnCallback();">确定</a>
           </div>
      </slot>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';
let idSeed = 1;
let zIndex = 999;
export default {
    name: 'yys-popup',

    // 父组件可以传递的值
    props: {

    	vTitle:{
    		type:String,
    		default: '标题'
    	},
    	vContent: {
    		default: '内容'
    	},
		value: {
	      type: Boolean,
	      default: false
	    },
	    // transition: {
	    //   type: String,
	    //   default: ''
	    // },
	    closeOnClickModal: {  // 是否点击layout层关闭
	        default: true  
	    },
	    popupTransition: {
	        type: String,
	        default: 'popup-slide'
	    },
	    position: {
	        type: String,
	        default: ''
	    },
	    BtnCallback: {
	    	type: Function,
	    	default:function() {
	    		this.close();
	    	}
	    }  	
    },

    data() {
      return {
        currentValue: false,
        currentTransition: this.popupTransition,
        instances: {},
        zIndex: 2000,
        modalStack: []
      };
    },

    watch: {
	    /**
	    * v-model官方给出的说发是：这其实是一个简写的形式，v-model实际执行的是下面的绑定：
		* <input type="text" v-bind:value="dataA" v-on:input="dataA = $event.target.value" />
		* v-model是动态绑定值到value，然后监听input的inpit事件获取值后赋给dataA的一个过程。
		**/
        value(val) {
			if (val) {
		        this.open();
		    } else {
		        this.close();
		    }  
            this.currentValue = val;
        }
    },

    beforeMount() {
		// 渲染之前，创建modal实体,实体内容的id以 popup-1累加的形式
    	this._popupId = 'popup-' + idSeed++;
    	this.register(this._popupId, this); 
	    if (this.popupTransition !== 'popup-fade') {  //弹出的动画，可自定义
	        this.currentTransition = `popup-slide-${ this.position }`;
	    }
    },

	beforeDestroy() {
	    this.destoryRegister(this._popupId);
	}, 

	methods: {

	    open() {

		    const modalDom = this.$el;          // 弹窗内容
			const layoutDom = this.getLayout(); // 遮罩层
			this.addClass(layoutDom, 'vm-modal');
			layoutDom.style.zIndex = this.nextZIndex();
			document.body.appendChild(layoutDom);
			this.modalStack.push({ id: this._popupId });	      
		    modalDom.style.zIndex = this.nextZIndex();
		    this.$emit('input', true);
	    },

	    close() {

	        this.$emit('input', false);
	        var id = this._popupId;
			const modalStack = this.modalStack;
		    const layoutDom = this.getLayout();
		    if (modalStack.length > 0) {
		        const topItem = modalStack[modalStack.length - 1];
		        if (topItem.id === id) {
			        modalStack.pop();
		        } 
		    }
		    // 删掉layout
		    if (modalStack.length === 0) {
		        setTimeout(() => {
			        if (layoutDom.parentNode) { 
			        	layoutDom.parentNode.removeChild(layoutDom); 
			        }
			        layoutDom.style.display = 'none';
			        this.layoutDom = null;
			    }, 200);
		    }	        
	    },

	    // 获取遮罩层div，没有则创造一个
	    getLayout() {
    	    let layoutDom = this.layoutDom;
		    if (!layoutDom) {
		    	layoutDom = document.createElement('div');
		    	this.layoutDom = layoutDom;
		    	layoutDom.addEventListener('touchmove', function(event) {
			        event.preventDefault();
			        event.stopPropagation();
			    });
			    var that = this;
			    layoutDom.addEventListener('click', function() {
			        that.doOnLayoutClick();
			    },false);
		    }
		    return layoutDom;	
	    },

	    // 获取某一个modal实体
	    getInstance(id) {
		    return this.instances[id];
		},

		// 注册modal实体
		register(id, instance) {
		    if (id && instance) {
		      this.instances[id] = instance;
		    }
		},	

		// 从对象中删掉modal实体
		destoryRegister(id) {
		    if (id) {
		      this.instances[id] = null;
		      delete this.instances[id];
		    }
		},

		// z-index管理，modal始终比layout大1，弹窗中弹窗始终比上一个弹窗大1	
		nextZIndex() {
		    return zIndex++;
		},

		// 遮罩层点击
		doOnLayoutClick() {
		    const topItem = this.modalStack[this.modalStack.length - 1];  //topItem = { id: id }
		    if (!topItem) return;
		    const instance = this.getInstance(topItem.id);
		    if (instance && instance.closeOnClickModal) {
		       instance.close();
		    }
		},	

	    addClass(el, cls) {
			if (!el) return;
		    var curClass = el.className;
		    var classes = (cls || '').split(' ');
		    for (var i = 0, j = classes.length; i < j; i++) {
			    var clsName = classes[i];
			    if (!clsName) continue;
			    if (el.classList) {
			        el.classList.add(clsName);
			    } else {
				    if (!hasClass(el, clsName)) {
				        curClass += ' ' + clsName;
				    }
				}
		 	}
			if (!el.classList) {
			    el.className = curClass;
			}	    	
	    },
	    removeClass(el,cls) {
			if (!el || !cls) return;
			var classes = cls.split(' ');
			var curClass = ' ' + el.className + ' ';
		    for (var i = 0, j = classes.length; i < j; i++) {
			    var clsName = classes[i];
			    if (!clsName) continue;
			    if (el.classList) {
			        el.classList.remove(clsName);
			    } else {
			        if (hasClass(el, clsName)) {
			            curClass = curClass.replace(' ' + clsName + ' ', ' ');
			        }
		        }
			}
			if (!el.classList) {
			    el.className = trim(curClass);
			}	    		
	    }    
	 },	 

    mounted() {
      // if (this.value) {
      //   this.rendered = true;
      //   this.currentValue = true;
      //   this.open();
      // }
    }

  };
</script>

<style lang="scss" rel="stylesheet/scss">
$view:64;
@function rem($px){
    @return $px / 64  * 1rem;
}
.mint-popup {
  position: fixed;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  transition: .2s ease-out;
  width: rem(480);
  border-radius: 5px;
  color:#333;
}
.modal-title {
	font-size: rem(24);
	padding: rem(20);
	border-bottom: 1px solid #ccc;
	text-align: center;
}
.modal-content {
	padding:rem(20);
	font-size: rem(28);
	text-align: left;
	border-bottom: 1px solid #ccc;
}
.modal-bottom {
	display: flex;
	a {
		flex: 1;
		color: #ccc;
		text-align: center;
		padding: rem(10);
		font-size: rem(24);
	}
}
.mint-popup-top {
    top: 0;
    right: auto;
    bottom: auto;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
}

.mint-popup-right {
    top: 50%;
    right: 0;
    bottom: auto;
    left: auto;
    transform: translate3d(0, -50%, 0);
}

.mint-popup-bottom {
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
}

.mint-popup-left {
    top: 50%;
    right: auto;
    bottom: auto;
    left: 0;
    transform: translate3d(0, -50%, 0);
}



.popup-slide-top-enter,
.popup-slide-top-leave-active {
	transform: translate3d(-50%, -100%, 0);
}

.popup-slide-right-enter,
.popup-slide-right-leave-active {
	transform: translate3d(100%, -50%, 0);
}

.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
	transform: translate3d(-50%, 100%, 0);
}

.popup-slide-left-enter,
.popup-slide-left-leave-active {
	transform: translate3d(-100%, -50%, 0);
}

.popup-fade-enter,
.popup-fade-leave-active {
	opacity: 0;
}

.vm-modal-enter {
  animation: vm-modal-in .2s ease;
}

.vm-modal-leave {
  animation: vm-modal-out .2s ease forwards;
}

@keyframes vm-modal-in {
  0% {
    opacity: 0;
  }
  100% {
  }
}

@keyframes vm-modal-out {
  0% {
  }
  100% {
    opacity: 0;
  }
}

.vm-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
</style>

