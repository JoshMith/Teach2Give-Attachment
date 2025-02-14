const users = [
    {
    id: 1,
    name: "John",
    location: "New York",
    friends: [2, 3, 4],
    posts: [
        { content: "Great day at Central Park!", timestamp: "2025-02-8T12:00:00", likes: 15 },
        { content: "Loving the vibes in NYC!", timestamp: "2025-02-13T08:30:00", likes: 8 },
        { content: "Visited the Statue of Liberty today!", timestamp: "2025-02-03T17:45:00", likes: 20 }
    ]
    },
    {
    id: 2,
    name: "Alice",
    location: "San Francisco",
    friends: [1, 3],
    posts: [
        { content: "Hiking in the Bay Area!", timestamp: "2025-02-10T14:20:00", likes: 12 },
        { content: "Enjoying the sunny weather!", timestamp: "2025-02-12T11:10:00", likes: 6 }
    ]
    },
    {
    id: 3,
    name: "Emily",
    location: "Los Angeles",
    friends: [1, 2, 4],
    posts: [
        { content: "Beach day in LA!", timestamp: "2025-02-06T09:45:00", likes: 25 },
        { content: "Exploring Hollywood!", timestamp: "2025-02-14T16:55:00", likes: 5 }
    ]
    },
    {
    id: 4,
    name: "David",
    location: "Chicago",
    friends: [2],
    posts: [
        { content: "Deep dish pizza is the best!", timestamp: "2025-02-9T10:30:00", likes: 18 },
        { content: "Trying out a new jazz club tonight!", timestamp: "2025-02-11T20:00:00", likes: 3 }
    ]
    },
    {
    id: 5,
    name: "Sarah",
    location: "Seattle",
    friends: [3, 1],
    posts: [
        { content: "Coffee time in the Pacific Northwest!", timestamp: "2025-02-07T15:15:00", likes: 9 },
        { content: "Exploring the Olympic National Park!", timestamp: "2025-02-12T07:00:00", likes: 11 }
    ]
    }
];


const analyzeUsers = (users) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // 7 days ago

    return users
        .filter(user => user.posts.some(post => new Date(post.timestamp) >= oneWeekAgo)) // Active users
        .map(user => ({
            ...user,
            popularPosts: user.posts.filter(post => post.likes >= 10) // Keep only posts with ≥10 likes
        }))
        .filter(user => user.popularPosts.length > 0) // Keep users with at least one popular post
        .reduce(
            (acc, user) => {
                acc.activeUsersCount++;
                acc.popularPostsCount += user.popularPosts.length;
                acc.totalLikes += user.popularPosts.reduce((sum, post) => sum + post.likes, 0);
                return acc;
            },
            { activeUsersCount: 0, popularPostsCount: 0, totalLikes: 0 }
        );
};

// Run Function
const result = analyzeUsers(users);
result.averageLikesPerUser = result.activeUsersCount > 0 
    ? result.totalLikes / result.activeUsersCount 
    : 0;

console.log(result);
