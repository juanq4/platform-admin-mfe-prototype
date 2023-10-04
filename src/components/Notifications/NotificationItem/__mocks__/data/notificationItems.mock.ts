const mockContent = "[request name] is [ready for publishing]. Launch Preview site";

export const notifications = [
  {
    title: "Today",
    data: {
      category: "Engagement Analytics",
      content: "[data view] has [data detail] in Engagement Analtyics",
      dateTime: "1 hour ago",
      isRead: false,
    },
  },
  {
    title: "Today",
    data: {
      category: "Website",
      content: mockContent,
      dateTime: "6 hours ago",
      isRead: false,
    },
  },
  {
    title: "Today",
    data: {
      category: "Website",
      content: mockContent,
      dateTime: "8 hour ago",
      isRead: false,
    },
  },
  {
    title: "Today",
    data: {
      category: "Website",
      content: mockContent,
      dateTime: "15 hour ago",
      isRead: false,
    },
  },
  {
    title: "This week",
    data: {
      category: "Website",
      content: "[request name] is [ready for approval]. Launch Preview",
      dateTime: "1 day ago",
      isRead: true,
    },
  },
  {
    title: "This week",
    data: {
      category: "Website",
      content: "[request name] is [ready for approval]. Launch Preview",
      dateTime: "3 days ago",
      isRead: false,
    },
  },
  {
    title: "This week",
    data: {
      category: "Website",
      content: "Additonal info is required for [request name].",
      dateTime: "5 days ago",
      isRead: true,
    },
  },
  {
    title: "This week",
    data: {
      category: "Engagement Analytics",
      content: "[data view] has [data detail] in Engagement Analtyics",
      dateTime: "5 days ago",
      isRead: true,
    },
  },
];

export const notificationsToday = notifications.filter((el) => el.title.toLowerCase() === "today");
export const notificationsThisWeek = notifications.filter((el) => el.title.toLowerCase() === "this week");
