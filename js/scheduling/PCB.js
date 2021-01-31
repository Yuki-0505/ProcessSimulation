function PCB(id, serveTime, size, priority) {
  this.id = id; //进程ID
  this.serveTime = serveTime; //服务时间
  this.arriveTime = 0; //到达时间
  this.runTime = 0; //运行时间
  this.waitTime = 0; //等待时间
  this.size = size; //内存占用大小
  this.address = -1; //在内存中起始位置
  this.priority = priority || -1; //优先级
  this.status = 4; //状态 [-n~0:就绪 1:运行 2:完成 3:阻塞 4:未进入 5:系统]
  // getter方法
  this.getId = function () {
    return this.id;
  }
  this.getArriveTime = function () {
    return this.arriveTime;
  }
  this.getServeTime = function () {
    return this.serveTime;
  }
  this.getPriority = function () {
    return this.priority;
  }
  this.getRunTime = function () {
    return this.runTime;
  }
  this.getWaitTime = function () {
    return this.waitTime;
  }
  this.getSize = function () {
    return this.size;
  }
  this.getAddress = function () {
    return this.address;
  }
  this.getStatus = function () {
    return this.status;
  }
  this.getRoundTime = function () {
    return this.runTime + this.waitTime;
  }
  // setter方法
  this.setServeTime = function (serveTime) {
    this.serveTime = serveTime;
  }
  this.setPriority = function (priority) {
    this.priority = priority;
  }
  this.setArriveTime = function (arriveTime) {
    this.arriveTime = arriveTime;
  }
  this.setRunTime = function (runTime) {
    this.runTime = runTime;
  }
  this.setWaitTime = function (waitTime) {
    this.waitTime = waitTime;
  }
  this.setSize = function (size) {
    this.size = size;
  }
  this.setAddress = function (address) {
    this.address = address;
  }
  this.setStatus = function (status) {
    this.status = status;
  }
  // 自加运算
  this.selfAddRunTime = function () {
    this.runTime++;
  }
  this.selfAddWaitTime = function () {
    this.waitTime++;
  }
  // 判断进程自身是否结束
  this.isFinished = function () {
    return this.runTime >= this.serveTime;
  }
  // 更新响应比
  this.updatePriority = function () {
    this.priority = this.waitTime / this.serveTime;
    this.priority = Math.round(this.priority * 100) / 100
  }
  // 将PCB属性值以数组形式返回
  this.toArray = function () {
    var arr = [];
    arr.push(this.id);
    arr.push(this.arriveTime);
    arr.push(this.serveTime);
    arr.push(this.runTime);
    arr.push(this.waitTime);
    arr.push(this.size);
    arr.push(this.address);
    arr.push(this.priority);
    arr.push(this.status);
    return arr;
  }
  // 将PCB属性值以字符串形式返回
  this.toString = function () {
    return "id:" + this.id +
      "arriveTime:" + this.arriveTime +
      "serveTime:" + this.serveTime +
      "runTime:" + this.runTime +
      "waitTime:" + this.waitTime +
      "size:" + this.size +
      "address:" + this.address +
      "priority:" + this.priority +
      "status:" + this.status +
      "\n";
  }
  // 打印信息
  this.logInfo = function () {
    console.log(
      "id:", this.id,
      "arriveTime:", this.arriveTime,
      "serveTime:", this.serveTime,
      "runTime:", this.runTime,
      "waitTime:", this.waitTime,
      "size:", this.size,
      "address:", this.address,
      "priority:", this.priority,
      "status:", this.status
    );
  }
}
