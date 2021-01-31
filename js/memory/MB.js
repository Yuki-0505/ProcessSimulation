// 内存块
function MB(size, address, status) {
  this.size = size; //大小
  this.address = address; //起址
  this.status = status; //[0:"未分配", 1:"已分配"]
  this.getSize = function () {
    return this.size;
  }
  this.getAddress = function () {
    return this.address;
  }
  this.getStatus = function () {
    return this.status;
  }
  // setter方法
  this.setSize = function (size) {
    this.size = size;
  }
  this.setAddress = function (address) {
    this.address = address;
  }
  this.setStatus = function (status) {
    this.status = status;
  }
  this.toArray = function () {
    var arr = [];
    arr.push(this.size);
    arr.push(this.address);
    arr.push(this.status);
    return arr;
  }
  this.toString = function () {
    return "size:" + this.size +
      " address:" + this.address +
      " status:" + this.status +
      "\n";
  }
  this.logInfo = function () {
    console.log(
      "size:", this.size,
      "address:", this.address,
      "status:", this.status
    );
  }
}
