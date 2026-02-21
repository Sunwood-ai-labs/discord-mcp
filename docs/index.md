---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  // Simple redirect to English as default
  router.go('/en/')
})
</script>