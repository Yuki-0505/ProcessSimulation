// 优先级调度算法
function PSA() {
  Scheduling.call(this);
  this.name = "PSA";
  this.run = function () {
    this.readyQueue.sort((a, b) => b.getPriority() - a.getPriority());
    this.running();
    this.processRunToFinish();
    this.processRunToWait();
    this.processExternalToReady();
    return this.processReadyToRun();
  }
}
PSA.prototype = new Scheduling();
PSA.prototype.constructor = PSA;
