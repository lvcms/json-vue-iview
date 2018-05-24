import Index from './components/index'

// layout
import Row from './components/layout-row'
import Col from './components/layout-col'

import Form from './components/form'

import Input from './components/input'
import Switch from './components/switch'
import Radio from './components/radio'
import Checkbox from './components/checkbox'

import Vue from 'vue'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView)

const components = [
  Index,

  Row,
  Col,

  Form,

  Input,
  Switch,
  Radio,
  Checkbox,
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default install
