function saveAsExcel(id, fileName, charset) {
    // Promise based error handling, though it all works synchronously, parameter-based callbacks are avoided.
    return new Promise(function(resolve, reject) {
        try {
            var charset = charset || 'UTF-8'; // Document charset, defaults to UTF-8
            var prepend = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'><meta http-equiv='content-type' content='application/vnd.ms-excel; charset=" + charset + "'><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>"
            var append = "</body></html>"
            var table_text = prepend + "<table border='2px'><tr>"; //Document and table Intialization, UTF-8 and CSS included
            var textRange;
            var index = 0;

            // Use jQuery selector engine Sizzle when available
            var jQuery = window.jQuery || 'undefined';
            if (jQuery !== 'undefined') {
                if (jQuery(id).length) {
                    var table = jQuery(id)[0];
                } else {
                    var table = jQuery('#' + id)[0];
                }
            } else {
                var table = document.getElementById(id); // Read table using id
            }
            /*
            	Read Table Data and append to table_text
            */

            for (index = 0; index < table.rows.length; index++) {
                table_text = table_text + table.rows[index].innerHTML + "</tr>";

            }

            table_text = table_text + "</table>" + append; // table close
            table_text = table_text.replace(/<a[^>]*>|<\/a>/g, ""); //removes links embedded in <td>
            table_text = table_text.replace(/<img[^>]*>/gi, ""); //removes images embeded in <td>
            table_text = table_text.replace(/<input[^>]*>|<\/input>/gi, ""); //removes input tag elements

            var userAgent = window.navigator.userAgent; //check client user agent to determine browser
            var msie = userAgent.indexOf("MSIE "); // If it is Internet Explorer user Aget will have string MSIE

            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
            {
                //Since IE > 10 supports blob, check for blob support and use if we can
                if (typeof Blob !== "undefined") {
                    //Bolb Data is ArrayStorage, convert to array
                    table_text = [table_text];
                    var blob = new Blob(table_text);
                    window.navigator.msSaveBlob(blob, '' + fileName);
                } else {
                    //If Blob is unsupported, create an iframe in HTML Page, and call that blank iframe

                    textArea.document.open("text/html", "replace");
                    textArea.document.write(table_text);
                    textArea.document.close();
                    textArea.focus();
                    textArea.document.execCommand("SaveAs", true, fileName);

                }
            }

            //Other Browsers		 
            else
                //Can use below statement if client machine has Excel Application installed
                //window.open('data:application/vnd.ms-excel,' + encodeURIComponent(table_text));  
                var a = document.createElement('a');
            //getting data from our div that contains the HTML table
            var data_type = 'data:application/vnd.ms-excel';
            if (jQuery !== 'undefined') {
                if (jQuery(id).length) {
                    var table_div = jQuery(id)[0];
                } else {
                    var table_div = jQuery('#' + id)[0];
                }
            } else {
                var table_div = document.getElementById(id); // Read table using id
            }
            var table_html = prepend + table_div.outerHTML + append;
            table_html = table_html.replace(/ /g, '%20');
            table_html = table_html.replace(/<a[^>]*>|<\/a>/g, "");
            a.href = data_type + ', ' + table_html;

            //setting the file name
            a.download = '' + fileName;
            //triggering the function
            a.click();
            resolve();
        } catch (err) {
            reject(err);
        }
    });

}
