// 循环首次适应算法
function NF() {
  MBLinkList.call(this);
  // 循环指针
  this.flagAddress = 0;
  // 返回大小大于指定大小且状态符合的内存块节点
  this.findBySize = function (size, status) {
    for (var temp = this.head; temp != null; temp = temp.getNext()) {
      if (temp.getElement().getSize() >= size && temp.getElement().getStatus() == status) {
        if (temp.getElement().getAddress() >= this.flagAddress) {
          this.flagAddress = temp.getElement().getAddress();
          return temp;
        }
      }
    }
    if (this.flagAddress == 0) {
      return null;
    }
    this.flagAddress = 0;
    return this.findBySize(size, status);
  }
}
NF.prototype = new MBLinkList();
NF.prototype.constructor = NF;
