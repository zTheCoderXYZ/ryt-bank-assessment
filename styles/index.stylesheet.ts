import { StyleSheet } from "react-native";

export const AppColors = {
  light: {
    text: "#11181C",
    screen: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMuted: "#EEF2FF",
    surfaceElevated: "#E2E8F0",
    border: "#CBD5E1",
    primary: "#2563EB",
    textOnPrimary: "#FFFFFF",
    iconOnHeader: "#334155",
  },
  dark: {
    text: "#ECEDEE",
    screen: "#0F172A",
    surface: "#111827",
    surfaceMuted: "#020617",
    surfaceElevated: "#1F2933",
    border: "#1E293B",
    primary: "#1D4ED8",
    textOnPrimary: "#FFFFFF",
    iconOnHeader: "#94A3B8",
  },
};

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 12,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 12,
    alignItems: "center",
    width: "80%",
    borderRadius: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  bioButton: {
    marginTop: 36,
    width: "80%",
  },
  gradientButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  gradientButtonPressed: {
    opacity: 0.9,
  },
  gradientButtonDisabled: {
    opacity: 0.6,
  },
  gradientFill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  gradientButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
  },
  bioError: {
    marginTop: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    padding: 20,
    borderRadius: 12,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: {
    color: "#C62828",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rootLayoutRoot: {
    flex: 1,
  },
  rootLayoutBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCircleText: {
    color: "white",
    fontWeight: "700",
  },
  loadingOverlayBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  mainLayoutHeaderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
  },
  mainLayoutHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  mainLayoutHeaderButton: {
    padding: 6,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextWithIcon: {
    marginLeft: 8,
  },
  buttonDefaultText: {
    fontSize: 16,
    lineHeight: 24,
  },
  settingsHeaderContainer: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  settingsBackButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  settingsHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  settingsRightSpacer: {
    width: 32,
  },
  settingsOptionButton: {
    width: "80%",
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
  settingsOptionButtonActive: {
    backgroundColor: "#2563EB",
  },
  transactionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  transactionCard: {
    width: "80%",
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  transactionButton: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  transactionButtonText: {
    color: "white",
    fontWeight: "600",
  },
  paymentHeaderContainer: {
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  paymentHeaderBackButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  paymentHeaderTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  paymentHeaderRightSpacer: {
    width: 32,
  },
  paymentStep1Container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 12,
    alignItems: "center",
  },
  paymentStep1TabRow: {
    width: "80%",
    flexDirection: "row",
    marginTop: 12,
    borderRadius: 4,
    gap: 8,
  },
  paymentStep1TabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    width: "50%",
    alignItems: "center",
  },
  paymentStep1TabButtonActive: {
    backgroundColor: "#1D4ED8",
  },
  paymentStep1Separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#C0C0C0",
  },
  paymentStep1SemiBoldText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  paymentStep3Container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 12,
    alignItems: "center",
  },
  paymentStep3SemiBoldText: {
    fontWeight: "600",
  },
});
