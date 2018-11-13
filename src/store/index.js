import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
const state = {
    layout: [],
    modals: {},
    formSubmit: {},
    button: {},
    updateData: {}
}


export default {
    name: 'json',
    state,
    getters,
    actions,
    mutations
}
