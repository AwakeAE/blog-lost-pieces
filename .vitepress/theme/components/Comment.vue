<template>
  <div
    v-if="show"
    class="comments"
  >
    <component
      :is="'script'"
      v-if="refreshKey"
      src="https://giscus.app/client.js"
      data-repo="AwakeAE/blog-lost-pieces-ae"
      data-repo-id="R_kgDOIB0thA"
      data-category="Announcements"
      data-category-id="DIC_kwDOIB0thM4CTm6V"
      :data-mapping="'pathname'"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      :data-input-position="'top'"
      :data-theme="isDark ? 'dark' : 'light'"
      :data-lang="'en'"
      crossorigin="anonymous"
      :data-loading="'lazy'"
      async
    >
    </component>
  </div>
</template>

<script lang="ts" setup>
import { useData, useRoute } from 'vitepress'
import { ref, watch, computed } from 'vue'

const { isDark, frontmatter } = useData()
const route = useRoute()

const show = computed(() => !frontmatter.value.disableComment)

const refreshKey = ref(true)

const refreshComment = () => {
  refreshKey.value = false
  setTimeout(() => {
    refreshKey.value = true
  }, 150)
}

watch(() => route.path, refreshComment)
watch(isDark, refreshComment)
</script>
<style scoped>
.comments {
  padding-top: 1.0625rem;
  width: 100%;
  text-align: center;
}
</style>
