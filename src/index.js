import Index from './components/index'

// layout
import Row from './components/layout-row'
import Col from './components/layout-col'
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
  Row,
  Col,
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

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default install
