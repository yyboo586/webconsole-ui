<template>
  <div class="wg-cap-btn" :style="style">
    <div class="wg-cap-btn__inner" :class="activeClass">
      <!-- wg-cap-active__default wg-cap-active__error wg-cap-active__over wg-cap-active__success -->
      <template>
        <div @click="handleBtnEvent" class="wg-cap-state__default">
          <!-- 初始状态 -->
          <div class="wg-cap-state__inner">
            <div class="wg-cap-btn__ico wg-cap-btn__verify">
              <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDIwMCAyMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwMCAyMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojM0U3Q0ZGO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMTAwIiBjeT0iMTAwIiByPSI5Ni4zIi8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNDAuOCw2NC40bC0zOS42LTExLjloLTIuNEw1OS4yLDY0LjRjLTEuNiwwLjgtMi44LDIuNC0yLjgsNHYyNC4xYzAsMjUuMywxNS44LDQ1LjksNDIuMyw1NC42CgljMC40LDAsMC44LDAuNCwxLjIsMC40YzAuNCwwLDAuOCwwLDEuMi0wLjRjMjYuNS04LjcsNDIuMy0yOC45LDQyLjMtNTQuNlY2OC4zQzE0My41LDY2LjgsMTQyLjMsNjUuMiwxNDAuOCw2NC40eiIvPgo8L3N2Zz4K">
            </div>
            <span class="wg-cap-btn__text">点击按键进行人机验证</span>
          </div>
        </div>
        <div @click="()=>false" class="wg-cap-state__check">
          <!-- 验证状态 -->
          <div class="wg-cap-state__inner">
            <div class="wg-cap-btn__ico">
              <img
                  src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjI3MDU1NTg2NTk0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyMTEiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMTIwLjI1OTQ1NiA1MTIuMDAxMDIzbS0xMTcuOTIzNzYgMGExMTUuMjM4IDExNS4yMzggMCAxIDAgMjM1Ljg0NzUxOSAwIDExNS4yMzggMTE1LjIzOCAwIDEgMC0yMzUuODQ3NTE5IDBaIiBwLWlkPSIxMjEyIiBmaWxsPSIjZmZhMDAwIj48L3BhdGg+PHBhdGggZD0iTTUxMS45OTk0ODggNTEyLjAwMTAyM20tMTE3LjkyMTcxMyAwYTExNS4yMzYgMTE1LjIzNiAwIDEgMCAyMzUuODQzNDI2IDAgMTE1LjIzNiAxMTUuMjM2IDAgMSAwLTIzNS44NDM0MjYgMFoiIHAtaWQ9IjEyMTMiIGZpbGw9IiNmZmEwMDAiPjwvcGF0aD48cGF0aCBkPSJNOTAzLjczOTUyMSA1MTIuMDAxMDIzbS0xMTcuOTIzNzYgMGExMTUuMjM4IDExNS4yMzggMCAxIDAgMjM1Ljg0NzUxOSAwIDExNS4yMzggMTE1LjIzOCAwIDEgMC0yMzUuODQ3NTE5IDBaIiBwLWlkPSIxMjE0IiBmaWxsPSIjZmZhMDAwIj48L3BhdGg+PC9zdmc+"
                  alt="">
            </div>
            <span class="wg-cap-btn__text">正在进行人机验证...</span>
          </div>
        </div>
        <div @click="handleBtnEvent" class="wg-cap-state__error">
          <!-- 验证失败状态 -->
          <div class="wg-cap-state__inner">
            <div class="wg-cap-btn__ico">
              <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMDAgMjAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0VENDYzMDt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xODQsMjYuNkwxMDIuNCwyLjFoLTQuOUwxNiwyNi42Yy0zLjMsMS42LTUuNyw0LjktNS43LDguMnY0OS44YzAsNTIuMiwzMi42LDk0LjcsODcuMywxMTIuNgoJYzAuOCwwLDEuNiwwLjgsMi40LDAuOHMxLjYsMCwyLjQtMC44YzU0LjctMTgsODcuMy01OS42LDg3LjMtMTEyLjZWMzQuN0MxODkuOCwzMS41LDE4Ny4zLDI4LjIsMTg0LDI2LjZ6IE0xMzQuNSwxMjMuMQoJYzMuMSwzLjEsMy4xLDguMiwwLDExLjNjLTEuNiwxLjYtMy42LDIuMy01LjcsMi4zcy00LjEtMC44LTUuNy0yLjNMMTAwLDExMS4zbC0yMy4xLDIzLjFjLTEuNiwxLjYtMy42LDIuMy01LjcsMi4zCgljLTIsMC00LjEtMC44LTUuNy0yLjNjLTMuMS0zLjEtMy4xLTguMiwwLTExLjNMODguNywxMDBMNjUuNSw3Ni45Yy0zLjEtMy4xLTMuMS04LjIsMC0xMS4zYzMuMS0zLjEsOC4yLTMuMSwxMS4zLDBMMTAwLDg4LjcKCWwyMy4xLTIzLjFjMy4xLTMuMSw4LjItMy4xLDExLjMsMGMzLjEsMy4xLDMuMSw4LjIsMCwxMS4zTDExMS4zLDEwMEwxMzQuNSwxMjMuMXoiLz4KPC9zdmc+Cg=="
                  alt="失败">
            </div>
            <span>人机验证失败 <em>点击重试</em></span>
          </div>
        </div>
        <div @click="handleBtnEvent" class="wg-cap-state__over">
          <!-- 验证次数过多状态 -->
          <div class="wg-cap-state__inner">
            <div class="wg-cap-btn__ico">
              <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMDAgMjAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0VENDYzMDt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xODQsMjYuNkwxMDIuNCwyLjFoLTQuOUwxNiwyNi42Yy0zLjMsMS42LTUuNyw0LjktNS43LDguMnY0OS44YzAsNTIuMiwzMi42LDk0LjcsODcuMywxMTIuNgoJYzAuOCwwLDEuNiwwLjgsMi40LDAuOHMxLjYsMCwyLjQtMC44YzU0LjctMTgsODcuMy01OS42LDg3LjMtMTEyLjZWMzQuN0MxODkuOCwzMS41LDE4Ny4zLDI4LjIsMTg0LDI2LjZ6IE0xMzQuNSwxMjMuMQoJYzMuMSwzLjEsMy4xLDguMiwwLDExLjNjLTEuNiwxLjYtMy42LDIuMy01LjcsMi4zcy00LjEtMC44LTUuNy0yLjNMMTAwLDExMS4zbC0yMy4xLDIzLjFjLTEuNiwxLjYtMy42LDIuMy01LjcsMi4zCgljLTIsMC00LjEtMC44LTUuNy0yLjNjLTMuMS0zLjEtMy4xLTguMiwwLTExLjNMODguNywxMDBMNjUuNSw3Ni45Yy0zLjEtMy4xLTMuMS04LjIsMC0xMS4zYzMuMS0zLjEsOC4yLTMuMSwxMS4zLDBMMTAwLDg4LjcKCWwyMy4xLTIzLjFjMy4xLTMuMSw4LjItMy4xLDExLjMsMGMzLjEsMy4xLDMuMSw4LjIsMCwxMS4zTDExMS4zLDEwMEwxMzQuNSwxMjMuMXoiLz4KPC9zdmc+Cg=="
                  alt="失败">
            </div>
            <span>点击次数过多 <em>点击重试</em></span>
          </div>
        </div>
        <div @click="()=>false" class="wg-cap-state__success">
          <!-- 验证成功状态 -->
          <div class="wg-cap-state__inner">
            <div class="wg-cap-btn__ico">
              <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMDAgMjAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzVFQUEyRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xODMuMywyNy4yTDEwMi40LDIuOWgtNC45TDE2LjcsMjcuMkMxMy40LDI4LjgsMTEsMzIsMTEsMzUuM3Y0OS40YzAsNTEuOCwzMi40LDkzLjksODYuNiwxMTEuNwoJYzAuOCwwLDEuNiwwLjgsMi40LDAuOGMwLjgsMCwxLjYsMCwyLjQtMC44YzU0LjItMTcuOCw4Ni42LTU5LjEsODYuNi0xMTEuN1YzNS4zQzE4OSwzMiwxODYuNiwyOC44LDE4My4zLDI3LjJ6IE0xNDYuMSw4MS40CglsLTQ4LjUsNDguNWMtMS42LDEuNi0zLjIsMi40LTUuNywyLjRjLTIuNCwwLTQtMC44LTUuNy0yLjRMNjIsMTA1LjdjLTMuMi0zLjItMy4yLTguMSwwLTExLjNjMy4yLTMuMiw4LjEtMy4yLDExLjMsMGwxOC42LDE4LjYKCWw0Mi45LTQyLjljMy4yLTMuMiw4LjEtMy4yLDExLjMsMEMxNDkuNCw3My4zLDE0OS40LDc4LjIsMTQ2LjEsODEuNEwxNDYuMSw4MS40eiIvPgo8L3N2Zz4K"
                  alt="成功">
            </div>
            <span>人机验证已通过</span>
          </div>
        </div>
      </template>

      <el-dialog
          :visible.sync="popoverVisible"
          :close-on-click-modal="false"
          append-to-body
          :center="true"
          title="人机校验"
          :show-close="false"
          z-index="999999"
          width="360px"
      >
        <go-captcha
            v-model="popoverVisible"
            width="300px"
            height="240px"
            :max-dot="maxDot"
            :image-base64="imageBase64"
            :thumb-base64="thumbBase64"
            @close="handleCloseEvent"
            @refresh="handleRefreshEvent"
            @confirm="handleConfirmEvent"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import GoCaptcha from './GoCaptcha.vue'
