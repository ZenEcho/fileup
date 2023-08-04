<template>
    <div>
        <button @click="triggerToast" class="green-button">
            See a notification
        </button>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
    setup() {
        const toast = useToast();
        return { toast }
    },

    methods: {
        triggerToast() {
            this.toast.success("I'm a toast!", {
                
            });
        }
    }
}
</script>

