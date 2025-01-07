DROP TABLE IF EXISTS CSPReports;
CREATE TABLE IF NOT EXISTS CSPReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT,
    _CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /* Report */
    URL TEXT,

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
    
    /* InterventionReportBody */
    ID TEXT,
    Message TEXT,
    SourceFile TEXT,
    LineNumber INTEGER,
    ColumnNumber INTEGER
);

/*
DROP TABLE IF EXISTS PermissionsPolicyReports;
CREATE TABLE IF NOT EXISTS PermissionsPolicyReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT
);

DROP TABLE IF EXISTS CrashReports;
CREATE TABLE IF NOT EXISTS CrashReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT
);

DROP TABLE IF EXISTS TLSRPTReports;
CREATE TABLE IF NOT EXISTS CAAReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT
);

DROP TABLE IF EXISTS CAAReports;
CREATE TABLE IF NOT EXISTS CAAReports (
    _ID INTEGER PRIMARY KEY AUTOINCREMENT
);
*/
