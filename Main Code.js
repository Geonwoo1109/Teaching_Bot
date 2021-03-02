const scriptName = "Teaching";

const Fs = FileStream;
const Path = "/sdcard/Teaching/";

const n = "\n";
const nn = "\n".repeat(2);
const allsee = "\u200d".repeat (500);

var List = null;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
try {
  
  
  if (Fs.read(Path+room) == null) Fs.write(Path+room, "{\"reply\":{}, \"include\":{}}");
  
  if (JSON.parse(Fs.read(Path+room)).reply[msg] != undefined) replier.reply(JSON.parse(Fs.read(Path+room)).reply[msg]);
  /*
  if (msg.includes(JSON.parse(Fs.read(Path+room)).include[msg]) == true) replier.reply(1+JSON.parse(Fs.read(Path+room)).include[msg]);
  
  replier.reply(Object.keys(JSON.parse(Fs.read(Path+room)).include));
  replier.reply(msg.includes(JSON.stringify(JSON.parse(Fs.read(Path+room)).include)));
  */
  for (i in JSON.parse(Fs.read(Path+room)).include) {
    //replier.reply(i+n+String(msg).includes(String(i)));
    if (String(msg).includes(String(i)) == true) replier.reply(JSON.parse(Fs.read(Path+room)).include[i]);
  }
  
  if (msg.startsWith(".가르치기 ")) {
    List = JSON.parse(Fs.read(Path+room));
    //replier.reply(JSON.stringify(List,null,4));
    if (List.reply[msg.substr(6).split("-")[0]] == undefined) {
      List.reply[msg.substr(6).split("-")[0]] = msg.substr(6).split("-")[1];
      Fs.write(Path+room, JSON.stringify(List));
      List = null;
      replier.reply(room, "다음 내용을 가르쳤습니다."+n
        +"메시지: "+msg.substr(6).split("-")[0]+n
        +"대답: "+msg.substr(6).split("-")[1]);
    
  
    } else {replier.reply(room, "해당 메시지가 이미 존재합니다.");}
  }
  
  if (msg.startsWith(".가르치기삭제 ")) {
    List = JSON.parse(Fs.read(Path+room));
    if (List.reply[msg.substr(8)] == undefined) {
      replier.reply(room, "해당 메시지를 찾을 수 없습니다.");
    } else {
      replier.reply(room, "다음 내용을 삭제하였습니다."+n
        +"메시지: "+msg.substr(8) +n
        +"대답: "+List.reply[msg.substr(8)]);
      delete List.reply[msg.substr(8)];
      Fs.write(Path+room, JSON.stringify(List));
      List = null;
    }
  }
  if (msg.startsWith(".가르치기포함삭제 ")) {
    List = JSON.parse(Fs.read(Path+room));
    if (List.include[msg.substr(10)] == undefined) {
      replier.reply(room, "해당 메시지를 찾을 수 없습니다.");
    } else {
      replier.reply(room, "다음 내용을 삭제하였습니다."+n
        +"메시지: "+msg.substr(10) +n
        +"대답: "+List.include[msg.substr(10)]);
      delete List.include[msg.substr(10)];
      Fs.write(Path+room, JSON.stringify(List));
      List = null;
    }
  }
  
  if (msg.startsWith(".가르치기포함 ")) {
    List = JSON.parse(Fs.read(Path+room));
    if (List.include[msg.substr(8).split("-")[0]] == undefined) {
      List.include[msg.substr(8).split("-")[0]] = msg.substr(8).split("-")[1];
      Fs.write(Path+room, JSON.stringify(List));
      List = null;
      replier.reply(room, "다음 내용을 가르쳤습니다."+n
        +"이 내용이 들어가면: "+msg.substr(8).split("-")[0]+n
        +"대답: "+msg.substr(8).split("-")[1]);
    } else {replier.reply(room, "해당 메시지가 이미 존재합니다.");}
    
  }
  
  if (msg == ".가르치기목록") {
    var sum1 = [];
    for (i in JSON.parse(Fs.read(Path+room)).reply) {
      sum1.push(
        "메시지: "+i +n
        +"대답: "+JSON.parse(Fs.read(Path+room)).reply[i] +n);
    }
    var sum2 = [];
    for (i in JSON.parse(Fs.read(Path+room)).include) {
      sum2.push(
        "메시지: "+i +n
        +"대답: "+JSON.parse(Fs.read(Path+room)).include[i] +n);
    }
    
    replier.reply(room, "가르치기 목록입니다."+allsee+nn
      +"[이렇게 말하면..]"+n
      +sum1.join(n)+nn
      +"[이 내용이 들어가면..]"+n
      +sum2.join(n));
    sum1 = [];
    sum2 = [];
  }
  

  if (msg == ".가르치기리셋") {
    Fs.write(Path+room, "{\"reply\":{}, \"include\":{}}");
    replier.reply("가르치기 목록이 리셋되었습니다.");
    
  }

} catch (e) { replier.reply(e+e.lineNumber);}

}
