# Teaching_Bot
메신저봇R | 가르치기 명령어 봇입니다

--Json 다루는 방식--
무작정 넣으면 넣어지고, 무작정 지우면 지워진다!

var json = {"a":"b"};
json["c"] = "d"    // json = {"a":"b", "c":"d"}
delete json["a"]   // json = {"c":"d"}


--json 선언 차이--
.a는 a가 문자열일때
[a]는 a가 변수일때


--Object.keys(variable)--
{"a":"b","c":"d","e":"f","g":"h"}
에서 각 제목들만 따로 불러오고 싶은데
// ["a","c","e","g"]

=> Object.keys({"a":"b","c":"d","e":"f","g":"h"})


방에 따라 다르게하는거 성공

단순 자동응답이랑 포함된메시지도 구형 예정

[20210228]
포함메시지 구현 성공

[20210302]
포함된 메시지 목록이 이상하게 표시되는 버그 수정

_사진 가르치는거 추가예정
  1. 이미지 링크 이용 -> 카링이랑 연계
  2. 이미지 자동인식 -> DB + 카링 

수익: 2,000
