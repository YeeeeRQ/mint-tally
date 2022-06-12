import clone from "@/lib/clone";
import createID from "@/lib/createID";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const Key4RecordList = "recordList";
const Key4TagList = "tagList";

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    fetchRecord(state) {
      state.recordList = JSON.parse(
        localStorage.getItem(Key4RecordList) || "[]"
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
      localStorage.setItem(Key4RecordList, JSON.stringify(state.recordList));
    },

    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem(Key4TagList) || "[]"
      );
    },
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签已存在");
        return "duplicated";
      }
  
      const id = createID().toString();
  
      state.tagList.push({ id: id, name: name });
      store.commit('saveTags');
      return "success";
    },
    saveTags(state) {
      localStorage.setItem(Key4TagList, JSON.stringify(state.tagList));
    },
  },
});

export default store;
