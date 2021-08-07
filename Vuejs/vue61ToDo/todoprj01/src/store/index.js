import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todoItems: [
            { id: 1, todo: "영화보기", done: false },
            { id: 2, todo: "주말 산책", done: true },
            { id: 3, todo: "ES6 학습", done: false },
            { id: 4, todo: "잠실 야구장", done: false }
        ]
    },
    //정신없다.
    mutations: {
        addTodo :function(state, newTodoItem) {
            // create
            if (newTodoItem && newTodoItem.trim() !== "") {
                /* max 를 id 를 찾는방법
                                    1. array.reduce() 사용
                                    2. array.map()과 Math.max()를 사용하는 방법
                                */

                // 1. array.reduce() 를 사용하여 newId를 구하는 방법
                var maxObj = null;
                if (this.$data.todoItems.length === 0) {
                    maxObj = {
                        id: 0,
                        todo: "",
                        done: false
                    };
                } else {
                    maxObj = this.$data.todoItems.reduce(function (
                        prevItem,
                        nextItem
                    ) {
                        // 최대 id 값을 갖고있는 item을 찾는다.
                        return prevItem.id > nextItem.id ? prevItem : nextItem; //
                    });
                }
                console.log(maxObj);

                let newid = maxObj.id + 1;

                // 2. map()과 Math.max()를 사용하여 newId를 구하는 방법
                var arrIds = this.$data.todoItems.map(function (el) {
                    return el.id;
                });
                newid = Math.max(...arrIds) + 1;
                state.todoItems.push(newTodoItem);
            }
        }
        , doneToggle: function(state, id, index) {
            const indexFind = state.todoItems.map((item) => {
                if (item.id === id) {
                    item.done = !item.done;
                    return item;
                } else {
                    return item;
                }
            });

            if (index >= 0) {
                this.$set(
                    this.$data.todoItems[index],
                    "done",
                    !this.$data.todoItems[index].done
                );
            }
            state.todoItems = newTodoItem;
        }
        , removeTodo: function(state) {

        }
        , clearAll: function(state) {

        }
    },
    actions: {
        getTodo: function(mutations) {
        },
        addTodo: function (mutations, newTodoItem) {
        },
        doneToggle: function (mutations, param) {
        },
        removeTodo: function (mutations, param) {
        },
        clearAll: function (mutations) {
        }
    },
    modules: {}
});
///
// Vuex 인스턴스 만들기
var store = new Vuex.Store({
    actions: {
        /* 왜 actions를 사용하나? 비동기로 외부 함수 호출하기 위해서
         * actions 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 mutations로 고정.
         * 두번째인자: 값. store.dispatch()호출시 넘겨지는 값.
         */
        set: function( mutations/* 고정 */, param ){
            mutations.commit("set", param );
        },
    },
    mutations: {
        /* 왜 mutations 를 사용하나? state 를 바꾸기 위해서
         * mutations 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 state 로 고정.
         * 두번째인자: 값. mutations.commit() 호출시 넘겨지는 값.
         * */
        set: function(state/* 고정 */, param/* mutations.commit 호출시 넘겨지는 값 */){
            state.인자 = param;
        },
    },
    state: {
        /* vue인스턴스나 컴포넌트의 data 프로퍼티에 해당 */
        인자: "STORE STATE",
    },
    getters: {
        /* state 변경 정보를 컴포넌트에 전달하는 역활.
         * 메서드로 만들어야 하며 메서드명은 state 의 이름을 그대로 사용
         * 첫번째인자: 무조건 state
         * 컴포넌트에서는 computed를 사용하여 store의 state 변경 정보를 자동으로 가져오게 된다.
         * 예시) message()=> store.getters.인자;
         */
        인자: function(state/* 고정 */){
            return state.인자;
        },
    },
});
