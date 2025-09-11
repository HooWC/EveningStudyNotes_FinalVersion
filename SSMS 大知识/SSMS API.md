```
Programmability -> Stored Procedures
```

Example: `User Delete`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_user_delete_by_id]    Script Date: 8/11/2025 10:42:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[api_itsm_user_delete_by_id] 
@id int

AS 
	SET NOCOUNT ON
	BEGIN
		DELETE FROM Users WHERE Id = @id
	END
```

Example: `User Get All`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_user_get_all]    Script Date: 8/11/2025 10:42:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[api_itsm_user_get_all] 

AS 
	SET NOCOUNT ON
	BEGIN
		SELECT * FROM Users;
	END
```

Example: `User Get By Id`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_user_get_by_id]    Script Date: 8/11/2025 10:43:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[api_itsm_user_get_by_id] 
@id int

AS 
	SET NOCOUNT ON
	BEGIN
		SELECT * FROM Users WHERE Id = @id
	END
```

Example: `User Update`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_user_update]    Script Date: 8/11/2025 10:44:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[api_itsm_user_update]
    @id INT,
    @emp_id NVARCHAR(50) = NULL,
    @prefix NVARCHAR(10) = NULL,
    @photo VARBINARY(MAX) = NULL,
    @fullname NVARCHAR(100) = NULL,
    @email NVARCHAR(255) = NULL,
    @gender NVARCHAR(10) = NULL,
    @department_id INT = NULL,
    @title NVARCHAR(100) = NULL,
    @business_phone NVARCHAR(20) = NULL,
    @mobile_phone NVARCHAR(20) = NULL,
    @role_id INT = NULL,
    @password NVARCHAR(255) = NULL,
    @race NVARCHAR(50) = NULL,
	@photo_type NVARCHAR(50) = NULL,
	@active BIT = NULL,
	@r_manager BIT = NULL,
	@company NVARCHAR(100) = NULL,
	@receiveEmail BIT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        emp_id = ISNULL(@emp_id, emp_id),
        prefix = ISNULL(@prefix, prefix),
        photo = ISNULL(@photo, photo),
        fullname = ISNULL(@fullname, fullname),
        email = ISNULL(@email, email),
        gender = ISNULL(@gender, gender),
        department_id = ISNULL(@department_id, department_id),
        title = ISNULL(@title, title),
        business_phone = ISNULL(@business_phone, business_phone),
        mobile_phone = ISNULL(@mobile_phone, mobile_phone),
        role_id = ISNULL(@role_id, role_id),
        password = ISNULL(@password, password),
        race = ISNULL(@race, race),
        update_date = GETDATE(),
		photo_type = ISNULL(@photo_type, photo_type),
		active = ISNULL(@active, active),
		r_manager = ISNULL(@r_manager, r_manager),
		company = ISNULL(@company, company),
		receiveEmail = ISNULL(@receiveEmail, receiveEmail)
    WHERE id = @id;

    SELECT * FROM Users WHERE id = @id;
END
```

Example: `User Register`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_user_register]    Script Date: 8/11/2025 10:45:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[api_itsm_user_register] 
    @emp_id NVARCHAR(50),
    @prefix NVARCHAR(10),
	@photo VARBINARY(MAX) = NULL,
    @fullname NVARCHAR(100),
    @email NVARCHAR(255),
    @gender NVARCHAR(10),
    @department_id INT,
    @title NVARCHAR(100),
    @business_phone NVARCHAR(20) = NULL,
    @mobile_phone NVARCHAR(20),
    @role_id INT,
    @password NVARCHAR(255),
    @race NVARCHAR(50),
	@photo_type NVARCHAR(50) = NULL,
	@r_manager BIT = 0,
	@company NVARCHAR(100) = NULL
    
AS 
BEGIN
    SET NOCOUNT ON
    
    DECLARE @current_date DATETIME = GETDATE()
    
    INSERT INTO Users (
        emp_id,
        prefix,
        photo,
        fullname,
        email,
        gender,
        department_id,
        title,
        business_phone,
        mobile_phone,
        role_id,
        password,
        race,
        create_date,
        update_date,
        active,
		photo_type,
		r_manager,
		company
    )
    VALUES (
        @emp_id,
        @prefix,
        @photo,
        @fullname,
        @email,
        @gender,
        @department_id,
        @title,
        @business_phone,
        @mobile_phone,
        @role_id,
        @password,
        @race,
        @current_date,  -- create_date 
        @current_date,  -- update_date
        1,
		@photo_type,
		@r_manager,
		@company
    )

	SELECT TOP 1 * FROM Users ORDER BY id DESC;

END
```



## Easy Way

Example: `Role Create`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_role_create]    Script Date: 8/11/2025 10:45:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[api_itsm_role_create] 
    @role NVARCHAR(50) = NULL
AS 
BEGIN
    SET NOCOUNT ON
    
    INSERT INTO Roles (
        role
    )
    VALUES (
        @role          
    )

	SELECT TOP 1 * FROM Roles ORDER BY id DESC;

END
```

Example: `Role Update`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_role_update]    Script Date: 8/11/2025 10:47:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[api_itsm_role_update]
    @id INT,
    @role nvarchar(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Roles
    SET
        role = ISNULL(@role, role)
    WHERE id = @id;

    SELECT * FROM Roles WHERE id = @id;
END
```

Example: `Role Get By Id`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_role_get_by_id]    Script Date: 8/11/2025 10:47:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[api_itsm_role_get_by_id] 
@id int

AS 
	SET NOCOUNT ON
	BEGIN
		SELECT * FROM Roles WHERE Id = @id
	END
```

Example: `Role Get All`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_role_get_all]    Script Date: 8/11/2025 10:47:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[api_itsm_role_get_all] 

AS 
	SET NOCOUNT ON
	BEGIN
		SELECT * FROM Roles;
	END
```

Example: `Role Delete`

```sql
USE [ITSMDB]
GO
/****** Object:  StoredProcedure [dbo].[api_itsm_role_delete_by_id]    Script Date: 8/11/2025 10:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[api_itsm_role_delete_by_id] 
@id int

AS 
	SET NOCOUNT ON
	BEGIN
		DELETE FROM Roles WHERE Id = @id
	END
```

