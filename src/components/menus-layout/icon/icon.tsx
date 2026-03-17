import { Icon } from '@arco-design/web-vue'
import { defineComponent, h } from 'vue'
import { IconType } from './icon-type'
import type { PropType } from 'vue'

// export default Icon.addFromIconFontCn({
//   src: 'https://at.alicdn.com/t/c/font_2804423_5sr7wi9wga.js',
// })

// declare const IconFontType: () => IconType
export default defineComponent({
  props: {
    // type: IconFontType,
    type: String as PropType<IconType>,
    size: [String, Number],
  },
  setup(props) {
    const IconFont = Icon.addFromIconFontCn({
      src: 'https://at.alicdn.com/t/c/font_2804423_8688qqusguu.js',
    })

    return () => {
      return h(IconFont, props)
    }
  },
})
