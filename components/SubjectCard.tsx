import { Pressable, StyleSheet, Text, View } from "react-native";
import ISubject from "@/types/subject";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ERROR_COLOR } from "@/constants/Colors";
import { useStudyContext } from "@/context/StudyContext";
import ConfirmModal from "@/components/ConfirmModal";
import DateRange from "@/classes/DateRange";
import StudySessionCard from "@/components/StudySessionCard";
import ProgressBar from "@/components/ProgressBar";

interface IProps {
  subject: ISubject,
  weekOffset: number,
}

const SubjectCard = ({subject, weekOffset}: IProps) => {
  const {studySessions, removeSubject} = useStudyContext();
  const openCloseIconSize = 40;
  const [showSessions, setShowSessions] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const dateRange = DateRange.weekWithOffset(weekOffset);
  const filteredStudySessions = studySessions
    .filter(s => s.subjectId === subject.id)
    .filter(s => {
      const subjectDate = new Date(s.date);
      return subjectDate.getTime() >= dateRange.dateFrom.getTime()
      && subjectDate.getTime() <= dateRange.dateTo.getTime();
    });

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  }

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  }

  const deleteSubject = () => {
    removeSubject(subject.id);
    closeDeleteModal()
  }

  const toggleSetShowSession = () => {
    setShowSessions(!showSessions);
  }

  const calculateMinutesStudied = () => {
    return filteredStudySessions
      .map(studySession => studySession.duration)
      .reduce((a, b) => a + b, 0)
  }

  const calculateCompletion = (): number => {
    let minutesStudied = calculateMinutesStudied();
    return minutesStudied / (subject.weeklyGoal * 60);
  }

  console.log(calculateCompletion());

  return (
    <View style={[styles.card, {backgroundColor: subject.color}]}>
      <View style={styles.mainElements}>
        <Pressable onPressOut={toggleSetShowSession}>
          {showSessions ?
            <Ionicons name={"chevron-up-outline"} size={openCloseIconSize}/> :
            <Ionicons name={"chevron-down-outline"} size={openCloseIconSize}/>
          }
        </Pressable>
        <Text style={styles.subjectName}>{subject.name}</Text>
        <Pressable onPressOut={openDeleteModal}>
          <Ionicons size={30} color={ERROR_COLOR} name={"trash-outline"}/>
        </Pressable>
      </View>
      <View style={styles.progression}>
        <Text style={styles.minutesStudiedText}>{calculateMinutesStudied()} of {subject.weeklyGoal * 60} minutes studied</Text>
        <ProgressBar progress={calculateCompletion()} />
      </View>
      <View>
        {showSessions ?
          filteredStudySessions.map(s => {
            return (
              <StudySessionCard key={s.id} studySession={s} showSubject={false} />
            )
          }) : <></>
        }
      </View>

      <ConfirmModal textContent={"Are you sure you want to delete the subject?"}
                    visible={showDeleteModal}
                    onConfirm={deleteSubject}
                    onCancel={closeDeleteModal}/>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 5
  },
  mainElements: {
    flexDirection: "row",
    alignItems: "center"
  },
  progression: {
    alignItems: "center"
  },
  minutesStudiedText: {
    fontSize: 18
  },
  subjectName: {
    flex: 1,
    fontSize: 20,
    textAlign: "center"
  }
})

export default SubjectCard
