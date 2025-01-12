-- Migration number: 0001 	 2025-01-12T14:36:20.109Z

DROP TABLE IF EXISTS NetworkErrorReports;
CREATE TABLE IF NOT EXISTS NetworkErrorReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT,
    _CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /* Report */
    URL TEXT,
    UserAgent TEXT, 
    Age INTEGER,
    
    /* NELBody (experimental) */
    Method TEXT,
    Phase TEXT,
    Protocol TEXT,
    Referrer TEXT,
    ServerIP TEXT,
    Type TEXT,
    ElapsedTime INTEGER,
    SamplingFraction REAL,
    StatusCode INTEGER
);
