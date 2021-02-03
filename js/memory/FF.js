// 首次适应算法
function FF() {
  MBLinkList.call(this);
  // 返回大小大于指定大小且状态符合的内存块节点
  this.findBySize = function (size, status) {
    for (var temp = this.head; temp != null; temp = temp.getNext()) {
      if (temp.getElement().getSize() >= size && temp.getElement().getStatus() == status) {
        return temp;
      }
    }
    return null;
  }
}
FF.prototype = new MBLinkList();
FF.prototype.constructor = FF;
