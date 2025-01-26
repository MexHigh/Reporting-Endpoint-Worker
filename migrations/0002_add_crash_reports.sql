-- Migration number: 0002 	 2025-01-18T19:47:17.165Z

DROP TABLE IF EXISTS CrashReports;
CREATE TABLE IF NOT EXISTS CrashReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT,
    _CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /* Report */
    URL TEXT,
    UserAgent TEXT, 
    Age INTEGER,
    
    /* experimental, name of report body not yet defined in standard */
    Reason TEXT,
    Stack TEXT
);