export default {
  name: 'GoCaptchaBtnDialog',
  components: {GoCaptcha},
  props: {
    value: {
      type: String,
      default: 'default',
      validator: value => ['default', 'check', 'error', 'over', 'success'].indexOf(value) > -1
    },
    width: String,
    height: String,
    maxDot: {
      type: Number,
      default: 5
    },
    imageBase64: String,
    thumbBase64: String
  },
  data() {
    return {
      popoverVisible: false,
      captStatus: 'default'
    }
  },
  watch: {
    popoverVisible(val) {
      if (val) {
        this.captStatus = 'check'
        this.$emit('refresh')
      } else if (this.captStatus === 'check') {
        this.captStatus = this.value
      }
    },
    value(val) {
      if (this.captStatus !== 'check') {
        this.captStatus = val
      }
      if (val === 'over' || val === 'success') {
        setTimeout(() => {
          this.popoverVisible = false
        }, 0)
      }
    },
    captStatus(val) {
      if (val !== 'check' && this.value !== val) {
        this.$emit('input', val)
      }
    }
  },
  computed: {
    style() {
      return `width:${this.width}; height:${this.height};`
    },
    activeClass() {
      let activeClass = this.captStatus
      return `wg-cap-active__${activeClass}`
    }
  },
  methods: {
    handleBtnEvent() {
      setTimeout(() => {
        this.popoverVisible = true
      }, 0)
    },
    handleRefreshEvent() {
      this.captStatus = 'check'
      this.$emit('refresh')
    },
    handleConfirmEvent(data) {
      this.$emit('confirm', data)
    },
    handleCloseEvent() {
      this.popoverVisible = false
    }
  }
}
</script>

