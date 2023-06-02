const key = 'admin'
const admin = {
    /* 定义 admin 数据对象和它的初始值 */
    state() {
        return {
            admin: null
        }
    },
    /* 定义读取方法 getadmin，从 localStorage 中读取 admin 数据并转换成 JSON 格式 */
    getters: {
        getadmin: function (state) {
            if (!state.admin) {
                state.admin = JSON.parse(localStorage.getItem(key))
            }
            return state.admin
        }
    },
    /* 定义更改 store 状态的事件 */
    mutations: {
        /* 存数据，将 JSON 格式的数据转化为字符串形式存储到以 localStorage 中以 `admin` 为键的值中 */
        $_setAdminStorage (state, value) {
            state.admin = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        /* 清空数据，将状态恢复初始值，并从 localStorage 中移除对象 */
        $_removeAdminStorage (state) {
            state.admin = null
            localStorage.removeItem(key)
        }
    },
    /* 定义调用 mutations 的方法，向上提供调用接口 */
    actions: {
        /* 调用 _setStorage 方法存储数据 */
        saveadminInfo({ commit }, data) {
            commit('$_setAdminStorage', data)
        },
        /* 调用 _removeStorage 方法清空数据 */
        clearadminInfo({ commit }) {
            commit('$_removeAdminStorage');
        }
    }
};

export default admin