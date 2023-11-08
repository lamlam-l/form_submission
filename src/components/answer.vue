<template>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { IJob, IJobForm, IAnswer } from "../type";

defineProps({
  job: {
    type: Object as PropType<IJob>,
    required: true,
  },
  jobForm: {
    type: Object as PropType<IJobForm>,
    required: true,
  },
  answer: {
    type: Array as PropType<IAnswer[]>,
    required: true,
  },
});
</script>

<style scoped>
</style>
