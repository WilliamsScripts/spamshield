import React from "react";
import { View, Text, ScrollView } from "react-native";
import ConfidenceGauge from "./confidence-gauge";
import useTheme from "@/hooks/use-theme-color";

export default function ResultCard({ data }: any) {
  const isSpam = data.prediction === "spam";
  const theme = useTheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: 20,
        padding: 16,
        borderRadius: 16,
        backgroundColor: `#ffffff05`,
        borderWidth: 0.5,
        borderColor: theme.border,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700", color: theme.text }}>
        {isSpam ? "🚨 SPAM DETECTED" : "✅ SAFE MESSAGE"}
      </Text>

      <View style={{ marginVertical: 20 }}>
        <ConfidenceGauge value={data.confidence} />
      </View>

      {data.reasons.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontWeight: "700",
              color: theme.text,
              marginBottom: 8,
              fontSize: 15,
            }}
          >
            Reasons
          </Text>

          {data.reasons.map((reason: string, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 8,
                padding: 12,
                borderRadius: 12,
                backgroundColor: theme.card,
                borderWidth: 1,
                borderColor: theme.border,
              }}
            >
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 16,
                }}
              >
                ⚠️
              </Text>

              <Text
                style={{
                  flex: 1,
                  color: theme.subtext,
                  lineHeight: 20,
                  textTransform: "capitalize",
                }}
              >
                {reason.replaceAll("_", " ")}
              </Text>
            </View>
          ))}
        </View>
      )}

      {data.suspicious_words.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontWeight: "700",
              color: theme.text,
              marginBottom: 10,
              fontSize: 15,
            }}
          >
            Suspicious Words
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {data.suspicious_words.map((word: string, index: number) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: "#ef444420",
                  borderWidth: 1,
                  borderColor: "#ef444450",
                }}
              >
                <Text
                  style={{
                    color: "#ef4444",
                    fontWeight: "600",
                  }}
                >
                  {word}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {data.patterns.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontWeight: "700",
              color: theme.text,
              marginBottom: 10,
              fontSize: 15,
            }}
          >
            Patterns Detected
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {data.patterns.map((pattern: string, index: number) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: "#f59e0b20",
                  borderWidth: 1,
                  borderColor: "#f59e0b50",
                }}
              >
                <Text
                  style={{
                    color: "#f59e0b",
                    fontWeight: "600",
                  }}
                >
                  {pattern}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {data.companies_detected?.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontWeight: "700",
              color: theme.text,
              marginBottom: 10,
              fontSize: 15,
            }}
          >
            Companies Mentioned
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {data.companies_detected.map((company: string, index: number) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: "#3b82f620",
                  borderWidth: 1,
                  borderColor: "#3b82f650",
                }}
              >
                <Text
                  style={{
                    color: "#60a5fa",
                    fontWeight: "600",
                  }}
                >
                  🏢 {company}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
