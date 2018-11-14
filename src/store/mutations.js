import * as types from './mutation-types'
import Vue from 'vue'
export default {
    [types.SET_LAYOUT](state, {layout}) {
        state.layout = layout
    },
    [types.SET_MODAL](state, {
        name,
        params
    }) {
        Vue.set(state.modal, name, true)
        Vue.set(state.modal.params, name, params)
        console.log(state.modal);

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
    [types.SET_UPDATE_DATA](state, {
        params
    }) {
        state.updateData = params
    },

}
