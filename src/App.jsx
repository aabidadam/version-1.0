import './App.css'
import ConfettiButton from './components/ConfettiButton'
import Gallery from './components/Gallery'

function App() {
  const herName = 'Q_t 3.14'

  const messages = [
    {
      title: 'Gratitude for our Friendship',
      text:
        "Having you as my friend is the greatest gift in my life. You inspire me and support me. I am so grateful for your presence. Happy birthday to my Q_t 3.14. You are the most beautiful person, inside and out! Love you so much 💖",
    },
    {
      title: 'Importance in My Life',
      text:
        "You are not just my friend, you are my everything. You are the person I look up to, confide in, and cherish every single day. I can't imagine my life without you. On your birthday, I want you to know how truly important you are to me 💖 ",
    },
    {
      title: 'Wishing for a Lifetime Together',
      text:
        "My wish is to have you by my side, sharing laughter and memories for the rest of my life. I want to be there for you, always, just as you are always there for me. Happy birthday, my Q_t 3.14 💖 💖 💖",
    },
  ]

  return (
    <div className="page">
      <main className="container">
        <section className="hero">
          <h1>Happy Birthday, {herName} 🎉</h1>
          <div className="actions">
            <ConfettiButton>Celebrate!</ConfettiButton>
          </div>
        </section>

        <section className="messages" aria-label="Birthday messages">
          {messages.map((m, idx) => (
            <article className="message-card" key={idx}>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </section>

        <section className="gallery-section" aria-label="Photo gallery">
          <h2> Special Memories</h2>
          <Gallery />
        </section>

        <footer className="footer">Made with 💖 only for you!</footer>
      </main>
    </div>
  )
}

export default App
