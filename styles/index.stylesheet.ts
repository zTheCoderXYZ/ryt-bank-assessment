import { StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 12,
    backgroundColor: "#0F172A",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    backgroundColor: "#020617",
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
});
