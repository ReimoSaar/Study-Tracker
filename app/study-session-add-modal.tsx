import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStudyContext } from "@/context/StudyContext";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { formStyle } from "@/styles/Styles";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { PRIMARY_COLOR, SUCCESS_COLOR } from "@/constants/Colors";
import { RadioButton } from "react-native-paper";
import ISubject from "@/types/subject";
import SubjectSelectModal from "@/components/SubjectSelectModal";
import { formatDate } from "@/helper/date-helper";

const StudySessionAddModal = () => {
  const {addStudySession, subjects} = useStudyContext();
  const [date, setDate] = useState<Date | null>(null)
  const [duration, setDuration] = useState<number>(0);
  const [note, setNote] = useState<string>("");
  const [subject, setSubject] = useState<ISubject | null>(null);
  const [subjectSelectModalVisible, setSubjectSelectModalVisible] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [durationError, setDurationError] = useState<string | null>(null);
  const router = useRouter();

  const openDatePickerHandler = () => {
    setShowDatePicker(true);
  }

  const closeDatePickerHandler = () => {
    setShowDatePicker(false);
  }

  const openSubjectSelectModal = () => {
    setSubjectSelectModalVisible(true)
  }

  const closeSubjectSelectModal = () => {
    setSubjectSelectModalVisible(false)
  }

  const setDateHandler = (event: DateTimePickerEvent, date: Date | undefined) => {
    if (event.type == "set") {
      setDate(date ?? null);
    }
    closeDatePickerHandler();
  };

  const setDurationHandler = (newDuration: number) => {
    setDuration(newDuration);
  }

  const setNoteHandler = (newNote: string) => {
    setNote(newNote);
  }

  const setSubjectHandler = (selectedSubject: ISubject) => {
    setSubject(selectedSubject);
    closeSubjectSelectModal();
  }

  const validateFields = (): boolean => {
    let isError: boolean = false;
    setSubjectError(null);
    setDateError(null);
    setDurationError(null);
    if (subject == null) {
      isError = true;
      setSubjectError("Subject must be chosen!");
    }
    if (date == null) {
      isError = true;
      setDateError("Date must be chosen!")
    }
    if (duration == 0) {
      isError = true;
      setDurationError("Duration must be greater than 0!")
    }
    if (duration > 169) {
      isError = true;
      setDurationError("Duration must be smaller than 169!")
    }
    return isError;
  }

  const onSubmit = () => {
    const isError = validateFields();
    if (isError) {
      return;
    }
    addStudySession({
      id: Math.random().toString(),
      createdAt: Date.now().toLocaleString(),
      date: "",
      duration: 0,
      note: "",
      subjectId: "",
    });
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={formStyle.form}>
        <Text style={formStyle.label}>Subject</Text>
        {subjectError ? <Text style={formStyle.errorMessage}>{subjectError}</Text> : <></>}
        <Pressable style={styles.button} onPressOut={openSubjectSelectModal}>
          <Text style={styles.buttonText}>{subject ? subject.name : "Select subject"}</Text>
        </Pressable>
        <Text style={formStyle.label}>Date</Text>
        {dateError ? <Text style={formStyle.errorMessage}>{dateError}</Text> : <></>}
        <Pressable style={styles.button} onPressOut={openDatePickerHandler}>
          <Text style={styles.buttonText}>{date ? formatDate(date) : "Set date"}</Text>
        </Pressable>
        <View/>
        {showDatePicker ?
          <RNDateTimePicker mode={"date"} onChange={setDateHandler} value={date ?? new Date(Date.now())}/> : <></>}
        <Text style={formStyle.label}>Duration (minutes)</Text>
        {durationError ? <Text style={formStyle.errorMessage}>{durationError}</Text> : <></>}
        <TextInput inputMode={"numeric"} style={formStyle.textInput}
                   onChangeText={(value) => setDurationHandler(+value)}
                   value={duration.toString()}/>
        <Text style={formStyle.label}>Note</Text>
        <TextInput multiline={true} style={formStyle.textInput} onChangeText={setNoteHandler} value={note}/>
        <Pressable style={formStyle.submitButton} onPressOut={onSubmit}>
          {() => (
            <Text style={formStyle.submitButtonText}>Create</Text>
          )}
        </Pressable>
        <SubjectSelectModal existingSubject={subject}
                            visible={subjectSelectModalVisible}
                            onSelect={setSubjectHandler}
                            onCancel={closeSubjectSelectModal}/>
      </View>
    </View>
  );
}

export default StudySessionAddModal

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: PRIMARY_COLOR
  },
  button: {
    marginRight: "auto",
    marginBottom: 12
  },
});
