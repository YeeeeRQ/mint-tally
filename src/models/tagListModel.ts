const localStorageKeyName = "tagList";
type TagListModel = {
  data: string[];
  fetch: () => string[];
  create: (name: string) => 'success' | 'duplicated' | 'blankTag';
  save: () => void;
};
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]");
    return this.data;
  },
  create(name) {
    name = name.trim()
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated';
    }
    if(name === ''){
      return 'blankTag';
    }
    this.data.push(name);
    this.save();
    return 'success';
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

// 从localStorage获取数据
tagListModel.fetch();

export default tagListModel;
