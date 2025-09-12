```sql
-- 创建数据库
CREATE DATABASE MyAppDB_rn_2;
GO

USE MyAppDB_rn_2;
GO

-- 用户表
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- 文章表
CREATE TABLE Posts (
    PostID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- 插入测试用户（假设密码之后会用 bcrypt 加密）
INSERT INTO Users (FullName, Email, PasswordHash)
VALUES 
(N'张三', 'zhangsan@test.com', '123456_hashed'),
(N'李四', 'lisi@test.com', 'abcdef_hashed');

-- 插入测试文章
INSERT INTO Posts (UserID, Title, Content)
VALUES
(1, N'第一篇文章', N'这是张三写的第一篇文章'),
(1, N'第二篇文章', N'张三的另一篇内容'),
(2, N'李四的想法', N'李四写了一些内容...');
```

