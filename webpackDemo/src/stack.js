// 栈 后进先出
class Stack{
  constructor(){
    this.items = []
  }
  // 向栈中添加新元素
  push(item){
    this.items.push(item)
  }
  // 从栈中移除元素，移除最后的一个元素
  pop(){
    return this.items.pop()
  }
  // 查看栈顶元素
  peek(){
    return this.items[this.items.length - 1]  
  }
  // 检查栈是否为空
  isEmpty(){
    return this.items.length === 0
  }
  // 栈的长度
  size(){
    return this.items.length
  }
  // 清除栈元素
  clear(){
    this.items = []
  }
}


class newStack{
     constructor(){
       this.count = 0
       this.items = {}
     }
  // 向栈中添加新元素
     push(item){
       this.items[this.count] = item
       this.count++
     }
  // 栈的长度
     size(){
       return this.count
     }
  // 检查栈是否为空
     isEmpty(){
       return this.count === 0
     }
    // 从栈中移除元素，移除最后的一个元素,并取出这个元素的值
    pop(){
      if(this.isEmpty()){
        return undefined
      }
      this.count--
      let result = this.items[this.count]
      delete this.items[this.count]
      return result
    }
     // 查看栈顶元素
  peek(){
    if(this.isEmpty()){
      return undefined
    }
    return this.items[this.count - 1]  
  }
  clear(){
    this.items = {}
    this.count = 0
  }
  //这个栈的toString 方法
  toString() {
    if (this.isEmpty()) {
    return '';
    }
    let objString = `${this.items[0]}`; // {1}
    for (let i = 1; i < this.count; i++) { // {2}
    objString = `${objString},${this.items[i]}`; // {3}
    }
    return objString;
    }
}
export{Stack,newStack}