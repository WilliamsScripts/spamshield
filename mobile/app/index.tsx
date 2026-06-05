import React, { useState, useRef } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import axios from "axios";
import AnalysisSheet from "@/components/analysis-sheet";
import useTheme from "@/hooks/use-theme-color";

export default function HomeScreen() {
  const theme = useTheme();

  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);

  const sheetRef = useRef<any>(null);

  const analyze = async () => {
    const res = await axios.post(
      "https://spamshield-3hfx.onrender.com/predict",
      { message: text },
    );

    console.log("res.data", res.data);
    setResult(res.data);

    // 👇 WAIT FOR STATE UPDATE SAFELY
    setTimeout(() => {
      sheetRef.current?.open();
    }, 100);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: 16 }}>
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: "700" }}>
        SpamShield
      </Text>

      <TextInput
        placeholder="Paste message..."
        placeholderTextColor={theme.subtext}
        value={text}
        onChangeText={setText}
        multiline
        style={{
          marginTop: 16,
          padding: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border,
          color: theme.text,
          backgroundColor: theme.card,
        }}
      />

      <Pressable
        onPress={analyze}
        style={{
          marginTop: 12,
          backgroundColor: theme.text,
          padding: 14,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: theme.bg, textAlign: "center" }}>
          Analyze Message
        </Text>
      </Pressable>

      {/* ALWAYS MOUNTED */}
      {result && <AnalysisSheet ref={sheetRef} data={result} />}
    </View>
  );
}
