<template>
<v-container>
  <v-row>
    <v-btn
        tile
        color="#106EDC"
        to="/steps"
    >
      <v-icon left>
        mdi-plus
      </v-icon>
      Новое задание
    </v-btn>
  </v-row>
  <v-row>
    <list-items-component/>
  </v-row>
</v-container>
</template>

<script>
import ListItemsComponent from "@/components/ListItemsComponent";
export default {
  name: "HomeComponent",
  components: {
    ListItemsComponent
  }
}
</script>

<style scoped>
.v-container{
  margin: 63px;
}
.v-btn{
  text-transform: initial;
  color: #ffffff;
  margin-bottom: 30px;
}
</style>