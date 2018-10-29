import * as types from './mutation-types'
export default {
    [types.SET_LAYOUT](state, {layout}) {
        state.layout = layout
    },
    [types.SET_FORM_SUBMIT](state, {
        result
    }) {
        state.formSubmit = result
    },
    [types.SET_BUTTON](state, {
        params
    }) {
        state.button = params
    },

}
