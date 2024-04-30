import LayoutHeader from "@/components/LayoutHeader";
import { Text } from "@/components/Themed";
import Sizes from "@/constants/Sizes";
import client from "@/utils/AppwriteClient";
import Notification from "@/utils/models/Notification";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_NOTIFICATIONS_COLLECTION_ID,
} from "@env";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Databases, Query } from "react-native-appwrite/src";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationScreen from "./notification";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = () => {
    setLoading(true);
    const database = new Databases(client);
    database
      .listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_NOTIFICATIONS_COLLECTION_ID,
        [Query.orderDesc("date"), Query.limit(10)]
      )
      .then((value) => {
        setNotifications(value.documents as unknown as Notification[]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  useEffect(() => fetchNotifications(), []);

  const groupedNotifications = useMemo(() => {
    const grouped = new Map<string, Notification[]>();
    notifications.forEach((notification) => {
      const date = new Date(notification.date);
      const key = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)?.push(notification);
    });
    return grouped;
  }, [notifications]);

  const formatedDate = (date: string) => {
    const today = new Date();
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      return "Today";
    }

    return `${dateObj.toLocaleString("default", {
      month: "long",
    })} ${day}, ${year}`;
  };

  return (
    <>
      <View style={{ paddingTop: insets.top }} />
      <LayoutHeader title="Notification" />
      <StatusBar style="dark" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, maxHeight: "100%" }}
      >
        <RefreshControl refreshing={loading} onRefresh={fetchNotifications} />
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator />
            <Text style={{ marginTop: Sizes.sm }}>Loading...</Text>
          </View>
        )}
        {!loading && notifications.length === 0 && (
          <View style={styles.loading}>
            <Text>No notifications</Text>
          </View>
        )}
        {!loading && notifications.length > 0 && (
          <View style={[styles.content]}>
            {Array.from(groupedNotifications).map(([key, notifications], i) => (
              <View key={i}>
                <Text style={styles.title}>{formatedDate(key)}</Text>
                {notifications.map((notification, i) => (
                  <NotificationScreen key={i} {...notification} />
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Sizes.lg,
  },
  title: {
    fontSize: Sizes.md3x,
    marginBottom: Sizes.md,
    marginTop: Sizes.lg,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
