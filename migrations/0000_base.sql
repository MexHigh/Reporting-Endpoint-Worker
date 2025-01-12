-- Migration number: 0000 	 2025-01-12T14:30:46.551Z

DROP TABLE IF EXISTS CSPReports;
CREATE TABLE IF NOT EXISTS CSPReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT,
    _CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /* Report */
    URL TEXT,
    UserAgent TEXT, 
    Age INTEGER,

    /* CSPViolationReportBody */
    BlockedURL TEXT,
    StatusCode INTEGER,
    Referrer TEXT,
    DocumentURL TEXT,
    Disposition TEXT, /* "enforce" or "report" */
    SourceFile TEXT,
    LineNumber INTEGER,
    ColumnNumber INTEGER,
    OriginalPolicy TEXT,
    EffectiveDirective TEXT,
    Sample TEXT
);

DROP TABLE IF EXISTS DeprecationReports;
CREATE TABLE IF NOT EXISTS DeprecationReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT,
    _CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    /* Report */
    URL TEXT,
    UserAgent TEXT, 
    Age INTEGER,

    /* DeprecationReportBody */
    ID TEXT,
    AnticipatedRemoval DATE,
    Message TEXT,
    SourceFile TEXT,
    LineNumber INTEGER,
    ColumnNumber INTEGER
);

DROP TABLE IF EXISTS InterventionReports;
CREATE TABLE IF NOT EXISTS InterventionReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT,
    _CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /* Report */
    URL TEXT,
    UserAgent TEXT, 
    Age INTEGER,
    
    /* InterventionReportBody */
    ID TEXT,
    Message TEXT,
    SourceFile TEXT,
    LineNumber INTEGER,
    ColumnNumber INTEGER
);
