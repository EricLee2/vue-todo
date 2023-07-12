<template>
  <div>
    <transition-group name="list" tag="ul">
    
        <li v-for="(todoItem, index) in this.todoItemsFromGetters" v-bind:key="todoItem.item" class="shadow">
            <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted:todoItem.completed}" 
                v-on:click="toggleComplete(todoItem, index)"></i>
            <span v-bind:class="{textCompleted: todoItem.completed}"> {{ todoItem.item }} </span>
            <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
                <i class="fas fa-trash-alt">d</i>
            </span>
        </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        // todoItemsFromGetters() {
        //     // 사용 시 인자값이 필요 없다...자동기입 됨 
        //     return this.$store.getters.storedTodoItems;
        // }
        // 왜 가져오는 storedTodoItems가 single quotes 안에 들어가나??? 
        ...mapGetters({todoItemsFromGetters: 'storedTodoItems'})
    },
    methods: {
        removeTodo: function(todoItem, index) {
            // this.$emit('removeItem', todoItem, index);
            var obj = {
                todoItem: todoItem,
                index: index
            };
            this.$store.commit('removeOneItem', obj);
            // this.$store.commit('removeOneItem', {todoItem, index});
        }, 
        toggleComplete: function(todoItem, index) {
            // this.$emit('toggleItem', todoItem, index);
            this.$store.commit('toggleOneItem', {todoItem, index})
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}
li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}
.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}
.checkBtnCompleted {
    color: #b3adad;
}
.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
.removeBtn {
    margin-left: auto;
    color: #de4343;
}
/* 리스트 아이템 트랜지션 효과 */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>