<style>
.wg-cap-btn {
  width: 100%;
  height: 48px;
}
.wg-cap-btn .wg-cap-btn__inner{
  width: 100%;
  height: 48px;
  position: relative;
  letter-spacing: 1px;
}
.wg-cap-btn .wg-cap-state__default,.wg-cap-btn .wg-cap-state__check, .wg-cap-btn .wg-cap-state__error, .wg-cap-btn .wg-cap-state__success, .wg-cap-btn .wg-cap-state__over{
  position: absolute;
  width: 100%;
  height: 48px;
  font-size: 13px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;

  display:-webkit-box;
  display:-webkit-flex;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
  -ms-flex-align:center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  visibility: hidden;
}
.wg-cap-btn .wg-cap-state__default{
  color: #3e7cff;
  border: 1px solid #50a1ff;
  background: #ecf5ff;
  box-shadow: 0 0 20px rgba(62, 124, 255, 0.1);
  -webkit-box-shadow: 0 0 20px rgba(62, 124, 255, 0.1);
  -moz-box-shadow: 0 0 20px rgba(62, 124, 255, 0.1);
}
.wg-cap-btn .wg-cap-state__check{
  cursor: default;
  color: #ffa000;
  background: #fdf6ec;
  border: 1px solid #ffbe09;
}
.wg-cap-btn .wg-cap-state__error{
  color: #ed4630;
  background: #fef0f0;
  border: 1px solid #ff5a34;
}
.wg-cap-btn .wg-cap-state__over{
  color: #ed4630;
  background: #fef0f0;
  border: 1px solid #ff5a34;
}
.wg-cap-btn .wg-cap-state__success{
  color: #5eaa2f;
  background: #f0f9eb;
  border: 1px solid #8bc640
}
.wg-cap-btn .wg-cap-active__default .wg-cap-state__default, .wg-cap-btn .wg-cap-active__error .wg-cap-state__error,.wg-cap-btn .wg-cap-active__over .wg-cap-state__over ,.wg-cap-btn .wg-cap-active__success .wg-cap-state__success,.wg-cap-btn .wg-cap-active__check .wg-cap-state__check {
  visibility: visible;
}
.wg-cap-btn .wg-cap-state__inner{
  display:-webkit-box;
  display:-webkit-flex;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
  -ms-flex-align:center;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
.wg-cap-btn .wg-cap-state__inner em{
  padding-left: 5px;
  color: #3e7cff;
  font-style: normal;
}
.wg-cap-btn .wg-cap-btn__inner .wg-cap-btn__ico{
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 12px;
  font-size: 14px;
  display: inline-block;
  float: left;
  flex: 0;
}
.wg-cap-btn .wg-cap-btn__inner .wg-cap-btn__ico img{
  width: 24px;
  height: 24px;
  float: left;
  position: relative;
  z-index: 10;
}
@keyframes ripple {
  0% { opacity: 0; }
  5% { opacity: 0.05; }
  20% { opacity: 0.35; }
  65% { opacity: 0.01;  }
  100% {
    transform: scaleX(2) scaleY(2);
    opacity: 0;
  }
}
@-webkit-keyframes ripple {
  0% { opacity: 0; }
  5% { opacity: 0.05; }
  20% { opacity: 0.35; }
  65% { opacity: 0.01;  }
  100% {
    transform: scaleX(2) scaleY(2);
    opacity: 0;
  }
}
.wg-cap-btn .wg-cap-btn__inner .wg-cap-btn__verify::after {
  background: #409eff;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;

  animation: ripple 1.3s infinite;
  -moz-animation: ripple 1.3s infinite;
  -webkit-animation: ripple 1.3s infinite;
  animation-delay: 2s;
  -moz-animation-delay: 2s;
  -webkit-animation-delay: 2s;
}

.wg-cap-tip{
  padding: 50px 20px 100px;
  font-size: 13px;
  color: #76839b;
  text-align: center;
  line-height: 180%;
  width: 100%;
  max-width: 680px;
}
</style>
