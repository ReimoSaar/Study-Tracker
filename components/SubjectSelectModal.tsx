import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RadioButton } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useStudyContext } from "@/context/StudyContext";
import ISubject from "@/types/subject";
import { formStyle } from "@/styles/Styles";
import { SUCCESS_COLOR, SUCCESS_DISABLED_COLOR, YELLOW_COLOR } from "@/constants/Colors";

interface IProps {
  existingSubject: ISubject | null,
  visible: boolean,
  onSelect: (chosenSubject: ISubject) => void,
  onCancel: () => void
}

const SubjectSelectModal = ({existingSubject, visible, onSelect, onCancel}: IProps) => {
  const {subjects} = useStudyContext();
  const [subject, setSubject] = useState<ISubject | null>();

  useEffect(() => {
    if (!visible) {
      setSubject(null);
    } else if (existingSubject != null) {
      setSubject(existingSubject);
    }
  }, [visible]);

  const setSubjectHandler = (chosenSubject: ISubject) => {
    setSubject(chosenSubject)
  }

  return (
    <Modal visible={visible} style={styles.modal} animationType={"slide"}>
      <View style={styles.modalInner}>
        <View style={[formStyle.form, {height: "100%"}]}>
          <Text style={[formStyle.label, {marginRight: 0}]}>Subjects</Text>
          <View style={styles.line}/>
          <FlatList
            style={styles.subjectList}
            data={subjects}
            keyExtractor={(item) => item.id}
            renderItem={
              (itemData) => {
                const s: ISubject = itemData.item;
                return (
                  <View key={s.id} style={styles.subjectRow}>
                    <Text style={styles.subjectName}>{s.name}</Text>
                    <RadioButton
                      value={s.id}
                      status={s.id === subject?.id ? 'checked' : 'unchecked'}
                      onPress={() => setSubjectHandler(s)}
                    />
                  </View>
                )
              }
            }
          />
          <View style={styles.buttonsContainer}>
            <Pressable style={formStyle.submitButton} onPressOut={onCancel}>
              {() => (
                <Text
                  style={[
                    formStyle.submitButtonText,
                    {
                      backgroundColor: YELLOW_COLOR,
                      color: "#000"
                    }
                  ]}>Cancel</Text>
              )}
            </Pressable>
            <Pressable style={formStyle.submitButton} onPressOut={() => onSelect(subject!)}>
              {() => (
                <Text
                  style={[
                    formStyle.submitButtonText,
                    {backgroundColor: subject == null ? SUCCESS_DISABLED_COLOR : SUCCESS_COLOR}
                  ]}>Create</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
  },
  modalInner: {
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 10,
    flex: 1,
    marginTop: "auto"
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "20%"
  },
  subjectList: {
    height: "60%",
    marginLeft: "auto",
    width: "100%"
  },
  line: {
    marginTop: 10,
    borderBottomColor: "#606060",
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: "100%"
  },
  subjectName: {
    flex: 1
  }
})

export default SubjectSelectModal
