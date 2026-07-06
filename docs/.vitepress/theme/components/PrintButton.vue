[4:16 pm, 04/07/2026] MR. KUNTAL OJHA: <script setup>
const printPage = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<template>
  <ClientOnly>
    <button class="pdf-button" @click="printPage" aria-label="Print this page">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      <span>Save PDF</span>
    </button>
  </ClientOnly>
</template>

<style scoped>
.pdf-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 13px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  margin-left: 10px;
}
.pdf-button:hover {
  border-color: var(--vp-c-brand-1);
}
</style>
