// components/TimezoneTest.jsx
import React, { useState, useEffect } from "react";
import { Card, Button } from "./ui";
import {
  getVietnamTime,
  formatDateToVietnamString,
  parseVietnamDate,
  isTodayVietnam,
  getTodayVietnamString,
  getTomorrowVietnamString,
  formatVietnamDate,
  formatVietnamTime,
  formatVietnamDateTime,
} from "../utils/timezoneUtils.js";

const TimezoneTest = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const [testDate, setTestDate] = useState("2024-09-16");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime({
        local: new Date(),
        vietnam: getVietnamTime(),
        vietnamString: getTodayVietnamString(),
        tomorrowString: getTomorrowVietnamString(),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const testDateConversion = () => {
    const parsed = parseVietnamDate(testDate);
    const formatted = formatDateToVietnamString(parsed);
    const isToday = isTodayVietnam(parsed);

    };

  if (!currentTime) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Timezone Test - Vietnam (UTC+7)</h2>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Current Time Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700">Local Time (Browser)</h4>
            <p className="text-sm text-gray-600">
              {currentTime.local.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-gray-500">
              {currentTime.local.toISOString()}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Vietnam Time (UTC+7)</h4>
            <p className="text-sm text-gray-600">
              {currentTime.vietnam.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-gray-500">
              {currentTime.vietnam.toISOString()}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Date String Tests</h3>
        <div className="space-y-2">
          <div>
            <span className="font-medium">Today (Vietnam): </span>
            <span className="text-blue-600">{currentTime.vietnamString}</span>
          </div>
          <div>
            <span className="font-medium">Tomorrow (Vietnam): </span>
            <span className="text-green-600">{currentTime.tomorrowString}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Date Conversion Test</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <Button onClick={testDateConversion}>Test Conversion</Button>
          </div>
          <div className="text-sm space-y-1">
            <div>
              <span className="font-medium">Formatted Date: </span>
              <span>{formatVietnamDate(testDate)}</span>
            </div>
            <div>
              <span className="font-medium">Is Today: </span>
              <span
                className={
                  isTodayVietnam(parseVietnamDate(testDate))
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {isTodayVietnam(parseVietnamDate(testDate)) ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Time Formatting Tests</h3>
        <div className="space-y-2">
          <div>
            <span className="font-medium">Time String "14:30": </span>
            <span>{formatVietnamTime("14:30")}</span>
          </div>
          <div>
            <span className="font-medium">DateTime: </span>
            <span>{formatVietnamDateTime(new Date())}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimezoneTest;
