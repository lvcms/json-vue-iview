import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
const state = {
    layout: [],
    formSubmit:{},
    button:{}
}


export default {
    name: 'json',
    state,
    getters,
    actions,
    mutations
}
