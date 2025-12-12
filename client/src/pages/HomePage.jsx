import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import "../styles/style.css";

const featureCards = [
  {
    id: "surprise",
    icon: "🎉",
    title: "サプライズ",
    description: "何を食べるか迷っていますか？AIがおすすめの一品を選びます。",
    cta: "試してみる",
  },
  {
    id: "map",
    icon: "📍",
    title: "近くのランチマップ",
    description: "今すぐ歩いて行けるレストランを確認できます。",
    cta: "マップを開く",
  },
  {
    id: "plan",
    icon: "🗓️",
    title: "週間ランチプラン",
    description: "平日のバランスの取れたプランを自動で作成します。",
    cta: "プランを見る",
  },
];

const highlightMeals = [
  { id: 1, icon: "🍛", name: "Butter Chicken Curry", price: "¥780" },
  { id: 2, icon: "🍜", name: "Shoyu Ramen", price: "¥750" },
  { id: 3, icon: "🥗", name: "Chicken Salad", price: "¥680" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Kiểm tra user đã đăng nhập chưa
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");
    if (userStr && token) {
      try {
        setUser(JSON.parse(userStr));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('[data-user-menu]')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showUserMenu]);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="brand">
          <div>
            <span className="brand-name">Chef&apos;s Recommendation Menu</span>
            <span className="beta-pill">Beta</span>
          </div>
        </div>

        <div className="header-actions">
          <nav className="home-nav-links">
            <Link className="active" to="/">
              ホーム
            </Link>
            <Link to="/menu">メニュー</Link>
            <Link to="/favorites">お気に入り</Link>
            <Link to="/todays-picks">今日のおすすめ</Link>
            <Link to="/surprise-me">サプライズ</Link>
            <Link to="/nearby">近く</Link>
            <Link to="/history">履歴</Link>
          </nav>

          {user ? (
            <div
              data-user-menu
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#f97316",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#f97316")}
              >
                <User size={18} />
                <span>{user.name || user.email}</span>
              </button>

              {showUserMenu && (
                <div
                  data-user-menu
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    minWidth: "200px",
                    zIndex: 1000,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <p style={{ fontSize: "14px", fontWeight: "600", margin: 0 }}>
                      {user.name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "4px 0 0 0",
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#dc2626",
                      transition: "background-color 0.2s",
                      borderRadius: "0 0 8px 8px",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#fef2f2")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                  >
                    <LogOut size={16} />
                    <span>ログアウト</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="login-btn">ログイン</button>
            </Link>
          )}
        </div>
      </header>

      <main className="home-content">
        <section className="hero-section">
          <div className="hero-text">
            <p className="hero-label">今日のおすすめランチ</p>
            <p className="hero-subtitle">
              あなたの好み、天気、予算に合わせた提案で、より早く選べます。
            </p>
            <div className="hero-actions">
              <button className="primary-btn">おすすめを見る</button>
              <button className="ghost-btn">サプライズ</button>
            </div>
          </div>
          <div className="hero-preview">
            <span>おすすめ料理のプレビューエリア / 画像</span>
          </div>
        </section>

        <section className="feature-section">
          {featureCards.map((card) => (
            <article key={card.id} className="feature-card">
              <div className="icon-badge">{card.icon}</div>
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button className="ghost-btn small">{card.cta}</button>
              </div>
            </article>
          ))}
        </section>

        <section className="highlights">
          <h2>今日のハイライト</h2>
          <ul>
            {highlightMeals.map((meal) => (
              <li key={meal.id} className="highlight-item">
                <div className="highlight-info">
                  <span className="icon-circle">{meal.icon}</span>
                  <div>
                    <p className="meal-name">{meal.name}</p>
                    <span className="meal-price">{meal.price}</span>
                  </div>
                </div>
                <button className="detail-btn">詳細</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
