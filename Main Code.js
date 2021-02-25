const scriptName = "Teaching";

const Fs = FileStream;
const Path = "/sdcard/Teaching/content";

const n = "\n";
const nn = "\n".repeat(2);
const allsee = "\u200d".repeat (500);

var List = null;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    
  if (msg.startsWith(".가르치기 ")) {
    List = JSON.parse(Fs.read(Path));
    if (List[msg.substr(6).split("-")[0]] == undefined) {
      List[msg.substr(6).split("-")[0]] = msg.substr(6).split("-")[1];
      Fs.write(Path, JSON.stringify(List));
      List = null;
      replier.reply(room, "다음 내용을 가르쳤습니다."+n
        +"메시지: "+msg.substr(6).split("-")[0]+n
        +"대답: "+msg.substr(6).split("-")[1]);
    } else {replier.reply(room, "해당 메시지가 이미 존재합니다.");}
  }
  
  if (msg.startsWith(".가르치기삭제 ")) {
    List = JSON.parse(Fs.read(Path));
    if (List[msg.substr(8)] == undefined) {
      replier.reply(room, "해당 메시지를 찾을 수 없습니다.");
    } else {
      replier.reply(room, "다음 내용을 삭제하였습니다."+n
        +"메시지: "+msg.substr(8) +n
        +"대답: "+List[msg.substr(8)]);
      delete List[msg.substr(8)];
      Fs.write(Path, JSON.stringify(List));
      List = null;
    }
  }
  
  if (msg == ".가르치기목록") {
    var sum = [];
    for (i in JSON.parse(Fs.read(Path))) {
      sum.push(
        "메시지: "+i +n
        +"대답: "+JSON.parse(Fs.read(Path))[i] +n);
    }
    replier.reply(room, "가르치기 목록입니다."+allsee+nn+sum.join(n));
    sum = [];
  }
  
  
  if (JSON.parse(Fs.read(Path))[msg] != undefined) replier.reply(JSON.parse(Fs.read(Path))[msg]);
  
  if (msg == ".가르치기리셋") {
    Fs.write(Path, "{}");
    replier.reply("가르치기 목록이 리셋되었습니다.");
  }

}
