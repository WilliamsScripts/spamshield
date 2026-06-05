import useTheme from "@/hooks/use-theme-color";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import ConfidenceRing from "./confidence-ring";

function Chip({ label }: any) {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: theme.border,
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      <Text style={{ color: theme.text, fontSize: 12 }}>{label}</Text>
    </View>
  );
}

function Section({ title, children }: any) {
  const theme = useTheme();

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ color: theme.subtext, marginBottom: 8, fontSize: 12 }}>
        {title}
      </Text>
      <View>{children}</View>
    </View>
  );
}

export default function ResultView({ data }: any) {
  const theme = useTheme();

  const isSpam = data.prediction === "spam";

  const mainColor = isSpam ? theme.danger : theme.success;

  return (
    <ScrollView
      style={{ marginTop: 20 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* HEADER */}
      <View
        style={{
          backgroundColor: theme.card,
          padding: 18,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: theme.text }}>
          {isSpam ? "🚨 Spam Detected" : "✅ Message Looks Safe"}
        </Text>

        <Text style={{ color: theme.subtext, marginTop: 4 }}>
          AI analysis result
        </Text>

        <View style={{ marginTop: 16, alignItems: "center" }}>
          <ConfidenceRing value={data.confidence} color={mainColor} />
        </View>
      </View>

      {/* BREAKDOWN */}
      <View
        style={{
          backgroundColor: theme.card,
          marginTop: 16,
          padding: 16,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Section title="Reason">
          {data.reasons.map((r: string) => (
            <Text key={r} style={{ color: theme.text }}>
              • {r}
            </Text>
          ))}
        </Section>

        <Section title="Suspicious Words">
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {data.suspicious_words.map((w: string) => (
              <Chip key={w} label={w} />
            ))}
          </View>
        </Section>

        <Section title="Detected Patterns">
          {data.patterns.map((p: string) => (
            <Text key={p} style={{ color: theme.text }}>
              • {p}
            </Text>
          ))}
        </Section>

        {data.companies_detected?.length > 0 && (
          <Section title="Entities Detected">
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {data.companies_detected.map((c: string) => (
                <Chip key={c} label={c} />
              ))}
            </View>
          </Section>
        )}
      </View>
    </ScrollView>
  );
}
