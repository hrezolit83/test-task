new Vue({
    el: '#app',
    data: {
        users: [],
        newUser: {
            name: '',
            email: '',
        },
        selectedUser: null,
        searchTerm: '',
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user =>
                user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
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
        async addUser() {
            try {
                // Предположим, что у вас есть локальный массив usersData
                const newUser = {
                    id: this.users.length + 1, //Cоздаем уникальный ID
                    first_name: this.newUser.name,
                    last_name: '',
                    email: this.newUser.email,
                };
    
                // Сохраняем пользователя локально
                this.users.push(newUser);
    
                // Сбрасываем форму
                this.resetNewUser();
            } catch (error) {
                console.error('Error adding user:', error);
            }
        },
        async deleteUser(userId) {
            try {
                await axios.delete(`https://reqres.in/api/users/${userId}`);
                this.users = this.users.filter(user => user.id !== userId);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
        showUserDetails(user) {
            this.selectedUser = user;
            this.$nextTick(() => {
                document.body.style.overflow = 'hidden';
                document.querySelector('.modal').style.display = 'block';
            });
        },
        closeDetails() {
            this.selectedUser = null;
            document.body.style.overflow = ''; // Разрешить прокрутку фона
            document.querySelector('.modal').style.display = 'none';
        },
        filterUsers() {
            // Обновляем отображаемый список пользователей при вводе в поле поиска
        },
        resetNewUser() {
            this.newUser.name = '';
            this.newUser.email = '';
        },
    },
});
