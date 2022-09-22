import React from "react";
import { View, Alert } from "react-native";

let Result8Digit;
let Result6Digit;
let Result4Digit;

const CodeGenerate = (siteID, key) => {
  let Invalid = true;

  let SiteId = siteID;
  let Key = key;

  let SplitA1 = 0;
  let SplitA2 = 0;
  let SplitB1 = 0;
  let SplitB2 = 0;

  let Output1 = 0;
  let Output1Len = 0;

  let Output2 = 0;
  let Output2Len = 0;

  let ResultA = "00000000";
  let ResultAGrab = 0;

  let ResultB = "00000000";
  let ResultBGrab = 0;

  let ResultC = 0;
  let ResultCLength = 0;
  let ResultCode = 0;

  if (
    parseInt(Key) <= 99999999 &&
    parseInt(Key) >= 1000000 &&
    parseInt(SiteId) <= 99999999 &&
    parseInt(SiteId) >= 1000000
  ) {
    Invalid = false;
  } else {
    Alert.alert(
      "Key or SiteID out of range (Must be between 1000000 and 99999999"
    );
    return (Result8Digit = ""), (Result6Digit = ""), (Result4Digit = "");
  }
  if (Invalid == false) {
    ResultAGrab = 8;
    ResultBGrab = 4;

    ResultA = "00000000";
    ResultB = "00000000";

    SplitA1 = SiteId.slice(0, 4);
    SplitA2 = SiteId.slice(4, 8);

    SplitB1 = Key.slice(0, 4);
    SplitB2 = Key.slice(4, 8);

    SplitA1 = parseInt(SplitA1);
    SplitA2 = parseInt(SplitA2);
    SplitB1 = parseInt(SplitB1);
    SplitB2 = parseInt(SplitB2);

    Output1 = 9999999 * SplitA1 * 9999999 * SplitB2;

    Output1Len = Output1.toString().length;

    Output2 = 9999999 * SplitA2 * 9999999 * SplitB1;
    Output2Len = Output2.toString().length;

    ResultAGrab = ResultAGrab - 1;

    while (
      ((ResultA[5] == "0") | (ResultA[6] == "0") | (ResultA[7] == "0")) &
      (ResultAGrab > -1)
    ) {
      Output1 = Output1.toString();
      ResultA = Output1.slice(ResultAGrab, ResultAGrab + 8);
      ResultAGrab = ResultAGrab - 1;
    }
    while (
      ((ResultB[5] == "0") | (ResultB[6] == "0") | (ResultB[7] == "0")) &
      (ResultBGrab > -1)
    ) {
      Output2 = Output2.toString();
      ResultB = Output2.slice(ResultBGrab, ResultBGrab + 8);
      ResultBGrab = ResultBGrab - 1;
    }

    ResultC = parseInt(ResultA) * parseInt(ResultB);

    ResultCLength = ResultC.toString().length;

    ResultCode = ResultC.toString().slice(
      (ResultCLength - 9) & (ResultCLength - 1)
    );

    Result8Digit = ResultCode.slice(0, 8);
    Result6Digit = ResultCode.slice(0, 6);
    Result4Digit = ResultCode.slice(0, 4);
  }
  return <View></View>;
};

export { Result8Digit, Result6Digit, Result4Digit };

export default CodeGenerate;
