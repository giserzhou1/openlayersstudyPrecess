import {newSet, test} from "./exercise"
// newSet()
// test()
let { log } = console;
import {Stack, newStack} from './stack'
import{linkedList} from './linkedList'

// let stack = new Stack()
// log('查看栈是否为空',stack.isEmpty())
// stack.push(8)
// stack.push(5)
// log(stack.peek())
// log(stack.size())
// log(stack.isEmpty())

// let newstack = new newStack()
// log('查看栈是否为空',newstack.isEmpty())
// newstack.push(8)
// newstack.push(5)
// log(newstack.peek())
// log(newstack.size())
// log(newstack.isEmpty())
// //这里存在一个问题，类的私有属性 外界可以随便更改，应该是只有类的私有方法才能更改
// newstack.count = 0
// log(newstack.isEmpty())
 let linkedlist = new linkedList()
 linkedlist.push(1)
 linkedlist.push(2)
 linkedlist.push(8)
 linkedlist.push(5)
 console.log(linkedlist)
 log(linkedlist.removeAt(3))
 console.log(linkedlist)
 linkedlist.insert(10,2)
 console.log(linkedlist)
 log(linkedlist.indexOf(10))
 linkedlist.remove(10)
 linkedlist.remove(11)
 log(linkedlist.toString())
 linkedlist.insert(9,0)
 console.log(linkedlist)