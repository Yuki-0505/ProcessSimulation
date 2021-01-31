var scheduling = null;
var memoryManager = new MemoryManager();
var count = 0;
var t = null;

var beginButton = document.querySelector('.button-area .control .button.begin');
var waitButton = document.querySelector('.button-area .control .wait');
var sliceTimeButton = document.querySelector('.button-area .control .sliceTime');
var insertButton = document.querySelector('.button-area .control .insert');
insertButton.onclick = function () {
  if (scheduling == null) {
    var radios = document.getElementsByName('scheduling');
    for (var i = 0, len = radios.length; i < len; i++) {
      if (radios[i].checked == true) {
        scheduling = createScheduling(radios[i].value);
        console.log("调度算法：", radios[i].value);
      }
      radios[i].setAttribute("disabled", "disabled");
    }
    radios = document.getElementsByName('memory');
    for (var i = 0, len = radios.length; i < len; i++) {
      if (radios[i].checked == true) {
        memoryManager.init(radios[i].value);
        scheduling.setMemoryManager(memoryManager);
        console.log("内存算法：", radios[i].value);
      }
      radios[i].setAttribute("disabled", "disabled");
    }
    sliceTimeButton.setAttribute("disabled", "disabled");
    document.querySelector('.button-area .control .sliceTime input').setAttribute("disabled", "disabled");
  }
  var arr = [0, "——", 0, 0, 0, 0, "——", "——", "外存"];
  arr[0] = count;
  arr[2] = Math.round(Math.random() * 5) + 2;
  arr[5] = Math.round(Math.random() * 10) + 10;
  if (scheduling.name == "PSA") {
    arr[7] = Math.round(Math.random() * 10);
    memoryManager.pushExternalProcess(new PCB(arr[0], arr[2], arr[5], arr[7]));
  } else {
    memoryManager.pushExternalProcess(new PCB(arr[0], arr[2], arr[5]));
  }

  var table = document.querySelector('.table-area table');
  var row = document.createElement('tr');
  row.setAttribute("align", "center");
  row.setAttribute("class", "gray");
  for (var i = 0; i < 9; i++) {
    var td = document.createElement('td');
    td.innerText = String(arr[i]);
    row.appendChild(td);
  }
  var rouseBtn = document.createElement('button');
  rouseBtn.innerText = "唤醒";
  rouseBtn.setAttribute("disabled", "disabled");
  rouseBtn.setAttribute("id", count);
  rouseBtn.onclick = function () {
    console.log("唤醒", rouseBtn.getAttribute("id"));
    scheduling.processWaitToReady(rouseBtn.getAttribute("id"));
    rouseBtn.setAttribute("disabled", "disabled");
  };
  row.appendChild(rouseBtn);
  table.appendChild(row);
  count++;
  console.log("添加成功", count);
}

function waitToReady(id) {
  console.log("唤醒", id);
  scheduling.processWaitToReady(id);
}

beginButton.onclick = function () {
  if (scheduling == null) {
    return;
  }
  t = setInterval(function () {
    if (scheduling.run() == false) {
      insertButton.setAttribute("disabled", "disabled");
      waitButton.setAttribute("disabled", "disabled");
      insertButton.innerText = "运行结束";
      clearInterval(t);
    }
    beginButton.innerText = "运行时间：" + String(scheduling.getSystemTime());
    showTable();
    showPartition();
    logInfoAll();
  }, 1000);
  beginButton.setAttribute("disabled", "disabled");
  waitButton.removeAttribute("disabled");
  console.log("开始运行");
}

waitButton.onclick = function () {
  var runProcess = null;
  if (scheduling == null || (runProcess = scheduling.getRunProcess()) == null) {
    return;
  }
  runProcess.setStatus(3);
}

