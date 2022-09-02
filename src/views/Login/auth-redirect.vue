<template>
  <div />
</template>

<script>
export default {
  name: 'AuthRedirect',
  setup () {
    const hash = window.location.search.slice(1)
    console.log(hash)
    if (window.localStorage) {
      window.localStorage.setItem('vue3-element-admin-auth-code', hash)
      window.close()
    }
    return {
    }
  },
  render (h) {
    return h()
  }
}
</script>
