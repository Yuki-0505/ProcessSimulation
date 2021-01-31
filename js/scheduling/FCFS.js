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

(function () {
  var Super = function () {};
  Super.prototype = Scheduling.prototype;
  FCFS.prototype = new Super();
  FCFS.prototype.constructor = FCFS;
})();
