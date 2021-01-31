// 最坏适应算法
function WF() {
  MBLinkList.call(this);
  // 返回大小大于指定大小且状态符合的内存块节点
  this.findBySize = function (size, status) {
    var nodeArr = this.toArray();
    for (var i = nodeArr.length - 1, len = 0; i >= len; i--) {
      if (nodeArr[i].getElement().getSize() >= size && nodeArr[i].getElement().getStatus() == status) {
        return nodeArr[i];
      }
    }
    return null;
  }
}

(function () {
  var Super = function () {};
  Super.prototype = MBLinkList.prototype;
  WF.prototype = new Super();
  WF.prototype.constructor = WF;
})();
