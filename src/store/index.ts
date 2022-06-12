import clone from "@/lib/clone";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const localStorageKeyName = "recordList";

const store =  new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations:{
    fetchRecord(state){
      state.recordList = JSON.parse(
        localStorage.getItem(localStorageKeyName) || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record_copy: RecordItem = clone(record);
      record_copy.createdAt = new Date();
      state.recordList.push(record_copy);
      console.log(state.recordList);
      store.commit("saveRecords");
    },
    saveRecords(state) {
      localStorage.setItem(localStorageKeyName, JSON.stringify(state.recordList));
    },
  }
});

export default store;