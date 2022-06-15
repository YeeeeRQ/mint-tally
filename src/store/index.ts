import clone from "@/lib/clone";
import createID from "@/lib/createID";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const Key4RecordList = "recordList";
const Key4TagList = "tagList";

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },

    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;

      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复!");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },

    removeTag(state, id: string) {
      const idx = state.tagList.findIndex((el) => el.id === id);
      if (idx >= 0) {
        state.tagList.splice(idx, 1);
        store.commit("saveTags");
      }
    },

    fetchRecord(state) {
      state.recordList = JSON.parse(
        localStorage.getItem(Key4RecordList) || "[]"
      ) as RecordItem[];
    },

    createRecord(state, record: RecordItem) {
      const record_copy: RecordItem = clone(record);
      record_copy.createdAt = new Date().toISOString();
      state.recordList.push(record_copy);
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
      store.commit("saveTags");
      return "success";
    },

    saveTags(state) {
      localStorage.setItem(Key4TagList, JSON.stringify(state.tagList));
    },
  },
});

export default store;
