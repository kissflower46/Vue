<style scoped>
body {
    text-align: center;
    background-color: #f6f6f8;
}
input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

<template>
    <div id="app">
        <!-- TodoHeader -->
        <TodoHeader></TodoHeader>

        <!-- TodoInput -->
        <TodoInput></TodoInput>

        <!-- TodoList -->
        <TodoList
            v-bind:todo-items="todoItems"
            v-on:done-toggle="doneToggle"
            v-on:remove-todo="removeTodo"
        ></TodoList>

        <!-- TodoFooter -->
        <TodoFooter v-on:clear-all="clearAll"></TodoFooter>
    </div>
</template>

<script>
import TodoHeader from "../components/todo/TodoHeader.vue";
import TodoInput from "../components/todo/TodoInput.vue";
import TodoList from "../components/todo/TodoList.vue";
import TodoFooter from "../components/todo/TodoFooter.vue";

import store from "../store/index.js";

export default {
    /* pdtmc^2w */
    props: [],
    data: function () {
        /* 컴포넌트 안에서 사용되는 변수 등록. 개별 변수 */
        return {
            todoItems: [
                { id: 1, todo: "영화보기", done: false },
                { id: 2, todo: "주말 산책", done: true },
                { id: 3, todo: "ES6 학습", done: false },
                { id: 4, todo: "잠실 야구장", done: false }
            ]
        };
    },
    //template: ``,
    methods: {
        /* 이벤트 핸들러 등록 + 일반 함수 */
        addTodo: function (newTodoItem) {
            store.dispatch("addTodo" /*액션명*/, newTodoItem);
        },
        doneToggle: function (id, index) {
            const indexFind = this.$data.todoItems.findIndex((newTodoItem) => {
                return newTodoItem.id === id;
            });
            const newobj = {
                ...this.$data.todoItems[indexFind],
                done: !this.$data.todoItems[indexFind].done
            };
            this.$set(this.$data.todoItems, indexFind, newobj);

            store.dispatch("doneToggle", id, index);
        },
        removeTodo: function (id, index) {
            // delete: ;
            // 참조 타입 변수이면 재할당(=== 깊은 복사) 필요.
            // 방법1: array.splice() 을 사용하는 방법
            // 방법2: array.map() 을 사용하는 방법
            this.$data.todoItems.splice(id, index);
        },
        clearAll: function () {
            // delete
            //this.$data.todoItems = [];
            this.$set(this.$data, "todoItems", []);
        }
    },
    components: {
        /* 전역 컴포넌트는 등록하지 않는다. */
        /* 지역 컴포넌트나 파일 컴포넌트이면 등록해야 한다 . 예시) "태그명" : 컴포넌트명 */
        TodoHeader: TodoHeader,
        TodoInput: TodoInput,
        TodoList: TodoList,
        TodoFooter: TodoFooter
    },
    computed: {
        /* 자동처리 + 동기식. 메서드로 작성. return 필수. */
    },
    watch: {
        /* 자동처리 + 비동기식. data 에 등록된 프로퍼티(변수) 모니터링. 메서드로 작성. 매개변수 필수. 외부 api 호출을 위해서 사용 */
    },
    mounted: function () {
        console.log("mounted");
    },
    updated: function () {
        console.log("updated");
    }
};
</script>