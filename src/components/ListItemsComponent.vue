<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Название
      </th>
      <th class="text-left">
        Дата
      </th>
      <th class="text-left">
        Статус
      </th>
      <th class="text-left"></th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(item, index) in items"
        :key="index"
        ref="itemsRefs"
    >
      <td>{{ item.name }}</td>
      <td>{{ item.date }}</td>
      <td>{{ item.status }}</td>
      <td>
        <v-row>
          <v-btn icon="mdi-pencil" color="transparent" variant="flat" :to="{ name: 'steps', query:{ edited: true, index:index }}"></v-btn>
          <v-btn icon="mdi-delete" color="transparent" variant="flat" @click="dialog.open = true; dialog.index = index"></v-btn>
        </v-row>
      </td>
    </tr>
    </tbody>
  </v-table>
  <v-dialog
      v-model="dialog.open"
      persistent
      max-width="600"
  >
    <v-card>
      <v-card-title class="text-h5">
        Удалить выбранное ?
      </v-card-title>
      <v-card-text>Выбранные вами объекты удалятся без возможности восстановления.</v-card-text>
      <v-card-text><span style="font-weight: 900">Выбрано объектов:</span> 1</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            tile
            @click="dialog.open = false; dialog.index = null"
        >
          Отмена
        </v-btn>
        <v-btn
            color="#106EDC"
            @click="dialog.open = false; removeItem(dialog.index)"
        >
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';
import {useStore} from "@/store";
export default {
  name: "ListItemsComponent",
  setup(){
    const store = useStore()
    const { items } = store
    const dialog = ref({
      index: null,
      open: false
    })
    const itemsRefs = ref(null);
    const removeItem = (index) => {
      itemsRefs.value[index].remove()
      dialog.value.index = null
    }
    return{
      dialog,
      items,
      itemsRefs,
      removeItem
    }
  }
}


</script>

<style scoped>
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
.v-table{
  width: 100%;
}
</style>