import clone from "@/lib/clone";

const localStorageKeyName = "recordList";

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(
      localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record_copy: RecordItem = clone(record);
    record_copy.createdAt = new Date();
    this.recordList?.push(record_copy);
    recordStore.saveRecords();
  },
};

recordStore.fetchRecords();

export default recordStore;
