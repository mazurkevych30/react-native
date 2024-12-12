export const posts_data = [
  {
    id: "1",
    image: require("../assets/images/background.png"),
    title: "Ліс",
    comments: [
      { user: "Owner", text: "Some text" },
      { user: "1", text: "Some text" },
      { user: "Owner", text: "Some text" },
      { user: "3", text: "Some text" },
    ],
    likes: 153,
    location: "Ivano-Frankivs'k Region, Ukraine",
    coordinates: { latitude: 48.72677, longitude: 24.54586 },
  },
  {
    id: "2",
    image: require("../assets/images/background.png"),
    title: "Захід на Чорному морі",
    comments: [
      { user: "1", text: "Some text" },
      { user: "2", text: "Some text" },
      { user: "3", text: "Some text" },
    ],
    likes: 200,
    location: "Odessa, Ukraine",
    country: "Ukraine",
    coordinates: { latitude: 46.466325, longitude: 30.762716 },
  },
  {
    id: "3",
    image: require("../assets/images/background.png"),
    title: "Старий будиночок у Венеції",
    comments: [
      { user: "1", text: "Some text" },
      { user: "2", text: "Some text" },
      { user: "3", text: "Some text" },
    ],
    likes: 200,
    country: "Italy",
    location: "Venezia, Italy",
    coordinates: { latitude: 45.437384, longitude: 12.32781 },
  },
];
