import React, { useState, useEffect, useContext, createContext } from "react";
import dayjs from "dayjs";
import { ContextOneChild } from "../../pages/home";

const TimeSnippet = () => {
  const [nowTime, setNowTime] = useState(dayjs().format("Ah時mm分"));
  const [setChildClock] = useContext(ContextOneChild);
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(dayjs().format("Ah時mm分")); //午前12時05分
      setChildClock(dayjs().format("YYYY-MM-DDTHH:mm:ss"));
    }, 1000);
    return () => clearInterval(timer);
  });
  return nowTime;
};

export default TimeSnippet;
