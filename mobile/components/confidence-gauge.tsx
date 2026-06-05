import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const size = 140;
const strokeWidth = 12;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

export default function ConfidenceGauge({ value }: { value: number }) {
  const progress = circumference - value * circumference;

  const color = value > 0.8 ? "#ef4444" : value > 0.5 ? "#f59e0b" : "#22c55e";

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#eee"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <Text
        style={{
          position: "absolute",
          top: 55,
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {Math.round(value * 100)}%
      </Text>

      <Text style={{ marginTop: 10, fontSize: 14, color: "#666" }}>
        Confidence
      </Text>
    </View>
  );
}
