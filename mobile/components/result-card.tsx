import React from "react";
import { View, Text } from "react-native";
import ConfidenceGauge from "./confidence-gauge";

export default function ResultCard({ data }: any) {
  const isSpam = data.prediction === "spam";

  return (
    <View
      style={{
        marginTop: 20,
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        Result: {isSpam ? "🚨 SPAM DETECTED" : "✅ SAFE MESSAGE"}
      </Text>

      <View style={{ marginVertical: 20 }}>
        <ConfidenceGauge value={data.confidence} />
      </View>

      <Text style={{ fontWeight: "600" }}>Reasons</Text>
      {data.reasons.map((r: string, i: number) => (
        <Text key={i}>• {r}</Text>
      ))}

      <Text style={{ fontWeight: "600", marginTop: 10 }}>Suspicious Words</Text>
      <Text>{data.suspicious_words.join(", ")}</Text>

      <Text style={{ fontWeight: "600", marginTop: 10 }}>
        Patterns Detected
      </Text>
      {data.patterns.map((p: string, i: number) => (
        <Text key={i}>• {p}</Text>
      ))}

      {data.companies_detected?.length > 0 && (
        <>
          <Text style={{ fontWeight: "600", marginTop: 10 }}>Entities</Text>
          <Text>{data.companies_detected.join(", ")}</Text>
        </>
      )}
    </View>
  );
}
