<template>
  <div v-if="!isLoading">
    <div class="flex justify-between p-5">
      <div class="flex mb-1">
        <p class="text-lg">Tổng số đơn:</p>
        <p class="text-xl font-bold ml-3">{{ answers.length }}</p>
      </div>
      <el-button @click="exportXLSX(answeredJobs, jobsFrom, answers)" type="success"
        ><i class="fa-solid fa-file-arrow-down"></i
      ></el-button>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="answeredJob in answeredJobs" :key="answeredJob.id">
        <template #label>
          <h2>
            {{ answeredJob.title }}
            <span class="text-red-500">
              ({{ getAnsweredJobByJobId(answeredJob.id).length }})
            </span>
          </h2>
        </template>
        <div class="max-w-7xl m-auto">
          <default-view
            :answer="getAnsweredJobByJobId(answeredJob.id)"
            :job="getJobById(answeredJob.id)!"
            :job-form="getJobFormById(answeredJob.id)!"
            v-show="mode === Mode.DEFAULT"
          />
          <!-- <answer-view
            :answer="getAnsweredJobByJobId(answeredJob.id)"
            :job="getJobById(answeredJob.id)!"
            :job-form="getJobFormById(answeredJob.id)!"
            v-show="mode === Mode.BY_ANSWER"
          /> -->
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- <div class="fixed bottom-6 right-6">
      <switch-mode v-model="mode" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ElTabs, ElTabPane, ElButton } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { IAnswer, IJob, Res, IJobForm, Mode } from "./type";
import defaultView from "./components/default-view.vue";
import { useExcel } from "./composables/excel";
// import answerView from "./components/answer-view.vue";
// import switchMode from "./components/switch-mode.vue";
import axios from "axios";
import data from "./data.json";

const { exportXLSX } = useExcel();

const jobs = ref<IJob[]>([]);
const jobsFrom = ref<IJobForm[]>([]);
const answers: IAnswer[] = data as any;
const mode = ref<Mode>(Mode.DEFAULT);
const answeredJobs = computed(() => {
  return jobs.value.filter((job) => {
    return answers.some((answer) => answer.jobId === job.id);
  });
});
const isLoading = computed(() => {
  return jobs.value.length === 0 || jobsFrom.value.length === 0;
});

function getJobById(id: string) {
  return jobs.value.find((job) => job.id === id) || null;
}

function getJobFormById(id: string) {
  return jobsFrom.value.find((job) => job.jobId === id) || null;
}

function getAnsweredJobByJobId(jobId: string) {
  return answers.filter((answer) => answer.jobId === jobId) || [];
}

onMounted(async () => {
  const response = await axios.get<Res<IJob[]>>(
    "https://gdschanube.io.vn:8443/recruitmentCampaign/65460f31c2ba7b77d0bab156/job?page=1&perPage=100"
  );
  jobs.value = response.data.data;
  jobsFrom.value = (
    await Promise.all(
      answeredJobs.value.map((answeredJob) =>
        axios.get<Res<IJobForm>>(
          `https://gdschanube.io.vn:8443/job/applicationForm/${answeredJob.id}`
        )
      )
    )
  ).map((res) => res.data.data);
});
</script>

<style>
.el-tabs__content {
  @apply !p-2 md:!p-5;
}
.el-collapse-item {
  @apply !p-2 md:!p-5;
}
</style>
