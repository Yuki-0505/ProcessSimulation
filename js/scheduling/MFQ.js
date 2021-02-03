// 多级反馈队列调度算法
function MFQ(sliceTime) {
  Scheduling.call(this);
  this.name = "MFQ";
  this.sliceTime = sliceTime || 2;
  var readyQueueId = 0;

  this.getSliceTime = function () {
    return this.sliceTime * Math.pow(2, -readyQueueId);
  }
  this.run = function () {
    this.running();
    if (this.clock == this.sliceTime * Math.pow(2, -readyQueueId)) {
      this.processRunToFinish();
      this.processRunToWait();
      this.clock = 0;
      if (this.runProcess != null && this.runProcess.isFinished() == false) {
        this.runProcess.setStatus(readyQueueId - 1);
        this.readyQueue.push(this.runProcess);
        this.runProcess = null;
      }
    }
    this.processExternalToReady();
    if (this.clock == 0) {
      if (this.runProcess == null) {
        if (this.readyQueue.length == 0) {
          if (this.waitQueue.length != 0) {
            return true;
          }
          return false;
        }
        this.readyQueue.sort((a, b) => b.getStatus() - a.getStatus());
        this.runProcess = this.readyQueue.shift();
        readyQueueId = this.runProcess.getStatus();
        this.runProcess.setStatus(1);
      }
      return true;
    }
    return true;
  }
}
MFQ.prototype = new Scheduling();
MFQ.prototype.constructor = MFQ;