function createScheduling(schedulingStr) {
  var temp = null;
  switch (schedulingStr) {
    case "FCFS":
      temp = new FCFS();
      break;
    case "SJF":
      temp = new SJF();
      break;
    case "PSA":
      temp = new PSA();
      break;
    case "HRRN":
      temp = new HRRN();
      break;
    case "RR":
      temp = new RR(document.querySelector('.button-area .control .sliceTime input').value);
      break;
    case "MFQ":
      temp = new MFQ(document.querySelector('.button-area .control .sliceTime input').value);
      break;
  }
  var priorityTh = document.querySelector('.table-area .table tr th:nth-child(8)');
  if (temp.name == "PSA") {
    priorityTh.innerText = "优先级";
  } else if (temp.name == "HRRN") {
    priorityTh.innerText = "响应比";

  }
  if (temp.name != "RR" && temp.name != "MFQ") {
    var sliceTimeValue = document.querySelector('.button-area .control .sliceTime input');
    sliceTimeValue.value = "——";
  }
  return temp;
}

function showTable() {
  var table = document.querySelector('.table-area table');
  var arr = scheduling.getAllProcess();
  for (var i = 1, len = arr.length; i < len; i++) {
    var attrs = arr[i].toArray();
    var len2 = attrs.length;
    for (var j = 0; j < len2 - 1; j++) {
      table.children[i].children[j].innerText = String(attrs[j]);
    }
    table.children[i].setAttribute("class", getColor(attrs[len2 - 1]));
    table.children[i].children[len2 - 1].innerText = getStatusStr(attrs[len2 - 1]);
    if (attrs[8] == 3) {
      table.children[i].children[9].removeAttribute("disabled");
    } else if (attrs[8] == 4) {
      table.children[i].children[1].innerText = "——";
    }
    if (attrs[6] < 0) {
      table.children[i].children[6].innerText = "——";
    }
    if (attrs[7] < 0) {
      table.children[i].children[7].innerText = "——";
    }
    if (scheduling.name == "MFQ") {
      var sliceTimeValue = document.querySelector('.button-area .control .sliceTime input');
      sliceTimeValue.value = String(scheduling.getSliceTime());
    }
  }
}

function showPartition() {
  var partition = document.querySelector('.memory-partition');
  for (var i = 0; i < 100; i++) {
    partition.children[i].setAttribute("class", "gray");
  }
  var sum = 0;
  var arr = scheduling.getMemoryProcess();
  for (var i = 0, len = arr.length; i < len; i++) {
    var address = arr[i].getAddress();
    var size = arr[i].getSize();
    var color = getColor(arr[i].getStatus());
    sum += size;
    while (--size >= 0) {
      partition.children[address + size].setAttribute("class", color);
    }
    partition.children[address].classList.add("class", "border-red");
  }
  if (arr.length == 1) {
    for (var i = 0; i < 5; i++) {
      partition.children[i].setAttribute("class", "gray");
    }
    sum = 0;
    scheduling.memoryManager.getMBList().getHead().getElement().setStatus(0);
    scheduling.memoryManager.getMBList().mergeUnassigned();
  }
  var usageButton = document.querySelector('.button-area .control .usage');
  usageButton.innerText = "内存占用率：" + sum + "%"
}

function getStatusStr(status) {
  var statusEnum = ["就绪", "运行", "完成", "阻塞", "外存", "系统"];
  if (status <= 0) {
    return statusEnum[0];
  } else {
    return statusEnum[status];;
  }
}

function getColor(status) {
  var colorEnum = ["yellow", "green", "red", "orange", "gray", "blue"];
  if (status <= 0) {
    return colorEnum[0];
  } else {
    return colorEnum[status];;
  }
}

function logInfoAll() {
  console.log("systemTime:", scheduling.getSystemTime());
  var arr = scheduling.getAllProcess();
  for (var i = 0, len = arr.length; i < len; i++) {
    arr[i].logInfo();
  }
  scheduling.getMemoryManager().getMBList().logInfo();
}
