// 最佳适应算法
function BF() {
  MBLinkList.call(this);
  // 返回大小大于指定大小且状态符合的内存块节点
  this.findBySize = function (size, status) {
    var nodeArr = this.toArray();
    for (var i = 0, len = nodeArr.length; i < len; i++) {
      if (nodeArr[i].getElement().getSize() >= size && nodeArr[i].getElement().getStatus() == status) {
        return nodeArr[i];
      }
    }
    return null;
  }
}
BF.prototype = new MBLinkList();
BF.prototype.constructor = BF;
