<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Food Delivery Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Montserrat:wght@600&display=swap" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(135deg, #232526 0%, #414345 100%);
      margin: 0;
      font-family: 'Inter', Arial, sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }
    .navbar {
      background: #242526e8;
      padding: 24px 0 12px 0;
      display: flex;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(33,33,33,0.05);
      gap: 8px;
      animation: fadeIn 1.2s cubic-bezier(.39,.57,.56,1) 0.3s both;
    }
    .navbar a {
      color: #FF7043;
      text-decoration: none;
      margin: 0 20px;
      font-family: 'Montserrat', Arial, sans-serif;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.2px;
      padding: 7px 0;
      transition: color 0.2s, transform 0.18s;
      position: relative;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .navbar a:hover {
      color: #43A047;
      transform: translateY(-2px) scale(1.06);
    }
    .main-image-section {
      width: 100vw;
      height: 340px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      background: linear-gradient(90deg, #FF7043 55%, #43A047 100%);
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 24px 0 rgba(33,33,33,0.20);
      animation: fadeIn 1.3s cubic-bezier(.39,.57,.56,1);
    }
    .main-image-section img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 0;
      opacity: 0.92;
      filter: contrast(0.92) saturate(1.1);
      mix-blend-mode: multiply;
      transition: filter 0.28s;
    }
    .main-image-section::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(255,112,67,0.06) 0%, rgba(67,160,71,0.18) 100%);
      pointer-events: none;
    }
    .desc-box {
      background: rgba(33,33,33, 0.985);
      color: #fff8f3;
      max-width: 530px;
      margin: -65px auto 56px auto;
      border-radius: 22px;
      box-shadow: 0 16px 36px 0 rgba(67,160,71,0.15), 0 2px 8px 0 rgba(255,112,67,0.09);
      padding: 36px 38px;
      font-size: 21px;
      line-height: 1.73;
      font-family: 'Inter', Arial, sans-serif;
      text-align: center;
      backdrop-filter: blur(2px);
      transform: translateY(24px);
      opacity: 0;
      animation: fadeInUp 0.9s cubic-bezier(.39,.57,.56,1) 0.7s both;
      transition: box-shadow 0.22s;
    }
    .desc-box:hover {
      box-shadow: 0 24px 48px 0 rgba(67,160,71,0.19), 0 6px 24px 0 rgba(255,112,67,0.15);
    }
    .desc-box h2 {
      margin-top: -8px;
      font-family: 'Montserrat', Arial, sans-serif;
      font-weight: 700;
      letter-spacing: 1.3px;
      color: #43A047;
      font-size: 2.7em;
      line-height: 1.1;
      margin-bottom: 0.47em;
      animation: popIn 1s cubic-bezier(.42,0,.58,1) 1.2s both;
    }
    .desc-box p {
      margin: 0 0 22px 0;
      color: #FFBDAE;
      font-size: 1.04em;
    }
    .order-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(90deg, #276139 83%, #17391d 100%);
  color: #fff8f3;
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 21px;
  font-weight: 700;
  margin-top: 18px;
  padding: 16px 48px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 32px 0 rgba(33,33,33,0.22), 0 2px 14px 0 rgba(67,160,71,0.10);
  text-decoration: none;
  position: relative;
  transition: background 0.23s, transform 0.15s, box-shadow 0.16s;
  overflow: hidden;
  z-index: 1;
  isolation: isolate;
  animation: popIn 1s cubic-bezier(.42,0,.58,1) 1.3s both;
  letter-spacing: 1.1px;
}

.order-icon {
  font-size: 1.22em;
  filter: drop-shadow(0 2px 3px rgba(33,80,29,0.22));
  transition: transform 0.18s;
}

.order-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(100deg, #46a06911 10%, #276139bb 60%, #17391dcc 100%);
  opacity: 0.77;
  z-index: -1;
  filter: blur(14px);
  transition: opacity 0.26s;
  pointer-events: none;
  animation: btnBorderPulse 3s infinite linear alternate;
}

@keyframes btnBorderPulse {
  from { opacity: 0.67; filter: blur(14px);}
  to   { opacity: 0.89; filter: blur(16px);}
}

.order-btn:hover {
  background: linear-gradient(90deg, #19311d 82%, #286d3a 100%);
  transform: translateY(-2px) scale(1.07);
  box-shadow: 0 16px 44px 0 #1c241b44, 0 4px 16px 0 #193a1b44;
  letter-spacing: 1.24px;
}

.order-btn:hover .order-icon {
  transform: scale(1.16) rotate(-8deg);
}

.order-btn:active {
  transform: scale(0.96);
}

.order-btn::after {
  content: '';
  position: absolute;
  left: -80%;
  top: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(120deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0.04) 42%,rgba(255,255,255,0.00) 100%);
  transform: skewX(-26deg);
  z-index: 2;
  pointer-events: none;
  transition: left 0.34s;
}
.order-btn:hover::after {
  left: 140%;
  transition: left 0.7s cubic-bezier(.42,0,.58,1);
}

    @media (max-width: 800px) {
      .main-image-section {
        height: 180px;
      }
      .desc-box {
        width: 97vw;
        max-width: 98vw;
        padding: 22px 3vw;
        font-size: 17px;
      }
      .navbar a {
        font-size: 16px;
        margin: 0 7px;
      }
      .desc-box h2 {
        font-size: 1.56em;
      }
    }
    @keyframes fadeIn {
      0% { opacity: 0;}
      100% {opacity: 1;}
    }
    @keyframes fadeInUp {
      from {opacity: 0; transform: translateY(48px);}
      to {opacity: 1; transform: translateY(0);}
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 #43A04770; }
      70% { box-shadow: 0 0 15px 6px #71eb9842; }
      100% { box-shadow: 0 0 0 0 #43A04770; }
    }
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.96);}
      40% { opacity: 1; transform: scale(1.04);}
      100% { transform: scale(1);}
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <a href="#">🍽 Menu</a>
    <a href="#">👨‍🍳 About Us</a>
    <a href="#">🥗 Tiffins</a>
    <a href="#">📊 Survey</a>
    <a href="#">🏠 Home</a>
  </nav>
  <div class="main-image-section">
    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" alt="Delicious Food Delivery">
  </div>
  <div class="desc-box">
    <h2>Delicious Meals Delivered</h2>
    <p>
      Savor healthy, home-style meals hand-delivered to your doorstep! <br>
      Our fresh cuisine brings you vibrant flavors made with love and local ingredients.
      <br><br>
      <strong style="color: #43A047;">Order now and taste the difference!</strong>
    </p>
    <a class="order-btn" href="#">
  <span class="order-icon">🛒</span>
  Order&nbsp;Now
</a>
  </div>
</body>
</html>
