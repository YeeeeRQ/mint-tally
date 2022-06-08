const localStorageKeyName = "tagList";
type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated" | "blankTag";
  save: () => void;
};
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

    this.data.push({ id: name, name: name });
    this.save();
    return "success";
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

// 从localStorage获取数据
tagListModel.fetch();

export default tagListModel;
