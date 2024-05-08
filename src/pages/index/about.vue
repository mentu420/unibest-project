<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { Chart } from '@antv/g2'

const disabled = ref<boolean>(false) // 判断是否可以投资
const chartRef = ref<any>(null)

// 获取当前屏幕宽度下对应的 px值，比如设计稿上的 100px 在当前屏幕宽度下的 px 值
function getRealPx(px) {
  const screenWidth = window.innerWidth
  const scaleFactor = screenWidth / 375
  return px * (scaleFactor > 2 ? 2 : scaleFactor)
}

const initChart = async () => {
  const data = [
    { time: '1991', value: 3 },
    { time: '1992', value: 4 },
    { time: '1993', value: 3.5 },
    { time: '1994', value: 5 },
    { time: '1995', value: 4.9 },
    { time: '1996', value: 6 },
    { time: '1997', value: 7 },
    { time: '1998', value: 9 },
    { time: '1999', value: 13 },
  ]

  const chart: any = new Chart({
    container: chartRef.value,
    // autoFit: true,
    width: getRealPx(280),
    height: getRealPx(220),
    padding: [0, getRealPx(15)],
  })
  chart.data(data)

  chart.axis('time', false)
  chart.axis('value', false)
  // chart.tooltip({
  //   showCrosshairs: false,
  //   crosshairs: {
  //     type: 'xy',
  //     line: {
  //       style: {
  //         stroke: '#9EF600',
  //         lineDash: [5, 5]
  //       }
  //     }
  //   },

  //   customItems: (items) => {
  //     return items.map((item) => {
  //       return {
  //         ...item,
  //         value: formatMoney(item.value)
  //       }
  //     })
  //   },

  //   // 自定义 tooltip 内容
  //   containerTpl: `<div class="g2-tooltip !overflow-hidden !px-0 !rounded-[4px] !rounded-bl-[0] !shadow-none !border !border-solid !border-[#5AB500]" >
  //     <ul class="g2-tooltip-list"></ul>
  //   </div>`,
  //   itemTpl: `<li class="bg-[#9ef600] px-2 py-1 text-[9px]">{value}</li>` // tooltip 每项记录的默认模板
  // })

  chart.line().position('time*value').shape('smooth').color('#9EF600').size(2)
  chart.area().position('time*value').shape('smooth').color('#9EF600')
  chart.render()
}

onLoad((options) => {
  disabled.value = options?.type === '1'
})

onMounted(initChart)
</script>

<route lang="json5">
{
  style: {
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '投资详情',
  },
}
</route>

<template>
  <div class="min-h-screen bg-black text-white">
    <div class="px-4 text-center text-17px font-bold">项目标题</div>
    <section class="p-4">
      <div class="rounded-[15px] bg-card-gray p-4">
        <div class="text-center">
          <div class="avatar">
            <div class="w-12 rounded-full ring ring-#333 ring-offset-2 ring-offset-base-100">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <h3 class="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Zacks***
          </h3>
        </div>

        <dl>
          <dt class="text-[12px]">创建类项目</dt>
          <dd class="mb-[40px] mt-[16px]">
            <span
              v-for="tag in 3"
              :key="tag"
              class="mr-2 rounded-full bg-#41415D px-24px py-4px text-white"
            >
              ghost
            </span>
          </dd>
          <dt class="text-[12px]">博客基本详情</dt>
          <dd class="mb-[40px] mt-[16px] flex items-center justify-between">
            <p
              v-for="textItem in [
                { id: 0, text: '粉丝量', value: '9million' },
                { id: 0, text: '广告量', value: '9' },
                { id: 0, text: '广告均价', value: '99999' },
              ]"
              :key="textItem.id"
              class="space-x-1"
            >
              <span class="text-[16px]">{{ textItem.value }}</span>
              <span class="text-[12px] text-gray-500">{{ textItem.text }}</span>
            </p>
          </dd>
          <dt class="text-[12px]">热度曲线</dt>
          <dd class="flex justify-center items-center p-4">
            <div ref="chartRef" class="h-full w-full"></div>
          </dd>
        </dl>
      </div>

      <ul
        class="my-4 min-h-[78px] space-y-4 rounded-[15px] bg-card-gray p-4 text-[14px] text-gray-400"
      >
        <li class="flex items-center justify-between">
          <p>起投金额</p>
          <p>1,500(USD)</p>
        </li>
        <template v-if="!disabled">
          <li
            v-for="item in [
              { id: 0, text: '剩余锁定时长', value: '3min' },
              { id: 1, text: '预期收益', value: '$1,46464' },
            ]"
            :key="item.id"
            class="flex items-center justify-between"
          >
            <p>{{ item.text }}</p>
            <p>{{ item.value }}</p>
          </li>
        </template>
      </ul>

      <div v-if="disabled" class="my-[34px]">
        <button
          class="btn btn-active w-full rounded-full border-none bg-gradient-to-r from-[#FC075B] to-[#B50CFF] text-white"
        >
          投资
        </button>
      </div>
    </section>
  </div>
</template>
