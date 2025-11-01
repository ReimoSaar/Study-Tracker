import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import AddButton from "@/components/AddButton";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

const TabLayout = () => {
  const SUBJECTS_NAME = "index"
  const STUDY_SESSIONS_NAME = "study-sessions"
  const SUBJECT_ADD_MODAL_ROUTE = "/subject-add-modal"
  const SESSION_ADD_MODAL_ROUTE = "/study-session-add-modal"

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: true,
      }}>
      <Tabs.Screen
        name={SUBJECTS_NAME}
        options={{
          title: 'Subjects',
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
          headerRight: () => (
            <AddButton href={SUBJECT_ADD_MODAL_ROUTE} />
          ),
        }}
      />
      <Tabs.Screen
        name={STUDY_SESSIONS_NAME}
        options={{
          title: 'Study sessions',
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
          headerRight: () => (
            <AddButton href={SESSION_ADD_MODAL_ROUTE} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout
