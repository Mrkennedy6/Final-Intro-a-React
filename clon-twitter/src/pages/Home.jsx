import { useState, useEffect } from "react";

const Home = ({ user }) => {
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");

  useEffect(() => {
    const savedTweets = localStorage.getItem("tweets");
    if (savedTweets) {
      setTweets(JSON.parse(savedTweets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tweetText.trim() === "") return;
    const newTweet = {
      id: Date.now(),
      user: user.username,
      content: tweetText.trim(),
      date: new Date().toLocaleString(),
    };
    setTweets([newTweet, ...tweets]);
    setTweetText("");
  };

  const deleteTweet = (id) => {
    setTweets(tweets.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Inicio</h1>
      {user ? (
        <>
          <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <textarea
              placeholder="¿Qué está pasando?"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              rows={3}
              style={{ width: "100%", padding: 10 }}
              maxLength={280}
            />
            <button
              type="submit"
              style={{
                marginTop: 8,
                padding: "8px 16px",
                backgroundColor: "#1DA1F2",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Twittear
            </button>
          </form>

          {tweets.length === 0 ? (
            <p>No hay tweets todavía.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {tweets.map(({ id, user: username, content, date }) => (
                <li
                  key={id}
                  style={{
                    border: "1px solid #ddd",
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 8,
                    position: "relative",
                  }}
                >
                  <strong>{username}</strong> <small style={{ color: "#555" }}>{date}</small>
                  <p style={{ marginTop: 6 }}>{content}</p>
                  {username === user.username && (
                    <button
                      onClick={() => deleteTweet(id)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "transparent",
                        border: "none",
                        color: "red",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      aria-label="Eliminar tweet"
                    >
                      &times;
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Debes iniciar sesión para ver y publicar tweets.</p>
      )}
    </div>
  );
};

export default Home;
