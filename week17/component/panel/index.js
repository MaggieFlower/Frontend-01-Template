import {createElement, Panel, Text} from  './createElement'
import './index.css'
let panel = <Panel title="bigTitle1" data={['用户', '设置', '角色', '任务', '清单']} class="index">
  <span>用户</span>
  <span>设置</span>
  <span>角色</span>
  <span>任务</span>
  <span>清单</span>
</Panel>
panel.mountTo(document.body)