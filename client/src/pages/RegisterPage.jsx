import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const RegisterPage = () => {
  return (
    <div className="login-container">
      <div className="background-blur"></div>

      <div className="login-box">
        <h2>Sign Up</h2>
        <p className="subtitle">Sign up to save your history and favorites.</p>

        <form>
          <label>Email address</label>
          <input type="email" placeholder="you@example.com" required />

          <label>Password</label>
          <input type="password" required />

          <label>Confirm Password</label>
          <input type="password" required />

<<<<<<< Updated upstream
          <div className="btn-row">
            <button type="submit" className="btn-signup">Sign up</button>
            <Link to="/login" className="btn-create">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
=======
        setIsLoading(true);

        try {
            // Gửi cả 3 trường bắt buộc: name, email, password
            const response = await axios.post(API_REGISTER_URL, {
                name, 
                email,
                password,
            });

            const { token, user } = response.data.data;

            // Đăng ký thành công
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            alert("登録が完了しました！ようこそ！"); // Đăng ký thành công!
            navigate("/"); 

        } catch (err) {
            console.error("Registration failed:", err);
            setIsLoading(false);

            // --- Xử lý lỗi từ Server (Status 400 hoặc 409) ---
            const status = err.response?.status;
            const responseData = err.response?.data;
            let errorMessage = "サーバーエラーにより登録に失敗しました。"; // Mặc định lỗi 500

            if (status === 400 || status === 409) {
                // Lỗi 409: Email đã tồn tại
                if (responseData.message === "Email đã được đăng ký") {
                    errorMessage = "このメールアドレスは既に登録されています。";
                } 
                // Lỗi 400: Lỗi validation (Dữ liệu không hợp lệ)
                else if (responseData.errors && responseData.errors.length > 0) {
                    // Hiển thị thông báo lỗi đầu tiên từ express-validator
                    errorMessage = `入力エラー: ${responseData.errors[0]}`; 
                } 
                // Lỗi 400 chung (nếu không có chi tiết errors)
                else if (responseData.message) {
                    errorMessage = `エラー: ${responseData.message}`;
                }
            } else {
                // Lỗi mạng hoặc lỗi server không xác định (500)
                errorMessage = "ネットワーク接続を確認するか、再度お試しください。";
            }
            
            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <div className="background-blur"></div>

            <div className="login-box">
                <h2>新規登録 (サインアップ)</h2> 
                <p className="subtitle">履歴やお気に入り機能を保存するためにサインアップしてください。</p> 

                <form onSubmit={handleRegister}>
                    {/* Hiển thị lỗi */}
                    {error && (
                        <div className="error-message" style={{color: 'red', marginBottom: '15px', padding: '10px', border: '1px solid red', borderRadius: '5px'}}>
                            {error}
                        </div>
                    )}
                    
                    <label>ユーザー名</label> {/* Tên người dùng */}
                    <input 
                        type="text" 
                        placeholder="山田太郎" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            width: '100%',
                            fontSize: '14px',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f97316'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />

                    <label>メールアドレス</label> {/* Địa chỉ Email */}
                    <input 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            width: '100%',
                            fontSize: '14px',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f97316'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />

                    <label>パスワード</label> {/* Mật khẩu */}
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            width: '100%',
                            fontSize: '14px',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f97316'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />

                    <label>パスワード (確認)</label> {/* Xác nhận Mật khẩu */}
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            width: '100%',
                            fontSize: '14px',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f97316'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />

                    <div className="btn-row">
                        <button type="submit" className="btn-signup" disabled={isLoading}>
                            {isLoading ? '登録中...' : '登録'} 
                        </button>
                        <Link to="/login" className="btn-create">
                            サインイン
                        </Link> 
                    </div>
                </form>
            </div>
        </div>
    );
>>>>>>> Stashed changes
};

export default RegisterPage;
