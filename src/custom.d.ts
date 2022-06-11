type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};

type Tag = {
  id: string;
  name: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated" | "blankTag";
  update: (id: string, name: string) => "success" | "not found";
  remove: (id: string) => "success" | "failed";
  save: () => void;
};

interface Window {
  store: {
    tagList: Tag[];
    createTag: (name: string) => void;
    findTag: (id: string) => Tag | undefined;
    removeTag: (id: string) => boolean;
    updateTag: TagListModel["update"];

    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
  };
}
