import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStudyContext } from "@/context/StudyContext";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { formStyle } from "@/styles/Styles";

const SubjectAddModal = () => {
  const {addSubject} = useStudyContext();
  const [name, setName] = useState<string>("");
  const [weeklyGoal, setWeeklyGoal] = useState<number>(0);
  const [nameError, setNameError] = useState<string | null>(null)
  const [weeklyGoalError, setWeeklyGoalError] = useState<string | null>(null)
  const router = useRouter();

  const setNameHandler = (newName: string) => {
    setName(newName);
  }

  const setWeeklyGoalHandler = (newWeeklyGoal: number) => {
    setWeeklyGoal(newWeeklyGoal);
  }

  const validateFields = (): boolean => {
    let isError: boolean = false;
    setNameError(null);
    setWeeklyGoalError(null);
    if (name.trim() == "") {
      isError = true;
      setNameError("Name must not be empty!");
    }
    if (weeklyGoal == 0) {
      isError = true;
      setWeeklyGoalError("Weekly goal must be greater than 0!")
    }
    if (weeklyGoal > 169) {
      isError = true;
      setWeeklyGoalError("Weekly goal must be smaller than 169!")
    }
    return isError;
  }

  const onSubmit = () => {
    const isError = validateFields();
    if (isError) {
      return;
    }
    addSubject({
      id: Math.random().toString(),
      createdAt: new Date(Date.now()).toISOString(),
      name: name,
      weeklyGoal: weeklyGoal,
    });
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={formStyle.form}>
        <Text style={formStyle.label}>Name</Text>
        {nameError ? <Text style={formStyle.errorMessage}>{nameError}</Text> : <></>}
        <TextInput style={formStyle.textInput} onChangeText={setNameHandler} value={name}/>
        <Text style={formStyle.label}>Weekly goal (hours)</Text>
        {weeklyGoalError ? <Text style={formStyle.errorMessage}>{weeklyGoalError}</Text> : <></>}
        <TextInput inputMode={"numeric"} style={formStyle.textInput}
                   onChangeText={(value) => setWeeklyGoalHandler(+value)}
                   value={weeklyGoal.toString()}/>
        <Pressable style={formStyle.submitButton} onPressOut={onSubmit}>
          {() => (
            <Text style={formStyle.submitButtonText}>Create</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

export default SubjectAddModal

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
