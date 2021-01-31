function MemoryManager() {
  this.name = null;
  this.externalQueue = []; //外存队列
  this.MBList = null; //内存分区表
  // 初始化内存管理算法类型
  this.init = function (name) {
    this.name = name;
    switch (this.name) {
      case "FF":
        this.MBList = new FF();
        break;
      case "NF":
        this.MBList = new NF();
        break;
      case "BF":
        this.MBList = new BF();
        break;
      case "WF":
        this.MBList = new WF();
        break;
    }
    this.MBList.parting(this.MBList.getHead(), 5);
  }
  // getter方法
  this.getExternalQueue = function () {
    return this.externalQueue;
  }
  this.getMBList = function () {
    return this.MBList;
  }

  // 添加进程到外存队列
  this.pushExternalProcess = function (process) {
    process.setStatus(4);
    this.externalQueue.push(process);
  }

  // 从外存队列中选取合适的进程添加到内存并返回
  this.shiftExternalProcess = function () {
    if (this.externalQueue.length == 0) {
      return null;
    }
    var size = this.externalQueue[0].getSize();
    this.externalQueue[0].toString();
    var node = this.MBList.findBySize(size, 0);
    if (node == null) {
      return null;
    }
    this.MBList.parting(node, size);
    this.externalQueue[0].setAddress(node.getElement().getAddress());
    return this.externalQueue.shift();
  }
  // 释放指定起址处的进程内存
  this.freedMB = function (address) {
    var node = this.MBList.findByAddress(address, 1);
    node.getElement().setStatus(0);
    this.MBList.mergeUnassigned();
  }
}
