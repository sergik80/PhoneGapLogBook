var app = {

	initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        var theList = JSON.parse(window.localStorage.getItem("logbookItems"));
     
        if (null == theList || theList == "null")
        {
            this.deleteAllItems();
        }
        else
        {
            var count = 0;
            for (var obj in theList)
            {
                count++;
            }
     
            this.deleteAllItems();
     
            for(var i = 0; i < count; i++)
            {
                addLogbookItem(theList["row" + i], true);
            }
        }
    },
    
    function addLogbookItem(todoDictionary, appIsLoading, rowID)
    {
    	if(rowID == null) rowID = 0;
        rowID +=1;
        var list = document.getElementById("logbook");
        var rowCount = table.querySelectorAll("li").length;
        var row = document.createElement("li");
     
        var cell1 = document.createElement("span");
        cell1.className = "checkbox"
        var element1 = document.createElement("input");
        element1.type = "checkbox";
        element1.name = "chkbox[]";
        element1.checked = todoDictionary["check"];
        element1.setAttribute("onclick", "checkboxClicked()");
        cell1.appendChild(element1);
        row.appendChild(cell1);
     
        // create the textbox
        var cell2 = document.createElement("span");
        cell2.className = "textbox";
        var element2 = document.createElement("input");
        element2.type = "text";
        element2.name = "txtbox[]";
        element2.size = 16;
        element2.id = "text" + rowID;
        element2.value = todoDictionary["text"];
        element2.setAttribute("onchange", "saveLogbookItems()");
        cell2.appendChild(element2);
        row.appendChild(cell2);
     
        // create the view button
        var cell3 = document.createElement("span");
        cell3.className = "button";
        var element3 = document.createElement("input");
        element3.type = "button";
        element3.id = rowID;
        element3.value = "View";
        element3.setAttribute("onclick", "viewSelectedRow(document.getElementById('text' + this.id))");
        cell3.appendChild(element3);
        row.appendChild(cell3);
     
        // create the delete button
        //var cell4 = row.insertCell(3);
        //var element4 = document.createElement("input");
        //element4.type = "button";
        //element4.value = "Delete";
        //element4.setAttribute("onclick", "deleteSelectedRow(this)");
        //cell4.appendChild(element4);
        
        list.appendChild(row);
     
        // update the UI and save the to-do list
        checkboxClicked();
        saveLogbookItems();
     
        if (!appIsLoading) alert("Item Added Successfully.");
    }
    
    function deleteAllItems()
    {
        var list = document.getElementById("logbook");
        
        while (list.firstChild) {
        	list.removeChild(list.firstChild);
        }
     
        saveLogbookItems();
    },
    
    function saveLogbookItems()
    {
        var todoArray = {};
        var checkBoxState = 0;
        var textValue = "";
     
        var list = document.getElementById("logbook");
        var listItems = list.querySelectorAll("li");
     
        if (listItems.length > 0)
        {
            for(var i=0; i < listItems.length; i++)
            {
                var row = listItems[i];
     
                var chkbox = row.querySelector("input[type='checkbox']");
                checkBoxState = (null != chkbox && true == chkbox.checked) ? 1 : 0; 
                
                var textbox = row.querySelector(".textbox");
                textValue = textbox.value;
     
                todoArray["row" + i] =
                {
                    check : checkBoxState,
                    text : textValue
                };
            }
        }
        else
        {
            todoArray = null;
        }
     
        window.localStorage.setItem("logbookItems", JSON.stringify(todoArray));
    },
    
    function checkboxClicked()
    {
        var list = document.getElementById("logbook");
        var rows = table.querySelectorAll("li");
     
        for(var i = 0; i < rows.length; i++)
        {
            var row = rows[i];
            var chkbox = row.querySelector("input");
            var textbox = row.querySelector("textbox");
     
            if(null != chkbox && true == chkbox.checked)
            {
                if(null != textbox)
                {		
                    textbox.style.setProperty("text-decoration", "line-through");
                }
            }
            else
            {
                textbox.style.setProperty("text-decoration", "none");
            }
     
        }
     
        saveLogbookItems();
    }
};

app.initialize();