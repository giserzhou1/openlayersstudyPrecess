function defaultEquals(a, b){
   return a === b
}
class Node{
  constructor(item){
    this.item = item
    this.next = undefined
    this.prev = undefined
  }
}
export{defaultEquals,Node}