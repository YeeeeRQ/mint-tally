const localStorageKeyName = "recordList";
const model = {
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch(): RecordItem[] {
    return JSON.parse(
      localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
  },
  save(data: RecordItem[]) {
    localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
};

export default model;
