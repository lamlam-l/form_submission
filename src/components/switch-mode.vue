<template>
  <el-button-group>
    <el-button :type="modelValue === Mode.DEFAULT ? 'primary' : 'default'" @click="changeMode(Mode.DEFAULT)">
      <i class="fa-regular fa-square"></i>
    </el-button>
    <el-button :type="modelValue === Mode.BY_ANSWER ? 'primary' : 'default'" @click="changeMode(Mode.BY_ANSWER)">
      <i class="fa-solid fa-clipboard-question"></i>
    </el-button>
    <el-button :type="modelValue === Mode.SMART ? 'primary' : 'default'" @click="changeMode(Mode.SMART)">
      <i class="fa-solid fa-list-ul"></i>
    </el-button>
  </el-button-group>
</template>

<script lang="ts" setup>
import { ElButton, ElButtonGroup } from "element-plus";
import { Mode } from '../type'
import {PropType} from 'vue'

const emit = defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: String as PropType<Mode>,
    required: true
  },
})

function changeMode(mode: Mode) {
  emit('update:modelValue', mode)
}
</script>

<style scoped></style>
