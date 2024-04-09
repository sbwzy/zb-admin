<template>
  <div class="app-container">
    <div class="app-container-inner">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup name="Map"></script>
