import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStudyContext } from "@/context/StudyContext";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { formStyle } from "@/styles/Styles";
import ColorPicker from "@/components/ColorPicker";

const SubjectAddView = () => {
  const colors = ["#ffdbdb", "#fffadb", "#e0ffdb", "#dbfffe", "#dbe0ff", "#f1dbff"];

  const {addSubject} = useStudyContext();
  const [name, setName] = useState<string>("");
  const [weeklyGoal, setWeeklyGoal] = useState<number>(0);
  const [nameError, setNameError] = useState<string | null>(null);
  const [weeklyGoalError, setWeeklyGoalError] = useState<string | null>(null);
  const [color, setColor] = useState<string>(colors[0]);
  const router = useRouter();

  const setNameHandler = (newName: string) => {
    setName(newName);
  }

  const setWeeklyGoalHandler = (newWeeklyGoal: number) => {
    setWeeklyGoal(newWeeklyGoal);
  }

  const setColorHandler = (color: string) => {
    setColor(color);
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
    if (weeklyGoal > 168) {
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
      color: color,
      name: name,
      weeklyGoal: weeklyGoal,
    });
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={formStyle.form}>
        <Text style={formStyle.label}>Color</Text>
        <ColorPicker colors={colors} selectedColor={color} onColorSelected={setColorHandler} />
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

export default SubjectAddView

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
