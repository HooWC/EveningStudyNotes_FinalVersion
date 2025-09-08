```sql
-- 1. 建数据库
CREATE DATABASE MyAppDB_JWT;
GO

-- 切换到数据库
USE MyAppDB_JWT;
GO

-- 2. 建 Users 表
CREATE TABLE dbo.Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,  -- 存加密/哈希后的密码
    FullName NVARCHAR(100) NULL,
    Email NVARCHAR(255) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- 3. 插入测试用户（密码先明文，后面在 Node.js 里哈希）
INSERT INTO dbo.Users (Username, PasswordHash, FullName, Email)
VALUES ('testuser', '123456', '测试用户', 'test.user@example.com');
GO

-- 4. 查看数据
SELECT * FROM dbo.Users;
GO

-- & 更改
UPDATE Users
SET FullName = N'测试用户'
WHERE UserID = 1;
```

