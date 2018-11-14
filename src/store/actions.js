import gql from 'graphql-tag'
import * as types from './mutation-types'
/**
 *[eventLayout 获取 layout 布局数据时触发]
 * @param    {[type]}
 */
export const eventLayout = ({commit}, layout) => {
    commit(types.SET_LAYOUT, {layout})
}
/**
 *[eventModal 按钮点击触发弹窗打开]
 * @param    {[type]}
 */
export const eventModal = ({
    commit
}, {
    name,
    params
}) => {
    commit(types.SET_MODAL, {
        name,
        params
    })
}

/**
 *[eventFormSubmit form 提交实现]
 * @param    {[type]}
 */
export const eventFormSubmit = ({
    commit
}, result) => {
    result = result.data.updateModel
    commit(types.SET_FORM_SUBMIT, {
        result
    })
    commit(types.SET_ROOT_FORM_SUBMIT, {result}, {
        root: true
    })
    return {
        result,
        message: result.message
    }
}
/**
 *[eventButton 按钮触发]
 * @param    {[type]}                 mainData       [数据]
 */
export const eventButton = ({commit}, params) => {
    commit(types.SET_BUTTON, {
        params
    })
}
/**
 *[eventUpdate 更新数据事件 更新数据后的返回信息]
 * @param    {[type]}                 mainData       [数据]
 */
export const eventUpdate = ({
    commit
}, params) => {
    commit(types.SET_UPDATE_DATA, {
        params
    })
}
/**
 *[handlerUpdateEvent 处理更新事件]
 * @param    {[type]}
 */
export const handlerUpdateEvent = ({
    commit
}, {
    apollo,
    threadParams,
    params
}) => {
    return apollo.mutate({
        mutation: gql `mutation ($package: String!, $model: String!, $item: String!, $params: String!) {
                updateModel(package: $package, model: $model, item: $item, params: $params) {
                    status,
                    message,
                    value
                }
            }`,
        variables: {
            package: threadParams.package,
            model: threadParams.model,
            item: threadParams.item,
            params: JSON.stringify(params)
        },
    })
}
/**
 *[getValue 获取项目 value]
 * @param    {[type]}
 */
export const getValue = ({
    commit
}, {
    apollo,
    threadParams,
    params
}) => {
    return apollo.query({
        query: gql `query ($package: String!, $model: String!, $item: String!, $params: String!) {
              model(package: $package, model: $model, item: $item, params: $params) {
                value
              }
            }`,
        variables: {
            package: threadParams.package,
            model: threadParams.model,
            item: threadParams.item,
            params: JSON.stringify(params)
        },
        fetchPolicy: 'network-only',
    })
}


