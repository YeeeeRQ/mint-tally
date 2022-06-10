import createID from "@/lib/createID";

const localStorageKeyName = "tagList";

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]");
    return this.data;
  },
  create(name) {
    name = name.trim();

    if (name === "") {
      return "blankTag";
    }

    const names = this.data.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      return "duplicated";
    }

    const id = createID().toString()

    this.data.push({ id: id, name: name });
    this.save();
    return "success";
  },
  update(id, name) {
    const tag = this.data.filter((item) => item.id === id)[0];
    if (tag) {
      tag.name = name;
      this.save();
      return "success";
    } else {
      return "not found";
    }
  },
  remove(id){
    const idx = this.data.findIndex((el) => el.id === id);
    if(idx >= 0){
      this.data.splice(idx, 1);
      this.save();
      return 'success'
    }
    return 'failed'
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

// 从localStorage获取数据
tagListModel.fetch();

export default tagListModel;
