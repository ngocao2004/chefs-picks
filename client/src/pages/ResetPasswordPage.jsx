import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Key,
} from "lucide-react";
import "../styles/style.css";
import { API_BASE_URL } from "../config/api-config";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Refs cho 6 ô input
  const inputRefs = useRef([]);

  // Lấy email từ localStorage nếu có
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    if(inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  }, []);

  // Kiểm tra độ mạnh của mật khẩu
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength("");
      return;
    }

    let strength = "弱い";
    let color = "#ef4444";

    if (newPassword.length >= 8) {
      strength = "普通";
      color = "#f59e0b";
    }

    if (
      newPassword.length >= 10 &&
      /[A-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword)
    ) {
      strength = "強い";
      color = "#10b981";
    }

    setPasswordStrength({ text: strength, color });
  }, [newPassword]);

  // Sửa lại hàm handleCodeChange nhận vào event (e)
  const handleCodeChange = (index, e) => {
    const value = e.target.value;
    console.log("Input value:", value);
    // Nếu value rỗng (xóa)
    if (!value) {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    // Chỉ lấy ký tự số cuối cùng
    const digit = value.replace(/\D/g, "").slice(-1);

    // 2. CHỈ UPDATE NẾU CÓ SỐ
    if (digit && digit !== code[index]) {
      console.log("Valid digit entered:",index+" "+digit);
      console.log("code[index]:", code[index]);
      const newCode = [...code];
      newCode[index] = digit;
      setCode(newCode);

      // 3. TĂNG TIMEOUT ĐỂ TRÁNH LỖI NHẢY 2 Ô
      // Tăng từ 10ms lên 50ms hoặc 100ms
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // ✅ FIX: Xử lý phím Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newCode = [...code];

      if (code[index]) {
        // Nếu ô hiện tại có giá trị, xóa nó
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Nếu ô hiện tại rỗng, xóa ô trước và focus vào đó
        newCode[index - 1] = "";
        setCode(newCode);
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 10);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // ✅ Thêm: Di chuyển sang trái bằng arrow
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      // ✅ Thêm: Di chuyển sang phải bằng arrow
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ✅ FIX: Xử lý paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Chỉ lấy các ký tự số
    const digits = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length === 0) return;

    const newCode = [...code];
    digits.forEach((digit, i) => {
      if (i < 6) {
        newCode[i] = digit;
      }
    });

    setCode(newCode);

    // Focus ô trống đầu tiên hoặc ô cuối
    setTimeout(() => {
      const nextEmptyIndex = newCode.findIndex((val) => val === "");
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }, 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const codeString = code.join("");

    // Validation
    if (!email || codeString.length !== 6 || !newPassword || !confirmPassword) {
      setError("すべてのフィールドを入力してください");
      return;
    }

    if (!email.includes("@")) {
      setError("有効なメールアドレスを入力してください");
      return;
    }

    if (newPassword.length < 6) {
      setError("パスワードは6文字以上である必要があります");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: codeString, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "パスワードのリセットに失敗しました");
        setIsLoading(false);
        return;
      }

      if (data.success) {
        setSuccess(true);
        localStorage.removeItem("resetEmail");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError("予期しないエラーが発生しました");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("ネットワークエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-blur"></div>

      <div className="login-box">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              color: "#6b7280",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <h2 style={{ margin: 0, fontSize: "24px", whiteSpace: "nowrap" }}>
            パスワードをリセット
          </h2>
        </div>

        <p className="subtitle">
          メールで受け取ったリセットコードを入力し、新しいパスワードを設定してください。
        </p>

        {/* Error message */}
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div
            style={{
              backgroundColor: "#dcfce7",
              border: "1px solid #bbf7d0",
              color: "#166534",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "start", gap: "8px" }}>
              <CheckCircle
                size={18}
                style={{ marginTop: "2px", flexShrink: 0 }}
              />
              <div>
                <p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>
                  パスワードがリセットされました
                </p>
                <p style={{ margin: 0, fontSize: "13px" }}>
                  3秒後にログインページにリダイレクトします...
                </p>
              </div>
            </div>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />

            <label style={{ marginTop: "16px", display: "block" }}>
              リセットコード（6桁）
            </label>

            {/* 6 ô vuông nhập code */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                marginTop: "8px",
                marginBottom: "16px",
              }}
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  disabled={isLoading}
                  autoComplete="off"
                  style={{
                    width: "48px",
                    height: "56px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "2px solid #d1d5db",
                    borderRadius: "8px",
                    outline: "none",
                    transition: "all 0.2s",
                    backgroundColor: digit ? "#f0fdf4" : "white",
                    borderColor: digit ? "#10b981" : "#d1d5db",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#f97316";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(249, 115, 22, 0.1)";
                    // Select text để dễ replace
                    e.target.select();
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = digit ? "#10b981" : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              ))}
            </div>

            <label htmlFor="newPassword">新しいパスワード</label>
            <div style={{ position: "relative" }}>
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="新しいパスワード（6文字以上）"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="new-password"
                style={{ 
                  paddingRight: "45px",
                  width: "100%"
                }}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px",
                  userSelect: "none",
                  pointerEvents: "auto",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {/* Password strength indicator */}
            {passwordStrength && (
              <div
                style={{
                  marginTop: "8px",
                  marginBottom: "12px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#6b7280" }}>強度: </span>
                <span
                  style={{ color: passwordStrength.color, fontWeight: "600" }}
                >
                  {passwordStrength.text}
                </span>
              </div>
            )}

            <label htmlFor="confirmPassword">パスワード（確認）</label>
            <div style={{ position: "relative" }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="パスワードを再入力"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="new-password"
                style={{ 
                  paddingRight: "45px",
                  width: "100%"
                }}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px",
                  userSelect: "none",
                  pointerEvents: "auto",
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <div className="btn-row">
              <button
                type="submit"
                className="btn-signin"
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>リセット中...</span>
                  </>
                ) : (
                  <>
                    <Key size={18} />
                    <span>パスワードをリセット</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div
          className="forgot"
          style={{ textAlign: "center", marginTop: "16px" }}
        >
          <Link to="/login">ログインページに戻る</Link>
          <span style={{ margin: "0 8px", color: "#d1d5db" }}>|</span>
          <Link to="/forgot-password">コードを再送信</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
