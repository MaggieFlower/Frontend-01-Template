import '../lib/container.css'
import {createElement, Carousel, Text} from '../lib/main'
let carousel = < Carousel class="container">
    <img src="./img/1.jpg" enableGesture={true} dragstart={(event) => event.preventDefault()}/>
    <img src="./img/2.jpg" enableGesture={true} dragstart={(event) => event.preventDefault()}/>
    <img src="./img/3.jpg" enableGesture={true} dragstart={(event) => event.preventDefault()}/>
    <img src="https://image.shutterstock.com/image-vector/opposite-adjectives-sad-happy-illustration-260nw-347331209.jpg" enableGesture={true} dragstart={(event) => event.preventDefault()}/>
    <img src="https://image.shutterstock.com/image-vector/opposite-adjectives-heavy-light-illustration-600w-353189504.jpg" enableGesture={true} dragstart={(event) => event.preventDefault()}/>
  </ Carousel>
carousel.mountTo(document.body)