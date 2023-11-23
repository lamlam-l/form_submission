import { IAnswer, IJob, IJobForm, IUser } from "./../type";
import * as XLSX from "xlsx";
import axios from "axios";

export const useExcel = () => {
  return {
    exportXLSX: async (
      answeredJobs: IJob[],
      jobsFrom: IJobForm[],
      answers: IAnswer[]
    ) => {
      function getJobFormById(id: string) {
        return jobsFrom.find((job) => job.jobId === id) || null;
      }
      function getAnswerByQuestionId(answer: IAnswer, questionId: string) {
        return (
          answer.answers.find((ans) => ans.questionId === questionId) || null
        );
      }
      function getNonMemberById(nonMembers: IUser[], id: string) {
        return nonMembers.find((nonMember) => nonMember.id === id) || null;
      }
      const sheets: any = {};

      const nonMember: IUser[] = (
        await Promise.all(
          answers.map((ans) =>
            axios.get(
              `https://gdschanube.io.vn:8443/nonMember/${ans.nonMemberId}`
            )
          )
        )
      ).map((res) => res.data.data);
      for (const job of answeredJobs) {
        const jobForm = getJobFormById(job.id);
        if (!jobForm) return;
        const answerInQuestion = answers.filter(
          (answer) => answer.jobId === job.id
        );
        if (!answerInQuestion) return;
        sheets[job.title] = [];
        jobForm.parts.forEach((part) => {
          part.questions.forEach((question) => {
            const obj: any = {
              "Câu hỏi": question.question,
            };
            answerInQuestion.forEach((answer) => {
              obj[getNonMemberById(nonMember, answer.nonMemberId)!.email] =
                getAnswerByQuestionId(answer, question.id)?.answerType ===
                "TEXT"
                  ? getAnswerByQuestionId(answer, question.id)
                      ?.answerOfTextQuestionData.text
                  : getAnswerByQuestionId(answer, question.id)?.answerType ===
                    "MULTIPLE_ANSWERS"
                  ? question.options?.find(
                      (option) =>
                        option.id ===
                        getAnswerByQuestionId(answer, question.id)
                          .answerOfMultipleQuestionData.answerId
                    )?.description
                  : getAnswerByQuestionId(answer, question.id)
                      .answerOfDateQuestionData.day +
                    "/" +
                    getAnswerByQuestionId(answer, question.id)
                      .answerOfDateQuestionData.month +
                    "/" +
                    getAnswerByQuestionId(answer, question.id)
                      .answerOfDateQuestionData.year;
            });
            sheets[job.title].push(obj);
          });
        });
      }
      const workbook = XLSX.utils.book_new();
      for (const sheet in sheets) {
        const worksheet = XLSX.utils.json_to_sheet(sheets[sheet]);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheet.slice(30));
      }
      XLSX.writeFile(workbook, "Submissions.xlsx", { compression: true });
    },
  };
};
