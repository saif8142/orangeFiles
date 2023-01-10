
var dispAppsName;
var catListsColl;
var catListsNames;
var catListsCommonids;
var AppsData=[];
var pages;

// configuration variables
const itemsPerPage = 5;

// reference to keep track of current page
let currentPage = 1;

var len;
var dv;
async function funload(){
dispAppsName=sessionStorage.getItem("allAppsId");
 catListsColl= JSON.parse(sessionStorage.getItem("catListsColl"));
 catListsNames = JSON.parse(sessionStorage.getItem("catListsNames"));
 catListsCommonids =JSON.parse(sessionStorage.getItem("catListsCommonids"));

console.log(dispAppsName);

for(let i=0;i<catListsNames.length;i++)
{
  $("#catgId").append('<li id="'+catListsColl[i]+'" onclick="dispAllApps(this.id)"><a href="#">'+catListsNames[i]+'</a></li><div class="border3"></div>');
}


 await db.collection(dispAppsName).get().then((snapshot) =>{

  
  snapshot.docs.forEach(doc =>{
       //console.log(doc.id);
       
       //console.log(doc.data());
       

       AppsData.push({"Name":doc.data().Name,"Image":doc.data().Image,"Des":doc.data().Des,"CommonId":doc.data().CommonId,"docId":doc.id});

       //$("#dispApps").append('<div class="box basic-drop-shadow" id="appDisp"><h5 style="color:black;margin: 0px;">'+doc.data().Name+'</h5><p style="color:black;font-family:Times New Roman, Times, serif;font-size: 15px;text-align: left;"><img src="'+doc.data().Image+'"style="width:100px;height:80px;float:left;margin-right:10px;">'+doc.data().Des+'</p><br> <center><input type="button" id="'+doc.id+'" value="Download" style="background-color:rgb(155, 104, 10);color:#ffff;width:150px;height:40px;border-radius:10px;cursor:pointer;"></center></div>');

    });

    
   });

   // reference to total pages
 pages = numPages(AppsData)

function numPages(AppsDataArray) {
  // returns the number of pages
  return Math.ceil(AppsDataArray.length / itemsPerPage)
}

   changePage(1) // set default page
    addPages() // generate page navigation
   
    }

    function addPages() {
      // grab reference to containing element
      const el = document.getElementById('pages')
      // for each page
      for (let i = 1; i < pages + 1; i++) {
        // append a link with the respective page number
        el.innerHTML += `<a href="javascript:gotoPage(${i})" style="color: rgb(27, 23, 23);">${i}</a>`
      }
    }

    function changePage(page) {
      // reference to output containing element
      const output = document.getElementById("dispApps");
      
      // make sure page is in bounds 
      if (page < 1) page = 1
      if (page > pages) page = pages
      
      // clear output containing element
      output.innerHTML = ""
      
      // for each item within the range of the current page
      for (let i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < AppsData.length; i++) {
        // append the html to the output containing element
        $("#dispApps").append('<div class="box basic-drop-shadow" id="appDisp"><h5 style="color:black;margin: 0px;">'+AppsData[i].Name+'</h5><p style="color:black;font-family:Times New Roman, Times, serif;font-size: 15px;text-align: left;"><img src="'+AppsData[i].Image+'"style="width:100px;height:80px;float:left;margin-right:10px;">'+AppsData[i].Des+'</p><br> <center><a href="apps/mongoDb.msi" id="'+AppsData[i].docId+'" style="background-color:rgb(155, 104, 10);color:#ffff;width:150px;height:40px;border-radius:10px;cursor:pointer;padding:8px;border: black solid 2px;font-size: medium;">Download</a></center></div>');
      }
    }





    function nextPage() {
      // if not on last page, goto next page
      if (currentPage < pages) changePage(++currentPage)
    }
    
    function prevPage() {
      // if not on the first page, goto previous page
      if (currentPage > 1) changePage(--currentPage)
    }
    
    // directly access a page by number
    function gotoPage(page) {
      // sets the current page to the selected page
      currentPage = page
      // changes the page to the selected page
      changePage(page)
    }
   

    function dispAllApps(id)
      {
        //catListsColl=[];
        //catListsNames=[];
        //catListsCommonids=[];
        console.log(id);
        sessionStorage.setItem("allAppsId", id);
      

        sessionStorage.setItem("catListsColl",JSON.stringify(catListsColl));
        sessionStorage.setItem("catListsNames",JSON.stringify(catListsNames));
        sessionStorage.setItem("catListsCommonids",JSON.stringify(catListsCommonids));

        location.replace("displayAllapps.html");
        
      }

   

