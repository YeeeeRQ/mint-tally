import createID from "@/lib/createID";

const localStorageKeyName = "tagList";

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.tagList;
  },
  findTag: function (id: string) {
    return this.tagList.filter((t) => t.id === id)[0];
  },
  createTag(name: string) {
    name = name.trim();

    if (name === "") {
      window.alert("无法使用空白标签");
      return "blankTag";
    }

    const names = this.tagList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert("标签已存在");
      return "duplicated";
    }

    const id = createID().toString();

    this.tagList.push({ id: id, name: name });
    this.saveTags();
    return "success";
  },
  removeTag(id: string): boolean {
    const idx = this.tagList.findIndex((el) => el.id === id);
    if (idx >= 0) {
      this.tagList.splice(idx, 1);
      this.saveTags();
      return true;
    }
    return false;
  },
  updateTag(id: string, name: string) {
    const tag = this.tagList.filter((item) => item.id === id)[0];
    if (tag) {
      tag.name = name;
      this.saveTags();
      return "success";
    } else {
      return "not found";
    }
  },

  saveTags() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
};

tagStore.fetchTags();

export default tagStore;
