import React, { useMemo, useRef, useImperativeHandle, forwardRef } from "react";
import { View, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import useTheme from "@/hooks/use-theme-color";
import ConfidenceRing from "./confidence-ring";

const AnalysisSheet = forwardRef(({ data }: any, ref: any) => {
  const theme = useTheme();
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "60%", "90%"], []);

  const isSpam = data?.prediction === "spam";
  const color = isSpam ? theme.danger : theme.success;

  useImperativeHandle(ref, () => ({
    open: () => sheetRef.current?.snapToIndex(2),
    close: () => sheetRef.current?.close(),
  }));

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1} // 👈 IMPORTANT: start closed
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: theme.card }}
      handleIndicatorStyle={{ backgroundColor: theme.border }}
    >
      <View style={{ padding: 16, flex: 1 }}>
        <View
          style={{
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: theme.text }}>
            {isSpam ? "🚨 High Risk Message" : "🟢 Safe Message"}
          </Text>

          <Text style={{ color: theme.subtext, marginTop: 4 }}>
            AI security analysis
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <ConfidenceRing value={data?.confidence || 0} color={color} />
        </View>
      </View>
    </BottomSheet>
  );
});

AnalysisSheet.displayName = "AnalysisSheet";
export default AnalysisSheet;
