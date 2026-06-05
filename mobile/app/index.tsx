import React, { useState, useCallback } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import axios from "axios";
import useTheme from "@/hooks/use-theme-color";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import ResultCard from "@/components/result-card";

export default function HomeScreen() {
  const theme = useTheme();
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const analyze = useCallback(async () => {
    if (text.trim().length < 1) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://spamshield-3hfx.onrender.com/predict",
        { message: text },
      );

      console.log("res.data", res.data);
      setResult(res.data);
    } catch (e: any) {
      console.error(
        "An unexpected error occurred:",
        e?.response?.data?.message || e.message || e.toString(),
      );
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg, padding: 16 }}>
      {!isLoading &&
        (result ? (
          <ResultCard data={result} />
        ) : (
          <>
            <Text
              style={{
                color: theme.text,
                fontSize: 22,
                marginBottom: 8,
                fontWeight: "700",
              }}
            >
              Hello there 👋
            </Text>
            <Text
              style={{
                color: theme.subtext,
                lineHeight: 18,
                fontSize: 14,
                fontWeight: "400",
                marginBottom: 16,
              }}
            >
              Spam Shield helps you detect and analyze messages. Paste any
              message below to see its AI analysis.
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
                minHeight: 200,
                borderColor: theme.border,
                color: theme.text,
                backgroundColor: theme.card,
              }}
            />

            <Pressable
              onPress={analyze}
              style={{
                marginTop: 20,
                backgroundColor: theme.text,
                padding: 14,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: theme.bg, textAlign: "center" }}>
                Analyze Message
              </Text>
            </Pressable>
          </>
        ))}

      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../assets/loader.json")}
            style={{
              width: 300,
              height: 300,
            }}
            autoPlay
            loop
          />
        </View>
      )}
    </SafeAreaView>
  );
}
