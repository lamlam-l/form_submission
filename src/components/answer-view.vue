<template>
  <div class="answer-view">
    <el-tabs tab-position="left">
      <template v-for="part in jobForm.parts" :key="part.ordinal">
        <el-tab-pane v-for="question in part.questions" :key="question.id">
          <template #label>
            <div class="max-w-sm">
              {{ question.question }}
            </div>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref, onMounted } from "vue";
import { IJob, IJobForm, IAnswer, IUser } from "../type";
import { ElTabs, ElTabPane } from "element-plus";
import axios from "axios";

const props = defineProps({
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

const nonMembers = ref<IUser[] | null>([]);

function getNonMemberById(id: string) {
  return nonMembers.value?.find((nonMember) => nonMember.id === id) || null;
}

onMounted(async () => {
  nonMembers.value = (
    await Promise.all(
      props.answer.map((ans) =>
        axios.get(`https://gdschanube.io.vn:8443/nonMember/${ans.nonMemberId}`)
      )
    )
  ).map((res) => res.data.data);
});
</script>

<style scoped>
.answer-view .el-tabs__item {
  background-color: red !important;
}
</style>
