import tagListModel from "@/models/tagListModel";

export default{
  tagList: tagListModel.fetch(),
  findTag: function (id: string) {
    return this.tagList.filter((t) => t.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === "duplicated") {
      window.alert("标签已存在");
    }
    if (message === "blankTag") {
      window.alert("无法使用空白标签");
    }
  },
  removeTag: (id: string): boolean => {
    return tagListModel.remove(id) === "success";
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },

}