<template>
  <div class="units-list">
    <div
      v-for="unit in units"
      :key="unit.id"
      class="unit-block"
      :class="{ open: openUnit === unit.id }"
    >
      <div
        class="unit-header"
        @click="openUnit = openUnit === unit.id ? null : unit.id"
      >
        <div class="unit-left">
          <span class="unit-icon">{{ unit.icon }}</span>
          <div class="unit-info">
            <span class="unit-title">{{ unit.title }}</span>
            <span class="unit-sub">{{ unit.sub }}</span>
          </div>
        </div>
        <span class="chevron">{{ openUnit === unit.id ? '▾' : '▸' }}</span>
      </div>

      <div class="parts-grid" :class="{ visible: openUnit === unit.id }">
        <div v-for="p in unit.parts" :key="p.label" class="part-wrap">
          <a :href="p.link" class="part-pill">{{ p.label }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openUnit = ref(null)

const units = [
  {
    id: 1,
    icon: '🖥️',
    title: 'Unit 01',
    sub: 'Introduction to Software Testing',
    parts: [
      { label: 'Part 1', link: 'st/units/unit-1/p1' },
      { label: 'Part 2', link: 'st/units/unit-1/p2' },
      { label: 'Part 2', link: 'st/units/unit-1/p2' },

    ],
  },
  {
    id: 2,
    icon: '⚙️',
    title: 'Unit 02',
    sub: 'Black Box & White Box Testing',
    parts: [
      { label: 'Part 1', link: 'st/units/unit-2/p1' },
      { label: 'Part 2', link: 'st/units/unit-2/p2' },
      { label: 'Part 2', link: 'st/units/unit-2/p2' },

    ],
  },
  {
    id: 3,
    icon: '🔧',
    title: 'Unit 03',
    sub: 'Advanced Testing Topics',
    parts: [
      { label: 'Part 1', link: 'st/units/unit-3/p1' },
      { label: 'Part 2', link: 'st/units/unit-3/p2' },
      { label: 'Part 2', link: 'st/units/unit-3/p2' },

    ],
  },
  {
    id: 4,
    icon: '🚀',
    title: 'Unit 04',
    sub: 'Advanced Testing Topics',
    parts: [
      { label: 'Part 1', link: 'st/units/unit-4/p1' },
      { label: 'Part 2', link: 'st/units/unit-4/p2' },
      { label: 'Part 2', link: 'st/units/unit-4/p2' },

    ],
  },
]
</script>

<style scoped>
.units-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1.5rem;
}
.unit-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}
.unit-block.open {
  border-color: var(--vp-c-brand-1);
}
.unit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  user-select: none;
}
.unit-header:hover {
  background: var(--vp-c-default-soft);
}
.unit-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.unit-icon { font-size: 26px; line-height: 1; }
.unit-info { display: flex; flex-direction: column; gap: 2px; }
.unit-title { font-size: 15px; font-weight: 600; color: var(--vp-c-text-1); }
.unit-sub { font-size: 12px; color: var(--vp-c-text-2); }
.chevron { font-size: 18px; color: var(--vp-c-text-2); }
.parts-grid {
  display: none;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.parts-grid.visible { display: grid; }
.part-wrap { display: contents; }
.part-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.part-pill:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
</style>