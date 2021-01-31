function MBLinkList() {
  this.head = new Node(new MB(100, 0, 0));
  this.getHead = function () {
    return this.head;
  }
  // 通过起址查找并返回
  this.findByAddress = function (address, status) {
    for (var temp = this.head; temp != null; temp = temp.getNext()) {
      if (temp.getElement().getAddress() == address && temp.getElement().getStatus() == status) {
        return temp;
      }
    }
    return null;
  }
  // 合并未分配内存块
  this.mergeUnassigned = function () {
    for (var temp = this.head, next = temp.getNext(); next != null; next = next.getNext()) {
      if (temp.getElement().getStatus() == 0 && next.getElement().getStatus() == 0) {
        temp.getElement().setSize(temp.getElement().getSize() + next.getElement().getSize());
        temp.setNext(next.getNext());
      } else {
        temp = next;
      }
    }
  }
  // 将指定内存块分配指定大小，并为剩余空间创建内存块
  this.parting = function (node, size) {
    if (node.getElement().getSize() > size) {
      var temp = new Node(new MB(node.getElement().getSize() - size, node.getElement().getAddress() + size, 0));
      temp.setNext(node.getNext());
      node.setNext(temp);
    }
    node.getElement().setSize(size);
    node.getElement().setStatus(1);
  }
  // 返回按大小递增排序后的Node数组
  this.toArray = function () {
    var arr = [];
    for (var temp = this.head; temp != null; temp = temp.getNext()) {
      arr.push(temp);
    }
    arr.sort((a, b) => a.getElement().getSize() - b.getElement().getSize());
    return arr;
  }
  // 返回内存块MB数组
  this.toElementsArray = function () {
    var arr = [];
    for (var temp = this.head; temp != null; temp = temp.getNext()) {
      arr.push(temp.getElement());
    }
    return arr;
  }
  // 打印信息
  this.logInfo = function () {
    for (var temp = this.head; temp != null; temp = temp.getNext()) {
      temp.getElement().logInfo();
    }
  }
}
