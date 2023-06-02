const key = 'company'
const company = {
    /* 定义 company 数据对象和它的初始值 */
    state() {
        return {
            company: null
        }
    },
    /* 定义读取方法 getcompany，从 localStorage 中读取 company 数据并转换成 JSON 格式 */
    getters: {
        getcompany: function (state) {
            if (!state.company) {
                state.company = JSON.parse(localStorage.getItem(key))
            }
            return state.company
        }
    },
    /* 定义更改 store 状态的事件 */
    mutations: {
        /* 存数据，将 JSON 格式的数据转化为字符串形式存储到以 localStorage 中以 `company` 为键的值中 */
        $_setCompanyStorage (state, value) {
            state.company = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        /* 清空数据，将状态恢复初始值，并从 localStorage 中移除对象 */
        $_removeCompanyStorage (state) {
            state.company = null
            localStorage.removeItem(key)
        }
    },
    /* 定义调用 mutations 的方法，向上提供调用接口 */
    actions: {
        /* 调用 _setStorage 方法存储数据 */
        savecompanyInfo({ commit }, data) {
            commit('$_setCompanyStorage', data)
        },
        /* 调用 _removeStorage 方法清空数据 */
        clearcompanyInfo({ commit }) {
            commit('$_removeCompanyStorage');
        }
    }
};

export default company