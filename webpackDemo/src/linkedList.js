//双向链表
import {
    defaultEquals,
    Node
} from './util'
class linkedList {
    constructor(equalsFn = defaultEquals) {
        this.header = undefined
        this.count = 0
        this.equalsFn = equalsFn
    }
    // 链表到达我们需要操作的位置
    getItemAt(index) {
        let node = this.header
        if (index < 0 || index > this.count + 1) {
            return undefined
        } else {
            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
    }
    push(item) {
        let Item = new Node(item)
        let current
        if (this.header == undefined) {
            this.header = Item
        } else {
            current = this.header
            while (current.next !== undefined) {
                current = current.next
            }
            current.next = Item
            Item.prev = current //双向链表
        }
        this.count++
    }
    removeAt(index) {
        let current
        let previous
        if (index < 0 || index > this.count + 1) {
            return undefined
        } else {
            if (index == 0) {
                this.header = this.header.next
                this.header.prev = undefined //双向链表
            } else {
                current = this.getItemAt(index)
                previous = current.prev     //双向链表
                if (index < this.count - 1) {
                    previous.next = current.next
                    current.next.prev = previous //双向链表
                } else {
                    previous.next = current.next
                }
            }
            this.count--
            return current.item
        }
    }
    insert(item, index) {
        if(index < 0 || index > this.count - 1){
          return undefined
        }
         let Item = new Node(item)    
         if(index === 0){
           Item.next = this.header
           this.header.prev = Item
           this.header = Item
         }else{
            let current = this.getItemAt(index)
            let previous = current.prev
            Item.prev = previous
            current.prev = Item
            previous.next = Item
            Item.next = current
         }
         this.count++
    }
    indexOf(value){
      let current = this.header
      for(let i=0;i<this.count;i++){
          if(this.equalsFn(value,current.item)){
            return i
          }
          current = current.next
      }
      return -1
    }
    remove(value){
      let index = this.indexOf(value)
      if(index === -1){
        console.error('value is not in this linkedList')
      }else{
        this.removeAt(index)
      }
    }
    size(){
      return this.count
    }
    isEmpty(){
      return this.count === 0
    }
    getHead(){
      return this.header
    }
    toString(){
      if(this.header == null){
        return ''
      }
      let current = this.header
      let string = `${current.item}`
      current = current.next
      for(let i=0;i<this.count && current != null;i++){
        string = `${string},${current.item}`
        current = current.next
      }
      return string
    }
}

export {
    linkedList
}
