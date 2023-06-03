const key = 'merchant'
const merchant = {
    /* 定义 merchant 数据对象和它的初始值 */
    state() {
        return {
            merchant: null
        }
    },
    /* 定义读取方法 getmerchant，从 localStorage 中读取 merchant 数据并转换成 JSON 格式 */
    getters: {
        getmerchant: function (state) {
            if (!state.merchant) {
                state.merchant = JSON.parse(localStorage.getItem(key))
            }
            return state.merchant
        }
    },
    /* 定义更改 store 状态的事件 */
    mutations: {
        /* 存数据，将 JSON 格式的数据转化为字符串形式存储到以 localStorage 中以 `merchant` 为键的值中 */
        $_setMerchantStorage (state, value) {
            state.merchant = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        /* 清空数据，将状态恢复初始值，并从 localStorage 中移除对象 */
        $_removeMerchantStorage (state) {
            state.merchant = null
            localStorage.removeItem(key)
        }
    },
    /* 定义调用 mutations 的方法，向上提供调用接口 */
    actions: {
        /* 调用 _setStorage 方法存储数据 */
        savemerchantInfo({ commit }, data) {
            commit('$_setMerchantStorage', data)
        },
        /* 调用 _removeStorage 方法清空数据 */
        clearmerchantInfo({ commit }) {
            commit('$_removeMerchantStorage');
        }
    }
};

export default merchant