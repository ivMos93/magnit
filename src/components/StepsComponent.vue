<template>
  <v-container fluid class="customization-task">
    <v-container v-if="steps === 1">
      <h2>Создание нового задания</h2>
      <v-row>
        <v-col class="step step1__step1">1. Основные настройки</v-col>
        <v-col class="step step1__step2">2. Документы</v-col>
        <v-col class="step step1__step3">3. Комментарии</v-col>
      </v-row>
      <v-row class="controls">
        <v-btn tile color="white" @click="steps = 2">
          <v-icon left>mdi-arrow-right</v-icon>
          Далее
        </v-btn>
        <v-divider
            vertical
        ></v-divider>
        <v-btn tile color="white" @click="savingTask">
          <v-icon left>mdi-checkbox-multiple-marked-circle-outline</v-icon>
          Сохранить
        </v-btn>
        <v-btn tile color="white" to="/">
          <v-icon left>mdi-close-thick</v-icon>
          Отмена
        </v-btn>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Название задания:" placeholder="Задание такое-то" v-model="name"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Дата завершения:" placeholder="21 апреля 2022" v-model="date"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="Описание задания:" value="Задание такое-то"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select :items="['Создание', 'Отладка', 'Неактивный']" label="Статус задания:" v-model="status"></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="steps === 2 ">
      <h2>Создание нового задания</h2>
      <v-row>
        <v-col class="step step2__step1">1. Основные настройки</v-col>
        <v-col class="step step2__step2">2. Документы</v-col>
        <v-col class="step step2__step3">3. Комментарии</v-col>
      </v-row>
      <v-row class="0 controls">
        <v-btn tile color="white" @click="steps = 1">
          <v-icon left>mdi-arrow-left</v-icon>
          Назад
        </v-btn>
        <v-btn tile color="white" @click="steps = 3">
          <v-icon left>mdi-arrow-right</v-icon>
          Далее
        </v-btn>
        <v-divider
            vertical
        ></v-divider>
        <v-btn tile color="white" @click="savingTask">
          <v-icon left>mdi-checkbox-multiple-marked-circle-outline</v-icon>
          Сохранить
        </v-btn>
        <v-btn tile color="white" to="/">
          <v-icon left>mdi-close-thick</v-icon>
          Отмена
        </v-btn>
      </v-row>
      <v-row>
        <v-col><input type="file" @change="addFiles"></v-col>
        <v-col>
          <v-card v-for="(file, index) in files" :key="index" class="files-list">
            <v-row class="align-center justify-lg-space-between files-list__row">
              <span>{{ file }}</span>
              <v-btn icon="mdi-delete" color="transparent" variant="flat" @click="removeFiles(file)"></v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="steps === 3 ">
      <h2>Создание нового задания</h2>
      <v-row class="0">
        <v-col class="step step3__step1">1. Основные настройки</v-col>
        <v-col class="step step3__step2">2. Документы</v-col>
        <v-col class="step step3__step3">3. Комментарии</v-col>
      </v-row>
      <v-row class="0 controls">
        <v-btn tile color="white" @click="steps = 2">
          <v-icon left>mdi-arrow-left</v-icon>
          Назад
        </v-btn>
        <v-divider
            vertical
        ></v-divider>
        <v-btn tile color="white" @click="savingTask">
          <v-icon left>mdi-checkbox-multiple-marked-circle-outline</v-icon>
          Сохранить
        </v-btn>
        <v-btn tile color="white" to="/">
          <v-icon left>mdi-close-thick</v-icon>
          Отмена
        </v-btn>
      </v-row>
      <v-row class="0">
        <v-col>
          <v-container class="comments">
            <v-card v-for="(comment, index) in comments" :key="index">
              <span>{{ comment }}</span>
              <v-row class="align-center justify-space-between">
                <v-col>
                  <v-btn icon="mdi-pencil" color="transparent" variant="flat"
                         @click="editComment(comment, index)"></v-btn>
                  <v-btn icon="mdi-delete" color="transparent" variant="flat" @click="removeComment(comment)"></v-btn>
                </v-col>
                <v-col style="text-align: right">
                  {{ (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) }}
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-col>
        <v-col>
          <v-textarea label="Комментарий к заданию:" placeholder="Комментарий такой-то" rows="12" v-model="comment"></v-textarea>
          <v-btn class="do-comment" tile color="#106EDC" @click="addComment" v-if="editCommentIndex == null">Добавить комментарий</v-btn>
          <v-btn class="do-comment" tile color="#106EDC" @click="addCorrectionsComment" v-else>Изменить комментарий
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import {ref} from "vue";
import {storeToRefs} from "pinia"
import {useStore} from "@/store";
import {useRouter} from 'vue-router'

