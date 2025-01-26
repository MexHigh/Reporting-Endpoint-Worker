-- Migration number: 0003 	 2025-01-26T17:23:47.530Z

DROP TABLE IF EXISTS PermissionsPolicyReports;
CREATE TABLE IF NOT EXISTS PermissionsPolicyReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT,
    _CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /* Report */
    URL TEXT,
    UserAgent TEXT, 
    Age INTEGER,
    
    /* experimental, name of report body not yet defined in standard */
    Disposition TEXT,
    Message TEXT,
    PolicyID TEXT,
    SourceFile TEXT,
    ColumnNumber INTEGER,
    LineNumber INTEGER
);