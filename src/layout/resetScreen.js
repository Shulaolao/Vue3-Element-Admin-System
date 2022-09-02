import { useStore } from 'vuex'
const store = useStore()

const { body } = document
const WIDTH = 992

export default {
  beforeMount () {
    window.addEventListener('resize', this.$_resetHandler())
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_resetHandler())
  },
  mounted () {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('screen/toggleDevice', 'mobile')
      store.dispatch('screen/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    $_isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resetHandler () {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('screen/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('screen/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