export default {
  name: "StepsComponent",
  props: {
    edited: String,
    index: String
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const {items} = storeToRefs(store)
    const name = ref(null)
    const date = ref(null)
    const status = ref(null)
    const steps = ref(1)
    const files = ref([])
    const comments = ref([])
    const comment = ref([])
    const editCommentIndex = ref(null)
    if (props.edited === 'true') {
      name.value = items.value[props.index].name
      date.value = items.value[props.index].date
      status.value = items.value[props.index].status
      console.log(name.value)
    }
    const addFiles = (e) => {
      Array.prototype.forEach.call(e.target.files, (file) => {
        files.value.push(file.name)
      })
    }
    const removeFiles = (file) => {
      files.value.splice(files.value.indexOf(file), 1);
    }
    const addComment = () => {
      comments.value.push(comment.value)
      comment.value = null
    }
    const removeComment = (commentText) => {
      comments.value.splice(comments.value.indexOf(commentText), 1);
    }
    const editComment = (commentText, index) => {
      comment.value = commentText
      editCommentIndex.value = index
    }
    const addCorrectionsComment = () => {
      comments.value.splice(editCommentIndex.value, 1, comment.value);
      editCommentIndex.value = null
      comment.value = null
    }
    const savingTask = () => {
      if (props.edited === 'true') {
        items.value.splice(parseInt(props.index), 1, {name, date, status});
      } else {
        items.value.push({
          name,
          date,
          status
        })
      }
      router.push('/')
    }
    return {
      name,
      date,
      status,
      items,
      files,
      comments,
      comment,
      editCommentIndex,
      steps,
      addFiles,
      removeFiles,
      addComment,
      removeComment,
      editComment,
      addCorrectionsComment,
      savingTask
    }
  }
}
</script>

<style scoped>
.customization-task {
  margin-top: 63px;
}

.v-row {
  margin: 0;
  padding: 0;
}

.v-col {
  margin: 0 30px 0 0;
  padding: 0;
}

.v-col:last-child {
  margin-right: 0;
}

h2 {
  margin-bottom: 30px;
}

.step {
  padding: 18px 24px;
  border-radius: 10px 0px 0px 0px;
  margin-right: 10px;
}

.step:last-child {
  margin-right: 0;
}

.step1__step1 {
  background-color: #0C2747;
  color: #ffffff;
}

.step1__step2,
.step1__step3 {
  background-color: #F2F6F9;
}

.step2__step1 {
  background-color: #304E71;
  color: #ffffff;
}

.step2__step2 {
  background-color: #0C2747;
  color: #ffffff;
}

.step2__step3 {
  background-color: #F2F6F9;
}

.step3__step1,
.step3__step2 {
  background-color: #304E71;
  color: #ffffff;
}

.step3__step3 {
  background-color: #0C2747;
  color: #ffffff;
}

.controls {
  margin: 30px 0;
  padding: 30px 21px;
  background-color: #F6F6F6;
  border-top: 1px dashed #82898F;
  border-bottom: 1px dashed #82898F;
}

.controls .v-btn {
  margin-right: 10px;
}

.controls .v-divider {
  margin-right: 30px;
  margin-left: 20px;
}

.comments {
  background: #F2F6F9;
  border-radius: 6px;
  min-height: 400px;
}

.comments .v-card {
  padding: 12px;
  margin-bottom: 20px;
}

.comments span {
  margin-bottom: 15px;
}

.do-comment {
  text-transform: initial;
  color: #ffffff;
  margin-bottom: 30px;
}

.files-list {
  margin-bottom: 6px;
}

.files-list__row {
  background: #F6F6F6;
  border-radius: 6px;
  padding: 25px 33px;
}
</style>