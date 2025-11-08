import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useStudyContext } from "@/context/StudyContext";
import SubjectCard from "@/components/SubjectCard";
import ISubject from "@/types/subject";
import React, { useState } from "react";
import WeekChangeHeader from "@/components/WeekChangeHeader";

const Index = () => {
  const {subjects} = useStudyContext();
  const [weekOffset, setWeekOffset] = useState<number>(0);

  return (
    <View style={styles.container}>
      {!subjects.length ? <Text style={styles.title}>Add subjects</Text> : <FlatList
        style={styles.subjectList}
        data={subjects}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{height: 20}}/>}
        ListHeaderComponent={<WeekChangeHeader weekOffset={weekOffset} setWeekOffset={setWeekOffset} />}
        renderItem={
          (itemData) => {
            const s: ISubject = itemData.item;
            return (
              <SubjectCard key={s.id} subject={s} weekOffset={weekOffset}/>
            )
          }
        }
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectList: {
    width: "90%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Index;
