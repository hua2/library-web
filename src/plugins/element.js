import Vue from 'vue'
import { Alert, Button } from 'element-ui'

import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import { Input } from 'element-ui'
import { Loading } from 'element-ui'
import { Backtop } from 'element-ui'
import { Menu, MenuItem } from 'element-ui'
import { Submenu } from 'element-ui'
import { Form, FormItem } from 'element-ui'
import { Checkbox, CheckboxGroup } from 'element-ui'
import { Dialog } from 'element-ui'
import { Upload } from 'element-ui'
import { Radio, RadioGroup, RadioButton } from 'element-ui'
import { Cascader } from 'element-ui'
import { DatePicker } from 'element-ui'
import { Pagination } from 'element-ui'
import { Table, TableColumn } from 'element-ui'
import { Select } from 'element-ui'
import { Option } from 'element-ui'
import { Card } from 'element-ui'

import '@/assets/scss/element-variables.scss'

Vue.use(Button)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Alert)
Vue.use(Backtop)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Cascader)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(Card)
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
