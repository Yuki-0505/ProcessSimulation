// 数据结构Node对象
function Node(element) {
  this.element = element;
  this.next = null;
  this.getElement = function () {
    return this.element
  }
  this.getNext = function () {
    return this.next;
  }
  this.setNext = function (node) {
    this.next = node;
  }
}
