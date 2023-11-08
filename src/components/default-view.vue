<template>
  <div>
    <div class="mb-3 flex justify-end">
      <el-button @click="handleCollapseAll">
        <i class="fa-solid fa-caret-up"></i>
      </el-button>
      <el-button @click="handleExpandAll">
        <i class="fa-solid fa-caret-down"></i>
      </el-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="ans in answer" class="p-5" :name="ans._id.$oid">
        <template #title>
          <div
            v-if="getNonMemberById(ans.nonMemberId)"
            class="flex gap-3 h-10 items-center"
          >
            <el-avatar
              shape="circle"
              :size="30"
              fit="cover"
              :src="getNonMemberById(ans.nonMemberId)?.avatar"
            />
            <div class="">
              <p class="leading-4">
                {{ getNonMemberById(ans.nonMemberId)?.name }}
              </p>
              <p class="text-gray-500 italic">
                {{ getNonMemberById(ans.nonMemberId)?.email }}
              </p>
            </div>
          </div>
        </template>
        <Submiter :answer="ans" :job="job" :job-form="jobForm" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref, onMounted } from "vue";
import Submiter from "./submiter.vue";
import { IJob, IJobForm, IAnswer, IUser } from "../type";
import { ElCollapse, ElCollapseItem, ElButton } from "element-plus";
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

const activeNames = ref(props.answer.map((ans) => ans._id.$oid));

function handleCollapseAll() {
  activeNames.value = [];
}

function handleExpandAll() {
  activeNames.value = props.answer.map((ans) => ans._id.$oid);
}
</script>

<style scoped></style>
