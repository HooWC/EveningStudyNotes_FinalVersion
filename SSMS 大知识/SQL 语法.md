```sql
// 添加 新
ALTER TABLE Users
ADD open_db BIT NOT NULL DEFAULT 0;

==
ADD company NVARCHAR(50) NULL;
==
ADD m_id int NULL;
==
ADD m_approve BIT NULL;
==
ADD service_type nvarchar(Max) NULL;
==
ADD closed_date datetime NULL;
==
ADD erp_photo VARBINARY(MAX) NULL;

//=========

// 添加 多个 新
ALTER TABLE Requests
ADD
    req_type BIT NULL,
    erp_version NVARCHAR(50) NULL,
    erp_category NVARCHAR(50) NULL,
    erp_subcategory NVARCHAR(50) NULL,
    erp_function NVARCHAR(50) NULL,
    erp_module NVARCHAR(50) NULL,
    erp_user_account NVARCHAR(100) NULL,
    erp_phone VARBINARY(MAX) NULL,
    erp_photo_type NVARCHAR(50) NULL,
    erp_report BIT NULL,
    erp_resolution_type NVARCHAR(50) NULL,
    erp_resolution NVARCHAR(MAX) NULL,
    erp_resolved_data DATETIME NULL;
```

```sql
// 删除 一个
ALTER TABLE Users
DROP COLUMN Company;

//=========

// 删除 多个
ALTER TABLE Requests
DROP COLUMN
    erp_category,
    erp_subcategory,
    erp_function;

```

```sql
// 创建 新 Table
CREATE TABLE RequestPhotos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    request_id INT NOT NULL,
    photo VARBINARY(MAX) NOT NULL,
    photo_type NVARCHAR(50) NULL,
    upload_time DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_RequestPhotos_Requests
        FOREIGN KEY (request_id) REFERENCES Requests(id)
        ON DELETE CASCADE
);

// （ON DELETE CASCADE） 当 Requests 表里的一条记录被删除时，所有引用它的 RequestPhotos 记录会自动跟着被删除。

==

CREATE TABLE Req_Function (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NULL,
    req_subcategory_id INT NULL,
    CONSTRAINT FK_Function_Subcategory 
    	FOREIGN KEY (req_subcategory_id) REFERENCES Req_Subcategory(id)
);

==

CREATE TABLE Req_Category (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NULL
);
```

```sql
// 修改

ALTER TABLE Incidents
ALTER COLUMN subcategory INT;

==

ALTER TABLE Requests
ALTER COLUMN service_type NVARCHAR(50) NULL;
```

```sql
// 删除 Table

DROP TABLE IncidentCategory;
```



### //========

### 复制空表

复制Table，然后可以在新的Database里超级一样的Table，只不过是空的。

```
1. 右键Table， Script Table as -> CREATE To -> New Query Editor Window
2. 复制
3. 可以更换 USE [换成你的]
```

### 放数据

```
1. 回到原来有数据的SQL
2. 右键 Select Top 1000 Rows
3. 把 TOP (1000) 删掉，运行
4. 复制全部数据
5. 在自己空的数据里，Paste
```

