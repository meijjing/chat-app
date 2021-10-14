export default {
    computed: {
        otherUserDetails() {

            if (this.$store.state.stores.users[this.$route.params.otherUserId]) {
                return this.$store.state.stores.users[this.$route.params.otherUserId]
            }

            return {}
        }
    }
}