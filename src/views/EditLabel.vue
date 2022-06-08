<template>
    <Layout>
        <div>
            <Icon name="right"/>
            <span>编辑标签</span>
        </div>
        <Notes field-name="标签名" placeholder="请输入标签名"/>
    </Layout>
</template>

<script lang="ts" >
import tagListModel from "@/models/tagListModel";
import { Vue, Component } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
import Notes from "@/components/Money/Notes.vue";

@Component({
    components:{
        Notes
    }
})
export default class EditLabel extends Vue {
    created() {
        const id = this.$route.params.id;

        tagListModel.fetch();
        const tags = tagListModel.data;
        const tag = tags.filter(t => t.id === id)[0];
        if (tag) {
            console.log(tag);
        } else {
            this.$router.replace('/404');
        }
    }
}
</script>

<style lang="scss" scoped>

.icon{
    transform: rotate(180deg);
}

</style>