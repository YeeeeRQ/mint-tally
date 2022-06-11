import tagStore from "./tagStore";
import recordStore from "./recordStore";

const store = {
    ...tagStore,
    ...recordStore
};

export default store;
