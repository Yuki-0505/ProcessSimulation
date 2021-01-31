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

(function () {
  var Super = function () {};
  Super.prototype = Scheduling.prototype;
  HRRN.prototype = new Super();
  HRRN.prototype.constructor = HRRN;
})();
