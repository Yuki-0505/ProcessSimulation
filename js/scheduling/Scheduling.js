function Scheduling() {
  this.sliceTime = 0;
  this.clock = -1;
  this.systemTime = -1;
  this.waitQueue = [];
  this.readyQueue = [];
  this.runProcess = null;
  this.finishQueue = [];
  this.memoryManager = null;
  this.systemProcess = new PCB(-1, 1000, 5, -1);
  // getter方法
  this.getSystemTime = function () {
    return this.systemTime;
  }
  this.getReadyQueue = function () {
    return this.readyQueue;
  }
  this.getRunProcess = function () {
    return this.runProcess;
  }
  this.getFinishQueue = function () {
    return this.finishQueue;
  }
  this.getMemoryManager = function () {
    return this.memoryManager;
  }
  this.setMemoryManager = function (memoryManager) {
    this.memoryManager = memoryManager;
  }
  // 按id排序返回所有进程
  this.getAllProcess = function () {
    var arr = this.getMemoryProcess();
    for (var i = 0, len = this.finishQueue.length; i < len; i++) {
      arr.push(this.finishQueue[i]);
    }
    var externalQueue = this.memoryManager.getExternalQueue();
    for (var i = 0, len = externalQueue.length; i < len; i++) {
      arr.push(externalQueue[i]);
    }
    return arr.sort((a, b) => a.id - b.id);
  }
  // 返回所有在内存中的进程
  this.getMemoryProcess = function () {
    var arr = new Array();
    this.systemProcess.setAddress(0);
    this.systemProcess.setStatus(5);
    arr.push(this.systemProcess);
    if (this.runProcess != null) {
      arr.push(this.runProcess);
    }
    for (var i = 0, len = this.readyQueue.length; i < len; i++) {
      arr.push(this.readyQueue[i]);
    }
    for (var i = 0, len = this.waitQueue.length; i < len; i++) {
      arr.push(this.waitQueue[i]);
    }
    return arr;
  }
  // 添加进程到就绪队列
  this.processExternalToReady = function () {
    var process = null;
    while ((process = this.memoryManager.shiftExternalProcess()) != null) {
      process.setStatus(0);
      process.setArriveTime(this.systemTime);
      this.readyQueue.push(process);
    }
  }
  // 从就绪队列选取进程运行
  this.processReadyToRun = function () {
    if (this.runProcess == null) {
      if (this.readyQueue.length == 0 && this.waitQueue.length == 0) {
        return false;
      }
      if (this.readyQueue.length == 0 || this.readyQueue[0].getStatus() == 3) {
        return true;
      }
      this.runProcess = this.readyQueue.shift();
      this.runProcess.setStatus(1);
    }
    return true;
  }
  // 将运行进程添加到结束队列
  this.processRunToFinish = function () {
    if (this.runProcess != null && this.runProcess.isFinished() == true) {
      this.memoryManager.freedMB(this.runProcess.getAddress());
      this.runProcess.setAddress(-1);
      this.runProcess.setStatus(2);
      this.finishQueue.push(this.runProcess);
      this.runProcess = null;
    }
  }
  // 阻塞
  this.processRunToWait = function () {
    if (this.runProcess == null || this.runProcess.getStatus() != 3) {
      return;
    }
    console.log("阻塞", this.runProcess.getId());
    this.runProcess.setStatus(3);
    this.waitQueue.push(this.runProcess);
    this.runProcess = null;
  }
  // 唤醒
  this.processWaitToReady = function (id) {
    var process = this.getWaitProcessById(id);
    if (process == null) {
      return;
    }
    process.setStatus(0);
    this.readyQueue.push(process);
  }
  // 按id获取阻塞的进程
  this.getWaitProcessById = function (id) {
    var process = null;
    for (var i = 0, len = this.waitQueue.length; i < len; i++) {
      if (this.waitQueue[i].id == id) {
        process = this.waitQueue[i];
        this.waitQueue.splice(i, 1);
        break;
      }
    }
    return process;
  }
  // 更新响应比
  this.updatePriority = function () {
    for (var i = 0, len = this.readyQueue.length; i < len; i++) {
      this.readyQueue[i].updatePriority();
    }
    for (var i = 0, len = this.waitQueue.length; i < len; i++) {
      this.waitQueue[i].updatePriority();
    }
    if (this.runProcess != null) {
      this.runProcess.updatePriority();
    }
  }
  // 运行时间加一
  this.running = function () {
    if (this.runProcess != null) {
      this.runProcess.selfAddRunTime();
    }
    for (var i = 0, len = this.readyQueue.length; i < len; i++) {
      this.readyQueue[i].selfAddWaitTime();
    }
    for (var i = 0, len = this.waitQueue.length; i < len; i++) {
      this.waitQueue[i].selfAddWaitTime();
    }
    this.systemTime++;
    this.clock++;
  }
}
