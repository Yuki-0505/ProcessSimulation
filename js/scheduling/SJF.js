// 短作业优先算法
function SJF() {
  Scheduling.call(this);
  this.name = "SJF";
  this.run = function () {
    this.readyQueue.sort((a, b) => a.getServeTime() - b.getServeTime());
    this.running();
    this.processRunToFinish();
    this.processRunToWait();
    this.processExternalToReady();
    return this.processReadyToRun();
  }
}
SJF.prototype = new Scheduling();
SJF.prototype.constructor = SJF;
