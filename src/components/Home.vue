<template>
    <div class="row">
        <div class="card card-primary" style="width:100%">
            <input v-model="state.id" type="hidden" />
            <div class="card-body">
                <div class="form-group">
                    <label>Title</label>
                    <input v-model="state.title" type="text" class="form-control" />
                </div>
                <div class="form-group">
                    <label>Author</label>
                    <input v-model="state.author" type="text" class="form-control" />
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" @click="onSubmit">
                    Submit
                </button> <button class="btn btn-info" @click="clearForm">
                    Clear
                </button>
            </div>
        </div>
        <div class="col-xs-12 table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in datas" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ data.title }}</td>
                        <td>{{ data.author }}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" @click="edit(data)"><i class="fas fa-pencil"></i></button> <button class="btn btn-sm btn-danger" @click="destroy(data)"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import BookService from '../services/book.js';

const state = reactive({
    id:"",
    title: "",
    author: "",
});

const datas = ref([]);

const clearForm = () => {
    state.id = "";
    state.title = "";
    state.author = "";    
}

const getData = () => {
    clearForm();
    BookService.list()
    .then(response => {
        datas.value = response.data
    });
}

const edit = (data) => {
    state.id = data.id;
    state.title = data.title;
    state.author = data.author;
}

const destroy = (data) => {
    confirm('Delete data?');
    BookService.destroy(data.id)
    .then(response => {
        alert(response.data.message);
        getData();
    });
};

const onSubmit = () => {
    const params = {...state,};

    if(state.id == ""){
        BookService.store(params)
        .then(response => {
            alert(response.data.message);
            getData();
        });
    }else{
        BookService.update(state.id,params)
        .then(response => {
            alert(response.data.message);
            getData();
        });
    }
};

onMounted(() => {
    getData();
});
</script>
