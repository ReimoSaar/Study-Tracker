import { createContext, useContext, useState } from "react";
import ISubject from "@/types/subject";
import IStudySession from "@/types/study-session";
import { sub } from "ob1";

interface IContext {
  subjects: ISubject[];
  studySessions: IStudySession[];
  addSubject: (subject: ISubject) => void;
  addStudySession: (subject: IStudySession) => void;
  removeSubject: (id: string) => void;
  removeStudySession: (id: string) => void;
}

interface IProvider {
  children: React.ReactNode
}

const StudyContext = createContext<IContext>({
  subjects: [],
  studySessions: [],
  addStudySession(subject: IStudySession): void {
  },
  addSubject(subject: ISubject): void {
  },
  removeStudySession(id: string): void {
  },
  removeSubject(id: string): void {
  },
});

export const StudyProvider = ({children}: IProvider) => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [studySessions, setStudySessions] = useState<IStudySession[]>([]);

  const addSubject = (subject: ISubject) => {
    setSubjects(currentSubjects => [...currentSubjects, subject]);
  }

  const addStudySession = (studySession: IStudySession) => {
    setStudySessions(currentStudySessions => [...currentStudySessions, studySession]);
  }

  const removeSubject = (id: string) => {
    setStudySessions(currentStudySessions => {
      return currentStudySessions.filter((studySession) => studySession.subjectId !== id);
    })
    setSubjects(currentSubjects => {
      return currentSubjects.filter((subject) => subject.id !== id);
    })
  }

  const removeStudySession = (id: string) => {
    setStudySessions(currentStudySessions => {
      return currentStudySessions.filter((studySession) => studySession.id !== id);
    })
  }

  return (
    <StudyContext.Provider value={{
      subjects,
      studySessions,
      addSubject,
      addStudySession,
      removeSubject,
      removeStudySession
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export function useStudyContext() {
  const ctx = useContext(StudyContext);
  if (!ctx) {
    throw new Error('useStorage must be used within <StorageProvider>');
  }
  return ctx;
}
