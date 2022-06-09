<template>
    <Layout>
        <div class="navBar">
            <Icon name="right" @click="goBack" />
            <span class="title">编辑标签</span>
        </div>
        <div class="form-wrapper">
            <EditItem @update:value="updateTag"
            :value="tag.name" field-name="标签名" placeholder="请输入标签名" />
        </div>
        <div class="button-wrapper">
            <Button @click="delTag">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts" >
import { Vue, Component } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
import EditItem from "@/components/Money/EditItem.vue";
import Button from "@/components/Button.vue";
import tagListModel from "@/models/tagListModel";

@Component({
    components: {
        Icon,
        EditItem,
        Button
    }
})
export default class EditLabel extends Vue {
    tag: { id: string, name: string } = {id:'UNKNOWN', name: ''};
    created() {
        const id = this.$route.params.id;

        tagListModel.fetch();
        const tags = tagListModel.data;
        const tag = tags.filter(t => t.id === id)[0];
        if (tag) {
            this.tag = tag
            console.log(tag);
        } else {
            this.$router.replace('/404');
        }
    }

    updateTag(name: string){
        tagListModel.update(this.tag.id, name)
        // console.log('id: ' + this.tag.id + ' name: ' +name);
    }

    delTag() {
        if(tagListModel.remove(this.tag.id)=== 'success'){
            this.goBack()
        }else{
            console.log('delTag ERROR: ' + 'Tag ID: ' + this.tag.id);
        }
    }

    goBack() {
        this.$router.replace('/labels');
        // this.$router.push('/labels');
    }
}
</script>

<style lang="scss" scoped>
.navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    position: relative;

    >.icon {
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translate(0, -50%) rotate(180deg);
    }

}

.form-wrapper {
    background-color: white;
    margin-top: 8px;
}

.button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
}
</style>