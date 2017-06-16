<template>
  <transition :name="currentTransition">
    <div v-show="currentValue" class="mint-popup" :class="[position ? 'mint-popup-' + position : '']">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  // import this from '../popup/layout-manager';
 
  let idSeed = 1;
  export default {
    name: 'yys-popup',
    // 父组件可以传递的值
    props: {
		value: {
	      type: Boolean,
	      default: false
	    },
	    transition: {
	      type: String,
	      default: ''
	    },
	    // zIndex: {},
	    modalClass: {},
	    modal: {
	      	type: Boolean,
	        default: true
	    },
	    modalFade: {
	      	type: Boolean,
	        default: false
	    },
	    closeOnClickModal: {
	        default: true
	    },
	    popupTransition: {
	        type: String,
	        default: 'popup-slide'
	    },
	    position: {
	        type: String,
	        default: ''
	    }  	
    },

    data() {
      return {
        currentValue: false,
        currentTransition: this.popupTransition,
        opened: false,
        rendered: false,
        hasModal: false,
        instances: {},
        zIndex: 2000,
        layoutStack: [],
  		// modalFade: true,
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
		        if (this._opening) return; 
		        // 弹窗只会渲染一次
		        if (!this.rendered) {
		          this.rendered = true;
		          // Vue.nextTick  在修改数据之后立即使用这个方法，获取更新后的 DOM。
		          Vue.nextTick(() => {
		            this.open();
		          });
		        } else {
		          this.open();
		        }
		    } else {
		        this.close();
		    }      	
            this.currentValue = val;
        }
    },

    beforeMount() {
		// 渲染之前，创建遮罩层,遮罩层id以 popup-1累加的形式
    	this._popupId = 'popup-' + idSeed++;
    	this.register(this._popupId, this);      
	    if (this.popupTransition !== 'popup-fade') {
	        this.currentTransition = `popup-slide-${ this.position }`;
	    }
    },

	beforeDestroy() {
	    this.destoryRegister(this._popupId);
	    this.closeModal(this._popupId);
	}, 

	methods: {

	    open() {
	      if (!this.rendered) {
	        this.rendered = true;
	        this.$emit('input', true);  //传递给父组件,跟v-model通信
	      }
	      const props = this.merge({}, this, this.$props);
	      this.$emit('input', true);
	      const dom = this.$el; 
	      const modal = props.modal;
	      if (modal) {
	         this.openModal(this._popupId, this.nextZIndex(), dom, props.modalClass, props.modalFade);
	      }
	      dom.style.zIndex = this.nextZIndex();
	      this.opened = true;
	    },

	    close() {

	      this.$emit('input', false);
	      this.opened = false;
	      this.closeModal(this._popupId);
	    },

	    // 将参数对象化
	    merge(target) {
	        for (let i = 1, j = arguments.length; i < j; i++) {
	          let source = arguments[i] || {};
	          for (let prop in source) {
	            if (source.hasOwnProperty(prop)) {
	              let value = source[prop];
	              if (value !== undefined) {
	                target[prop] = value;
	              }
	            }
	          }
	        }
	        return target;
	    },

	    // 获取遮罩层，没有则创造一个
	    getLayout() {

    	  let modalDom = this.modalDom;
		  if (modalDom) {

		    this.hasModal = true;

		  } else {

		    this.hasModal = false;
		    modalDom = document.createElement('div');
		    this.modalDom = modalDom;
		    modalDom.addEventListener('touchmove', function(event) {
		      event.preventDefault();
		      event.stopPropagation();
		    });
		    // 遮罩层的点击
		    var that = this;
		    modalDom.addEventListener('click', function() {
		        that.doOnModalClick();
		    },false);
		  }
		  return modalDom;	
	    },

	    // 获取某一个遮罩层，如果有多个的话
	    getInstance(id) {
		    return this.instances[id];
		},

		// 将遮罩层存入数组
		register(id, instance) {
		    if (id && instance) {
		      this.instances[id] = instance;
		    }
		},	

		// 销毁遮罩层 by id
		destoryRegister(id) {
		    if (id) {
		      this.instances[id] = null;
		      delete this.instances[id];
		    }
		},

		// z-index管理	
		nextZIndex() {
		    return this.zIndex++;
		},

		// 遮罩层点击
		doOnModalClick() {
		    const topItem = this.layoutStack[this.layoutStack.length - 1];  //topItem = { id: id, zIndex: zIndex, modalClass: modalClass }
		    if (!topItem) return;
		    const instance = this.getInstance(topItem.id);
		    if (instance && instance.closeOnClickModal) {
		      instance.close();
		    }
		},	
		openModal: function(id, zIndex, dom, modalClass, modalFade) {
		    if (!id || zIndex === undefined) return;
		    this.modalFade = modalFade;
		    const layoutStack = this.layoutStack;
		    for (let i = 0, j = layoutStack.length; i < j; i++) {
		      const item = layoutStack[i];
		      if (item.id === id) {
		        return;
		      }
		    }
		    const modalDom = this.getLayout();
		    this.addClass(modalDom, 'vm-modal');
		    if (this.modalFade && !hasModal) {
		    	this.addClass(modalDom, 'vm-modal-enter');
		    }
		    // if (modalClass) {
		    //   let classArr = modalClass.trim().split(/\s+/);
		    //   classArr.forEach(item => addClass(modalDom, item));
		    // }
		    setTimeout(() => {
		      this.removeClass(modalDom, 'vm-modal-enter');
		    }, 200);

		    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
		      dom.parentNode.appendChild(modalDom);
		    } else {
		      document.body.appendChild(modalDom);
		    }
		    if (zIndex) {
		      modalDom.style.zIndex = zIndex;
		    }
		    this.layoutStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
		},	
		closeModal: function(id) {
		    const layoutStack = this.layoutStack;
		    const modalDom = this.getLayout();

		    if (layoutStack.length > 0) {
		      const topItem = layoutStack[layoutStack.length - 1];
		      if (topItem.id === id) {
		        if (topItem.modalClass) {
		          let classArr = topItem.modalClass.trim().split(/\s+/);
		          classArr.forEach(item => this.removeClass(modalDom, item));
		        }

		        layoutStack.pop();
		        if (layoutStack.length > 0) {
		          modalDom.style.zIndex = layoutStack[layoutStack.length - 1].zIndex;
		        }
		      } else {
		        for (let i = layoutStack.length - 1; i >= 0; i--) {
		          if (layoutStack[i].id === id) {
		            layoutStack.splice(i, 1);
		            break;
		          }
		        }
		      }
		    }
		    if (layoutStack.length === 0) {
		      if (this.modalFade) {
		        addClass(modalDom, 'vm-modal-leave');
		      }
		      setTimeout(() => {
		        if (layoutStack.length === 0) {
		          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
		          modalDom.style.display = 'none';
		          this.modalDom = undefined;
		        }
		        this.removeClass(modalDom, 'vm-modal-leave');
		      }, 200);
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
    .mint-popup {
      position: fixed;
      background: #fff;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      backface-visibility: hidden;
      transition: .2s ease-out;
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

