<script setup>
import { ref, onMounted } from "vue";

// 设置组件名称
defineOptions({
  name: "NotFound",
});


const message = "当前页面不存在"
const isShow = ref(false)

onMounted(() => {
  setTimeout(() => {
    isShow.value = true
  }, 200) // 可调整延迟时间（单位：毫秒）
})
</script>

<template>
  <transition name="NotFound">
    <div class="wscn-http404-container" v-if="isShow">
      <div class="wscn-http404">
        <div class="pic-404">
          <img
              class="pic-404__parent"
              src="/404_images/404.png"
              alt="404"
          />
          <img
              class="pic-404__child left"
              src="/404_images/404_cloud.png"
              alt="404"
          />
          <img
              class="pic-404__child mid"
              src="/404_images/404_cloud.png"
              alt="404"
          />
          <img
              class="pic-404__child right"
              src="/404_images/404_cloud.png"
              alt="404"
          />
        </div>
        <div class="bullshit">
          <div class="bullshit__oops">OOPS!</div>
          <div class="bullshit__info">
            All rights reserved
            <a
                style="color: #20a0ff"
                href="https://wallstreetcn.com"
                target="_blank"
            >wallstreetcn</a
            >
          </div>
          <div class="bullshit__headline">{{ message }}</div>
          <div class="bullshit__info">
             请检查您输入的网址是否正确，或返回首页。
          </div>
          <a href="/docs/public" class="bullshit__return-home">回首页</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.NotFound-enter-active {
  transition: opacity 0.5s ease;
}

.NotFound-enter-from {
  opacity: 0;
}

.wscn-http404-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wscn-http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
}

.wscn-http404 .pic-404 {
  position: relative;
  float: left;
  width: 600px;
  overflow: hidden;
}

.wscn-http404 .pic-404__parent {
  width: 100%;
}

.wscn-http404 .pic-404__child {
  position: absolute;
  opacity: 0;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.wscn-http404 .pic-404__child.left {
  top: 17px;
  left: 220px;
  width: 80px;
  animation-name: cloudLeft;
  animation-delay: 1s;
}

.wscn-http404 .pic-404__child.mid {
  top: 10px;
  left: 420px;
  width: 46px;
  animation-name: cloudMid;
  animation-delay: 1.2s;
}

.wscn-http404 .pic-404__child.right {
  top: 100px;
  left: 500px;
  width: 62px;
  animation-name: cloudRight;
  animation-delay: 1s;
}

@keyframes cloudLeft {
  0% {
    top: 17px;
    left: 220px;
    opacity: 0;
  }

  20% {
    top: 33px;
    left: 188px;
    opacity: 1;
  }

  80% {
    top: 81px;
    left: 92px;
    opacity: 1;
  }

  100% {
    top: 97px;
    left: 60px;
    opacity: 0;
  }
}

@keyframes cloudMid {
  0% {
    top: 10px;
    left: 420px;
    opacity: 0;
  }

  20% {
    top: 40px;
    left: 360px;
    opacity: 1;
  }

  70% {
    top: 130px;
    left: 180px;
    opacity: 1;
  }

  100% {
    top: 160px;
    left: 120px;
    opacity: 0;
  }
}

@keyframes cloudRight {
  0% {
    top: 100px;
    left: 500px;
    opacity: 0;
  }

  20% {
    top: 120px;
    left: 460px;
    opacity: 1;
  }

  80% {
    top: 180px;
    left: 340px;
    opacity: 1;
  }

  100% {
    top: 200px;
    left: 300px;
    opacity: 0;
  }
}

.wscn-http404 .bullshit {
  position: relative;
  float: left;
  width: 300px;
  padding: 30px 0;
  overflow: hidden;
}

.wscn-http404 .bullshit__oops {
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: bold;
  line-height: 40px;
  color: #1482f0;
  opacity: 0;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.wscn-http404 .bullshit__headline {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  color: #222;
  opacity: 0;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
}

.wscn-http404 .bullshit__info {
  margin-bottom: 30px;
  font-size: 13px;
  line-height: 21px;
  color: grey;
  opacity: 0;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
}

.wscn-http404 .bullshit__return-home {
  display: block;
  float: left;
  width: 110px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background: #1482f0;
  border-radius: 100px;
  opacity: 0;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
