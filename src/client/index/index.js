import Vue from "vue";
import Hello from "./Hello.vue";

new Vue({
    data(){
        return{
            msg:"Hello World"
        }
    },
    components:{
        Hello
    }
}).$mount("#App");