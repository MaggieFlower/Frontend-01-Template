import {createElement, ListView, Text} from  './createElement'
import  './list-view.css'
let list = <ListView data={[
    {
      title: 'something exciting',
      url: 'https://image.shutterstock.com/image-illustration/something-exciting-underway-fun-learnbackground-600w-1515540764.jpg'}, {
      title: 'kids',
      url: 'https://image.shutterstock.com/image-vector/health-card-boy-snake-bite-260nw-390890197.jpg'}, {
      title: 'heavy light',
      url: 'https://image.shutterstock.com/image-vector/opposite-adjectives-heavy-light-illustration-600w-353189504.jpg'
    }
  ]} class="list-view">
  {
    record => {
      return record.map(item => {
        return  <div class="div">
                    <img src={item.url} class="img"/>
                    <div>{item.title}</div>
                </div>
      })
    }
  }

</ListView>
console.log(list)
list.mountTo(document.body)
