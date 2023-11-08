<template>
  <div>
    <div v-for="part in jobForm.parts" :key="part.ordinal" class="mb-3">
      <h3 class="italic">{{ part.title }}</h3>
      <div v-for="question in part.questions" :key="question.id" class="mb-2">
        <h4 class="font-semibold text-base">{{ question.question }}</h4>
        <div class="ml-3 text-gray-500 !text-base">
          <p v-if="getAnswerByQuestionId(question.id).answerType === 'TEXT'">
            {{
              getAnswerByQuestionId(question.id).answerOfTextQuestionData.text
            }}
          </p>
          <p
            v-else-if="
              getAnswerByQuestionId(question.id).answerType ===
              'MULTIPLE_ANSWERS'
            "
          >
            {{
              question.options?.find(
                (opt) =>
                  opt.id ===
                  getAnswerByQuestionId(question.id)
                    .answerOfMultipleQuestionData.answerId
              )?.description
            }}
          </p>
          <p
            v-else-if="getAnswerByQuestionId(question.id).answerType === 'DATE'"
          >
            {{
              getAnswerByQuestionId(question.id).answerOfDateQuestionData.day +
              "/" +
              getAnswerByQuestionId(question.id).answerOfDateQuestionData
                .month +
              "/" +
              getAnswerByQuestionId(question.id).answerOfDateQuestionData.year
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { IJob, IJobForm, IAnswer } from "../type";


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
    type: Object as PropType<IAnswer>,
    required: true,
  },
});

function getAnswerByQuestionId(questionId: string) {
  return props.answer.answers.find((ans) => ans.questionId === questionId);
}
</script>

<style scoped></style>
