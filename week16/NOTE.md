# 组件
不用css去实现动画的原因之一是: css的动画用matrix做的, 而matrix加了skew参数之后, transform, scale等属性是不可逆的; css动画在用户操作暂停等高级操作的时候,代码上没有js易操作

自定义事件使用new CustomEvent('eventName', detail: {}), 其中, detail里面是参数, 自定义的事件触发用dispatch方法.