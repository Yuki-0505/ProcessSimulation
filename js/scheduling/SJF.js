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

(function () {
  var Super = function () {};
  Super.prototype = Scheduling.prototype;
  SJF.prototype = new Super();
  SJF.prototype.constructor = SJF;
})();
