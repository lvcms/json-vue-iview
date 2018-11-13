import store from './store'

import Index from './components/index'
import Modal from './components/modal'
// layout
import Row from './components/layout-row'
import Col from './components/layout-col'
import Card from './components/card'
import Tabs from './components/tabs'
import Item from './components/item'

import Form from './components/form'

import Button from './components/button'

import Input from './components/input'
import Switch from './components/switch'
import Radio from './components/radio'
import Checkbox from './components/checkbox'
import Select from './components/select'
import Upload from './components/upload'

import Table from './components/table'
import AgGrid from './components/ag-grid'

import Vue from 'vue'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

const components = [
  Index,
  Modal,
  Row,
  Col,
  Card,
  Tabs,
  Item,
  Form,
  Button,
  Input,
  Switch,
  Radio,
  Checkbox,
  Select,
  Upload,
  Table,
  AgGrid
]

const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}
// 加载 vuex 配置
install.store = store

export default install
