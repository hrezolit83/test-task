new Vue({
    el: '#app',
    data: {
        users: [],
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('https://reqres.in/api/users');
                this.users = response.data.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
    },
});
