```sql
-- 创建数据库
CREATE DATABASE MyApp_v_1;
GO

USE MyApp_v_1;
GO

-- 创建 Users 表
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(200) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(200) NOT NULL,  -- 存密码的 hash，而不是明文
    UserName NVARCHAR(100) NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- 创建 Posts 表
CREATE TABLE Posts (
    PostId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- 插入测试用户 (密码是明文 test123, 这里暂时直接放，不建议生产环境这么做)
INSERT INTO Users (Email, PasswordHash, UserName) VALUES
(N'alice@example.com', N'test123', N'Alice'),
(N'bob@example.com', N'secret456', N'Bob');

-- 插入测试帖子
INSERT INTO Posts (UserId, Title, Content) VALUES
(1, N'Hello World', N'This is Alice''s first post!'),
(2, N'JWT + Vue3', N'Bob is learning full-stack dev with Vue3 + Node.js + SQL Server.');
```

