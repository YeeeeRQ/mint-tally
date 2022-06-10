import clone from "@/lib/clone";

const localStorageKeyName = "recordList";
const recordListModel = {
  data:[] as RecordItem[],
  create(record: RecordItem){
    const record_copy: RecordItem = clone(record)
    record_copy.createdAt = new Date()
    this.data.push(record_copy);
  },
  fetch(): RecordItem[] {
    this.data = JSON.parse(
      localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
    return this.data;
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default recordListModel;
