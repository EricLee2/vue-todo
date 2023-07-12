import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = [];
        console.log('created called');
        if (localStorage.length > 0) {
            for (var i=0; i < localStorage.length; i++) {
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }
        return arr;
    },
}
export const store = new Vuex.Store({
    state: {
        headerText: 'TODO it!',
        todoItems: storage.fetch() // 이런 구조가 javascript의 최고 기술이 아닌가 싶다... 
    },
    getters: {
        storedTodoItems(state) {
            return state.todoItems;
        }
    },
    mutations: {
        addOneItem(state, todoItem) {
            var obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj); // 형태에 상관없이... push
        },
        removeOneItem(state, {todoItem, index}) {
            localStorage.removeItem(todoItem.item);
                  // data 내용이 변경되면 화면에 바로 반영됨. 최고의 기능!!!
            state.todoItems.splice(index, 1);
        },
        toggleOneItem(state, {todoItem, index}) {
            state.todoItems[index].completed = !state.todoItems[index].completed;
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
          },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
        }
    }
});