# HTMLTable_To_Excel
JavaScript library to convert HTMLTable to Excel with cross browser functionlity
How To USe:
1. Import saveAsExcel.js into HTML web page using <script>
2. call saveAsExcel() method on required event by passing three attributes, id of table to be saved as Excel (if jQuery is present you can use a Sizzle selector instead), file name for the downloaded file and optional charset string (defaults to 'UTF-8').
3. E.g., saveAsExcel('tableToExcel', 'Jaffa.xls', 'UTF-8')
4. For complete Usage view demo.html
