// 高响应比优先调度算法
function HRRN() {
  Scheduling.call(this);
  this.name = "HRRN"
  this.run = function () {
    this.running();
    this.updatePriority();
    this.readyQueue.sort((a, b) => b.getPriority() - a.getPriority());
    this.processRunToFinish();
    this.processRunToWait();
    this.processExternalToReady();
    return this.processReadyToRun();
  }
}
HRRN.prototype = new Scheduling();
HRRN.prototype.constructor = HRRN;
