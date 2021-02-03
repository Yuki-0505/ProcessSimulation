// 先来先服务算法
function FCFS() {
  Scheduling.call(this);
  this.name = "FCFS";
  this.run = function () {
    this.running();
    this.processRunToFinish();
    this.processRunToWait();
    this.processExternalToReady();
    return this.processReadyToRun();
  }
}
FCFS.prototype = new Scheduling();
FCFS.prototype.constructor = FCFS;
