import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SUCCESS_COLOR, YELLOW_COLOR } from "@/constants/Colors";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface IProps {
  textContent: string,
  visible: boolean,
  onConfirm: () => void,
  onCancel: () => void,
}

const ConfirmModal = ({textContent, visible, onConfirm, onCancel}: IProps) => {
  return (
    <Modal visible={visible} animationType={"slide"}>
      <SafeAreaView>
        <View style={styles.modalInner}>
          <View style={styles.content}>
            <Text style={styles.title}>{textContent}</Text>
            <View style={styles.buttons}>
              <Pressable onPressOut={onCancel}>
                {() => (
                  <Text
                    style={[
                      styles.buttonInner,
                      styles.cancelButton
                    ]}>Cancel</Text>
                )}
              </Pressable>
              <Pressable onPressOut={onConfirm}>
                {() => (
                  <Text
                    style={styles.buttonInner}>Confirm</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalInner: {
    alignItems: "center",
    width: "100%",
  },
  content: {
    width: "90%"
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    justifyContent: "flex-end"
  },
  title: {
    fontSize: 25,
  },
  buttonInner: {
    backgroundColor: SUCCESS_COLOR,
    color: "#fff",
    fontSize: 17,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15
  },
  cancelButton: {
    backgroundColor: YELLOW_COLOR,
    color: "#000"
  }
});

export default ConfirmModal;
