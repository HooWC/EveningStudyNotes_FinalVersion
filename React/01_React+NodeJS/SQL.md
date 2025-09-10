```sql
-- 创建数据库
CREATE DATABASE MyAppDB_rn_1;
GO

USE MyAppDB_rn_1;
GO

-- Users 表
CREATE TABLE dbo.Users (
    UserID       INT IDENTITY(1,1) PRIMARY KEY,
    FullName     NVARCHAR(200) NOT NULL,
    Email        NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(512) NOT NULL,  -- 存 bcrypt hash
    CreatedAt    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- Posts 表
CREATE TABLE dbo.Posts (
    PostID     INT IDENTITY(1,1) PRIMARY KEY,
    UserID     INT NOT NULL,               -- 外键: 作者
    Title      NVARCHAR(200) NOT NULL,
    Content    NVARCHAR(MAX) NOT NULL,
    CreatedAt  DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserID) REFERENCES dbo.Users(UserID) ON DELETE CASCADE
);

-- 插入测试数据
INSERT INTO dbo.Users (FullName, Email, PasswordHash)
VALUES 
(N'Test User 1', N'user1@example.com', N'$2b$12$EXAMPLE_HASH'),
(N'Test User 2', N'user2@example.com', N'$2b$12$EXAMPLE_HASH');

INSERT INTO dbo.Posts (UserID, Title, Content)
VALUES
(1, N'第一篇文章', N'这是测试文章内容。'),
(2, N'第二篇文章', N'另一位用户的内容。');

-- 查询测试
SELECT u.FullName, p.Title, p.Content, p.CreatedAt
FROM dbo.Posts p
JOIN dbo.Users u ON p.UserID = u.UserID
ORDER BY p.CreatedAt DESC;
```

