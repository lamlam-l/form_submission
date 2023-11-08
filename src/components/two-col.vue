<template>
  <div>
    <div v-for="ans in answer" class="p-5">
      <Submiter
        :answer="ans"
        :job="job"
        :job-form="jobForm"
      />
      <el-divider />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import Submiter from "./submiter.vue";
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

<style scoped></style>
