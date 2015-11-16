-- load file example
load data
INFILE '/test_orchestrator/tests/*/input/simpletable.dat' "str '\n'"
INTO TABLE SIMPLETABLE
APPEND
FIELDS TERMINATED BY '|'
(USER_ID,
NAME,
TEL,
MOBILE)
