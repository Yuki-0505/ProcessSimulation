// 时间片轮转调度算法
function RR(sliceTime) {
  Scheduling.call(this);
  this.name = "RR";
  this.sliceTime = sliceTime || 2;
  this.run = function () {
    this.running();
    if (this.clock == this.sliceTime) {
      this.processRunToFinish();
      this.processRunToWait();
      this.clock = 0;
      if (this.runProcess != null && this.runProcess.isFinished() == false) {
        this.runProcess.setStatus(0);
        this.readyQueue.push(this.runProcess);
        this.runProcess = null;
      }
    }
    this.processExternalToReady();
    if (this.clock == 0) {
      return this.processReadyToRun();
    }
    return true;
  }
}

(function () {
  var Super = function () {};
  Super.prototype = Scheduling.prototype;
  RR.prototype = new Super();
  RR.prototype.constructor = RR;
})();
